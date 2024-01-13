import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import mcSearchTableInfoStorage from '@root/src/shared/storages/mcSearchTableInfoStorage';
import LRU from './LRU';
import { events } from '@src/shared/constants/common';
import { getDmcTableEndpoint, getDmcHomeEndpoint, getDmcTablePrefix, getTableTypeDisplay } from '@root/src/shared/utils/request';

import 'webextension-polyfill';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

const selfExtensionId = chrome?.runtime?.id;

let currentTabId;
let queryQueue = [];
let bufferKey;
let startDealWithQueue = false; // 是否开始处理伫列
let bufferMap: LRU<String, TableInfo>;

// default suggestion
chrome.omnibox.onInputStarted.addListener(async function () {
  chrome.omnibox.setDefaultSuggestion({
    description: chrome.i18n.getMessage('inputTableNameTip'),
  });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTabId = tabs?.[0]?.id;
  });

  const cached = await mcSearchTableInfoStorage.get();
  const key = `${cached?.region}_${cached?.appGuid}_${cached?.type}`;
  if (!bufferMap || !bufferKey || bufferKey !== key) {
    bufferKey = key;
    bufferMap = new LRU<String, TableInfo>(10000);
  }

});

const sendMessage = (keyword: string, queryTime: number) => new Promise(async (resolve) => {
  if (currentTabId) {

    queryQueue.push({ keyword, queryTime });

    if (!startDealWithQueue) {
      startDealWithQueue = true;
      const exec = () => setTimeout(async () => {
        const item = queryQueue.shift();
        if (item) {
          const cached = await mcSearchTableInfoStorage.get();
          await mcSearchTableInfoStorage.set({ ...cached, querying: true, queryTime: item?.queryTime, keyword: item?.keyword });
          chrome.tabs.sendMessage(currentTabId, { type: events.SEARCH_TABLES, keyword, queryTime });
          exec();
        } else {
          startDealWithQueue = false;
        }
      }, 300);
      exec();
    }
  }
});

const calMatch = (str: string, keyword: string) => {
  let result = str;
  try {
    if (!keyword) return str;
    let _keyword = keyword?.trim?.();
    result = str?.replaceAll ? str?.replaceAll?.(_keyword, `<match><dim>${_keyword}</dim></match>`) : str;
  } catch (e) {
    // may happen url is not formatted
  }
  return result;
}

const delaySuggestion = (keyword: string, queryTime: number) => new Promise((resolve) => {

  const inited = (tables: TableInfo[]) => {
    resolve(tables || []);
    if (tables) {
      tables?.forEach?.((table) => {
        bufferMap.set(table?.TableGuid, table);
      });
    }
  }

  let maxCount = 1000; // 10sec
  const tryExec = () => setTimeout(async () => {
    const cached = await mcSearchTableInfoStorage.get();
    const result = cached?.querying === false;
    if (result && cached?.keyword === keyword && queryTime >= cached?.queryTime) inited(cached?.tables);
    if (!result && maxCount > 0) {
      tryExec();
    }
    maxCount--;
  }, 10);
  tryExec();

});

const initSuggestionByBuffer = async (text: string, suggest: (suggestResults: chrome.omnibox.SuggestResult[]) => void) => {
  const cached = await mcSearchTableInfoStorage.get();
  const suggestedTables = [];
  const list = bufferMap?.list?.() || [];

  list?.forEach?.((item) => {
    const [guid, table] = item || [];
    const tableName = table?.TableName?.toLowerCase?.();
    if (tableName && tableName?.includes?.(text?.toLowerCase?.())) {
      suggestedTables.push(table);
    }
  });

  if (suggestedTables?.length > 0) {
    const set = new Set<{ content: string; description: string; deletable?: boolean }>();
    suggestedTables?.forEach?.((table) => {
      const url = `${getTableTypeDisplay(cached?.type)} | ${table?.TableName} <url>${getDmcTableEndpoint(cached?.region, cached?.type)}/${table?.TableGuid}</url>`;
      set.add({ content: table?.TableGuid || 'empty', description: calMatch(url, text) });
    });
    const result: chrome.omnibox.SuggestResult[] = Array.from(set) || [];
    suggest(result);
  }
}

const onInputChange = async function (text, suggest) {

  if (!text) {
    suggest([]);
    return;
  }

  const queryTime = new Date().getTime();

  const cached = await mcSearchTableInfoStorage.get();
  if (text === cached?.keyword) {
    return;
  }

  delaySuggestion(text, queryTime);

  sendMessage(text, queryTime);

  initSuggestionByBuffer(text, suggest);

};

// https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events
chrome.omnibox.onInputChanged.addListener(onInputChange);

chrome.omnibox.onInputEntered.addListener(async function (text, disposition) {

  const cached = await mcSearchTableInfoStorage.get();
  const region = cached?.region;

  if (!region) return;

  const dmcHomeEndpoint = getDmcHomeEndpoint(region);
  const dmcOdpsEndpoint = getDmcTableEndpoint(region, cached?.type);
  const table = cached?.tables?.find?.((t) => t?.TableGuid === text);
  const entityType = getDmcTablePrefix(cached?.type);

  if (table) chrome?.tabs?.create?.({ url: `${dmcOdpsEndpoint}/${table?.TableGuid}` });
  else chrome?.tabs?.create?.({ url: `${dmcHomeEndpoint}/search?entityType=${entityType}&keyword=${text}` }); // default

});

