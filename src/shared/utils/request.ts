import mcSearchTableInfoStorage from '@src/shared/storages/mcSearchTableInfoStorage';
import { DEFAULT_APP_GUID, DW_OPEN_API_VERSION, events } from '../constants/common';

export const resetCached = async () => {
  // reset 
  const cached = await mcSearchTableInfoStorage.get();
  mcSearchTableInfoStorage.set({ ...cached, tables: [], querying: false, keyword: '' });
}

export const getTableTypeDisplay = (type: TableType) => {
  let result = chrome.i18n.getMessage('mcTable');
  switch (type) {
    case 'ODPS':
      result = chrome.i18n.getMessage('mcTable');
      break;
    case 'emr':
      result = chrome.i18n.getMessage('emrTable');
      break;
    case 'holodb':
      result = chrome.i18n.getMessage('holoTable');
      break;
  }
  return result;
}

export const getDmcHomeEndpoint = (region: string) => {

  let result = 'https://dmc-cn-shanghai.data.aliyun.com/dm';

  try {
    if (!region) return result;
    switch (region) {
      case 'cn-shanghai':
        result = 'https://dmc-cn-shanghai.data.aliyun.com/dm';
        break;
      case 'cn-beijing':
        result = 'https://dmc-cn-beijing.data.aliyun.com/dm';
        break;
      case 'cn-shenzhen':
        result = 'https://dmc-cn-shenzhen.data.aliyun.com/dm';
        break;
      case 'cn-hangzhou':
        result = 'https://dmc-cn-hangzhou.data.aliyun.com/dm';
        break;
      case 'cn-chengdu':
        result = 'https://dmc-cn-chengdu.data.aliyun.com/dm';
        break;
      case 'cn-zhangjiakou':
        result = 'https://dmc-cn-zhangjiakou.data.aliyun.com/dm';
        break;
      case 'cn-wulanchabu':
        result = 'https://dmc-cn-wulanchabu.data.aliyun.com/dm';
        break;
      case 'cn-hongkong':
        result = 'https://dmc-cn-hongkong.data.aliyun.com/dm';
        break;
      case 'ap-northeast-1':
        result = 'https://dmc-ap-northeast-1.data.aliyun.com/dm';
        break;
      case 'ap-southeast-1':
        result = 'https://dmc-ap-southeast-1.data.aliyun.com/dm';
        break;
      case 'ap-southeast-2':
        result = 'https://dmc-ap-southeast-2.data.aliyun.com/dm';
        break;
      case 'ap-southeast-3':
        result = 'https://dmc-ap-southeast-3.data.aliyun.com/dm';
        break;
      case 'ap-southeast-5':
        result = 'https://dmc-ap-southeast-5.data.aliyun.com/dm';
        break;
      case 'us-east-1':
        result = 'https://dmc-us-east-1.data.aliyun.com/dm';
        break;
      case 'us-west-1':
        result = 'https://dmc-us-west-1.data.aliyun.com/dm';
        break;
      case 'eu-west-1':
        result = 'https://dmc-eu-west-1.data.aliyun.com/dm';
        break;
      case 'eu-central-1':
        result = 'https://dmc-eu-central-1.data.aliyun.com/dm';
        break;
      case 'ap-south-1':
        result = 'https://dmc-ap-south-1.data.aliyun.com/dm';
        break;
      case 'me-east-1':
        result = 'https://dmc-me-east-1.data.aliyun.com/dm';
        break;
      case 'cn-shanghai-finance-1':
        result = 'https://dmc-cn-shanghai-finance-1.data.aliyun.com/dm';
        break;
      case 'cn-shenzhen-finance-1':
        result = 'https://dmc-cn-shenzhen-finance-1.data.aliyun.com/dm';
        break;
    }
  } catch (e) {
    console.error(e);
  }

  return result;
}

export const getDmcTablePrefix = (type: TableType) => {
  let _type = 'odps-table';

  switch (type) {
    case 'ODPS':
      _type = 'odps-table';
      break;
    case 'emr':
      _type = 'emr-table';
      break;
    case 'holodb':
      _type = 'holodb-table';
      break;
  }

  return _type;
}

export const getDmcTableEndpoint = (region: string, type: TableType) => {

  const _type = getDmcTablePrefix(type);

  const homeUrl = getDmcHomeEndpoint(region);

  return `${homeUrl}/${_type}`;
}

