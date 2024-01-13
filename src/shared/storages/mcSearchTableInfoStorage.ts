import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { DEFAULT_APP_GUID } from '../constants/common';

type McSearchTableInfo = {
  region: string,
  appGuid?: string;
  accessKey?: string;
  accessSecret?: string;
  tables?: TableInfo[];
  type?: TableType;
  keyword?: string; // 用来判断目前搜索结果对应的关键字
  querying?: boolean; // 是否正在查询
  queryTime?: number; // 发起查询的时间
  error?: string; // 最近一次查询错误讯息
};

const storageKey = 'mc-search-table-info-storage-key';

type McSearchTableInfoStorage = BaseStorage<McSearchTableInfo> & {
  clear: () => void;
};

const storage = createStorage<McSearchTableInfo>(storageKey, { region: 'cn-shanghai', keyword: '', querying: false, appGuid: DEFAULT_APP_GUID, type: 'ODPS' }, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const mcSearchTableInfoStorage: McSearchTableInfoStorage = {
  ...storage,
  // TODO: extends your own methods
  clear: () => {
    storage.set(() => ({ region: 'cn-shanghai', keyword: '', querying: false, appGuid: DEFAULT_APP_GUID, type: 'ODPS' }));
  },
};

export default mcSearchTableInfoStorage;
