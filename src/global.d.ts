declare module 'virtual:reload-on-update-in-background-script' {
  export const reloadOnUpdate: (watchPath: string) => void;
  export default reloadOnUpdate;
}

declare module 'virtual:reload-on-update-in-view' {
  const refreshOnUpdate: (watchPath: string) => void;
  export default refreshOnUpdate;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

// interface Browser {
//   runtime: {
//     /** open Option page */
//     openOptionsPage: () => void;
//   }
// }

// declare var browser: Browser;


/* ======== APP Types ====== */

declare type TableType = 'ODPS' | 'emr' | 'holodb';


declare interface TableInfo {
  EnvType: number;
  OwnerId: string;
  ProjectId: number;
  ProjectName: string;
  Schema: string;
  TableGuid: string;
  TableName: string;
  TenantId: number;
}

declare interface SearchMetaTablesResponse {
  Data: {
    DataEntityList: TableInfo[];
    TotalCount: number;
  }
}

declare interface DataWorksSDKInstance {
  searchMetaTables: (params: {
    AppGuid: string;
    Keyword: string;
    DataSourceType: string;
  }, callback: (err: any, res: SearchMetaTablesResponse) => void) => void;
}

declare interface globalThis {
  ALY?: {
    DATAWORKS?: new (params: {
      accessKeyId: string;
      secretAccessKey: string;
      endpoint: string;
      apiVersion: string;
    }
    ) => DataWorksSDKInstance;
  };
}