const getOpenApiEndpoint = (region: string) => {
  let result = 'https://dataworks.cn-shanghai.aliyuncs.com';
  if (!region) return result;
  switch (region) {
    case 'cn-shanghai':
      result = 'https://dataworks.cn-shanghai.aliyuncs.com';
      break;
    case 'cn-beijing':
      result = 'https://dataworks.cn-beijing.aliyuncs.com';
      break;
    case 'cn-shenzhen':
      result = 'https://dataworks.cn-shenzhen.aliyuncs.com';
      break;
    case 'cn-hangzhou':
      result = 'https://dataworks.cn-hangzhou.aliyuncs.com';
      break;
    case 'cn-zhangjiakou':
      result = 'https://dataworks.cn-zhangjiakou.aliyuncs.com';
      break;
    case 'cn-chengdu':
      result = 'https://dataworks.cn-chengdu.aliyuncs.com';
      break;
    case 'cn-wulanchabu':
      result = 'https://dataworks.cn-wulanchabu.aliyuncs.com';
      break;
    case 'cn-hongkong':
      result = 'https://dataworks.cn-hongkong.aliyuncs.com';
      break;
    case 'ap-northeast-1':
      result = 'https://dataworks.ap-northeast-1.aliyuncs.com';
      break;
    case 'ap-southeast-1':
      result = 'https://dataworks.ap-southeast-1.aliyuncs.com';
      break;
    case 'ap-southeast-2':
      result = 'https://dataworks.ap-southeast-2.aliyuncs.com';
      break;
    case 'ap-southeast-3':
      result = 'https://dataworks.ap-southeast-3.aliyuncs.com';
      break;
    case 'ap-southeast-5':
      result = 'https://dataworks.ap-southeast-5.aliyuncs.com';
      break;
    case 'us-east-1':
      result = 'https://dataworks.us-east-1.aliyuncs.com';
      break;
    case 'us-west-1':
      result = 'https://dataworks.us-west-1.aliyuncs.com';
      break;
    case 'eu-west-1':
      result = 'https://dataworks.eu-west-1.aliyuncs.com';
      break;
    case 'eu-central-1':
      result = 'https://dataworks.eu-central-1.aliyuncs.com';
      break;
    case 'ap-south-1':
      result = 'https://dataworks.ap-south-1.aliyuncs.com';
      break;
    case 'me-east-1':
      result = 'https://dataworks.me-east-1.aliyuncs.com';
      break;
    case 'cn-shanghai-finance-1':
      result = 'https://dataworks.cn-shanghai-finance-1.aliyuncs.com';
      break;
    case 'cn-shenzhen-finance-1':
      result = 'https://dataworks.cn-shenzhen-finance-1.aliyuncs.com';
      break;
  }
  return result;
}

export const onQueryTables = async function (request, tab, response) {
  if (request?.type === events.SEARCH_TABLES) {
    const ALY = (window as globalThis)?.ALY;
    if (!ALY?.DATAWORKS) {
      console.error('Aliyun DataWorks SDK does not exist');
      resetCached();
      return;
    }

    const cached = await mcSearchTableInfoStorage.get();
    if (cached?.queryTime > request?.queryTime) return;

    const appGuid = cached?.appGuid;
    if (!appGuid) return;

    if (!cached?.accessKey || !cached?.accessSecret) return;

    let dataworks = new ALY.DATAWORKS({
      // see https://ram.console.aliyun.com/manage/ak
      accessKeyId: cached?.accessKey,
      secretAccessKey: cached?.accessSecret,
      endpoint: getOpenApiEndpoint(cached?.region), // 上海的endpoint，其他地域请参考https://api.aliyun.com/product/dataworks-public
      apiVersion: DW_OPEN_API_VERSION,
    });
    const keyword = request?.keyword;
    dataworks?.searchMetaTables?.({
      AppGuid: cached?.appGuid,
      Keyword: keyword,
      DataSourceType: cached?.type, // support ODPS, emr, holodb
    }, async (err, res: SearchMetaTablesResponse) => {
      if (err) {
        console.warn(err);
        const cached = await mcSearchTableInfoStorage.get();
        mcSearchTableInfoStorage.set({ ...cached, error: String(err) });
        return;
      }
      const cached = await mcSearchTableInfoStorage.get();
      if (keyword === cached?.keyword && (!cached?.querying || request?.queryTime >= cached?.queryTime)) {
        const tables = res?.Data?.DataEntityList || [];
        await mcSearchTableInfoStorage.set({ ...cached, tables, querying: false, keyword: request?.keyword, queryTime: request?.queryTime });
        response(tables); // omnibox 事件通道已关，传回 background 需要透过 storage
      }
    });
  }
}