import { onQueryTables } from '@root/src/shared/utils/request';

function initEvents() {

  chrome.runtime.onMessage.addListener(onQueryTables);
}

async function init() {
  initEvents();
}

init();


