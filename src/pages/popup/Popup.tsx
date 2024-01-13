import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import logo from '@assets/img/logo.svg';
import useForceUpdate from '@src/shared/hooks/useForceUpdate';
import useStorage from '@src/shared/hooks/useStorage';
import mcSearchTableInfoStorage from '@src/shared/storages/mcSearchTableInfoStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Select, Input, Button } from 'antd';
import { ControlOutlined, ReloadOutlined } from '@ant-design/icons';
import { PRODUCT_NAME } from '@src/shared/constants/common';
import { onQueryTables } from '@root/src/shared/utils/request';

import '@pages/popup/Popup.scss';

type McSearchTableInfo = { region: string; appGuid: string };

interface IProps { }

const Popup: React.FC<IProps> = () => {
  const mcSearchTableInfo = useStorage(mcSearchTableInfoStorage);
  const forceUpdate = useForceUpdate();

  // clone data for value change
  const [loading, setLoading] = useState(false);

  const [region, setRegion] = useState<string>(mcSearchTableInfo?.region);
  const [appGuid, setAppGuid] = useState<string>(mcSearchTableInfo?.appGuid);
  const [type, setType] = useState<TableType>(mcSearchTableInfo?.type);

  // use reloading flag to refresh whole page
  const [reloading, setReloading] = useState(false);

  /** open option page */
  const openOptionsPage = () => {
    chrome?.runtime?.openOptionsPage?.();
  };

  const onChangeRegion = async (v: string) => {
    setRegion(v);
    const cached = await mcSearchTableInfoStorage?.get();
    mcSearchTableInfoStorage?.set?.({ ...cached, region: v });
  }

  const onChangeAppGuid = async (v: string) => {
    setAppGuid(v);
    const cached = await mcSearchTableInfoStorage?.get();
    mcSearchTableInfoStorage?.set?.({ ...cached, appGuid: v });
  }

  const onChangeType = async (v: TableType) => {
    setType(v);
    const cached = await mcSearchTableInfoStorage?.get();
    mcSearchTableInfoStorage?.set?.({ ...cached, type: v });
  }

  const reloadPage = async () => {
    setLoading(true);
    const cached = await mcSearchTableInfoStorage?.get();
    setRegion(cached?.region);
    setAppGuid(cached?.appGuid);
    setType(cached?.type);
    setLoading(false);
  };

  useEffect(() => {

    // did mount
    document.title = intl.get('appName').d('阿里云 DataWorks 搜表');

    // when popup open
    chrome.runtime.onMessage.addListener(onQueryTables);

  }, []);

  useEffect(() => {
    if (reloading) setReloading(false);
  }, [reloading]);

  if (reloading) return <div className="app popup reloading"> {intl.get('reloading').d('重新载入')} ... </div>;

  return (
    <div className="app popup">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <div className="header-text">{PRODUCT_NAME}</div>
        <ReloadOutlined className="reload-icon" onClick={() => reloadPage()} />
        <ControlOutlined className="option-icon" onClick={openOptionsPage} />
      </header>
      <div className="content">
        <div className="region-selector-wrapper">
          <div className="label">{intl.get('region')}</div>
          <Select
            defaultValue={mcSearchTableInfo?.region}
            value={region}
            onChange={onChangeRegion}
            options={[
              { value: 'cn-shanghai', label: intl.get('cn-shanghai') },
              { value: 'cn-beijing', label: intl.get('cn-beijing') },
              { value: 'cn-shenzhen', label: intl.get('cn-shenzhen') },
              { value: 'cn-hangzhou', label: intl.get('cn-hangzhou') },
              { value: 'cn-chengdu', label: intl.get('cn-chengdu') },
              { value: 'cn-zhangjiakou', label: intl.get('cn-zhangjiakou') },
              { value: 'cn-wulanchabu', label: intl.get('cn-wulanchabu') },
              { value: 'cn-hongkong', label: intl.get('cn-hongkong') },
              { value: 'ap-northeast-1', label: intl.get('ap-northeast-1') },
              { value: 'ap-southeast-1', label: intl.get('ap-southeast-1') },
              { value: 'ap-southeast-2', label: intl.get('ap-southeast-2') },
              { value: 'ap-southeast-3', label: intl.get('ap-southeast-3') },
              { value: 'ap-southeast-5', label: intl.get('ap-southeast-5') },
              { value: 'us-east-1', label: intl.get('us-east-1') },
              { value: 'us-west-1', label: intl.get('us-west-1') },
              { value: 'eu-west-1', label: intl.get('eu-west-1') },
              { value: 'eu-central-1', label: intl.get('eu-central-1') },
              { value: 'ap-south-1', label: intl.get('ap-south-1') },
              { value: 'me-east-1', label: intl.get('me-east-1') },
              { value: 'cn-shanghai-finance-1', label: intl.get('cn-shanghai-finance-1') },
              { value: 'cn-shenzhen-finance-1', label: intl.get('cn-shenzhen-finance-1') },
              { value: 'cn-north-2-gov-1', label: intl.get('cn-north-2-gov-1') },
            ]}
          />
        </div>
        <div className="app-guid-input-wrapper">
          <div className="label">{intl.get('appGuid')}</div>
          <Input
            defaultValue={mcSearchTableInfo?.appGuid}
            value={appGuid}
            onChange={(e: { target: { value: string } }) => onChangeAppGuid(e?.target?.value)} />
        </div>
        <div className="region-selector-wrapper">
          <div className="label">{intl.get('tableType')}</div>
          <Select
            defaultValue={mcSearchTableInfo?.type}
            value={type}
            onChange={onChangeType}
            options={[
              { value: 'ODPS', label: intl.get('mcTable') },
              { value: 'emr', label: intl.get('emrTable') },
              { value: 'holodb', label: intl.get('holoTable') },
            ]}
          />
        </div>
        <div className="request-time-wrapper">
          <div className="label">{intl.get('requestTime').d('请求时间')}</div>
          <div>{mcSearchTableInfo?.queryTime ? new Date(mcSearchTableInfo?.queryTime)?.toLocaleString?.() : intl.get('empty').d('无')}</div>
        </div>
        <div className="request-error-wrapper">
          <div className="label">{intl.get('requestError').d('请求错误')}</div>
          {mcSearchTableInfo?.error ? <div className="error-msg">{mcSearchTableInfo?.error}</div> : <div>{intl.get('empty').d('无')}</div>}
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> {intl.get('loading').d('载入中')} ... </div>), <div> {intl.get('errorOccur').d('发生错误')} </div>);
