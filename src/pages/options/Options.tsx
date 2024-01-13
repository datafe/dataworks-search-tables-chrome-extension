import React, { useState, useEffect } from 'react';
import logo from '@assets/img/logo.svg';
import useStorage from '@src/shared/hooks/useStorage';
import mcSearchTableInfoStorage from '@src/shared/storages/mcSearchTableInfoStorage';
import intl from 'react-intl-universal';
import { Button, Space, Card, Select, Input, message } from 'antd';
// import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { PRODUCT_NAME } from '@src/shared/constants/common';

import '@pages/options/Options.scss';
import { onQueryTables } from '@root/src/shared/utils/request';

interface IProps {

}

const selfExtensionId = chrome?.runtime?.id;


const Options: React.FC<IProps> = () => {

  const mcSearchTableInfo = useStorage(mcSearchTableInfoStorage);

  const [accessKey, setAccessKey] = useState<string>(mcSearchTableInfo.accessKey);
  const [accessSecret, setAccessSecret] = useState<string>(mcSearchTableInfo.accessSecret);
  const [region, setRegion] = useState<string>(mcSearchTableInfo?.region);
  const [appGuid, setAppGuid] = useState<string>(mcSearchTableInfo?.appGuid);
  const [type, setType] = useState<TableType>(mcSearchTableInfo?.type);

  useEffect(() => {
    document.title = intl.get('options').d('设定');

    // when open
    chrome.runtime.onMessage.addListener(onQueryTables);
  }, []);

  const onChangeAccessKey = async (value: string) => {
    setAccessKey(value);
    // const cached = await mcSearchTableInfoStorage.get();
    // mcSearchTableInfoStorage.set({ ...cached, accessKey: value });
  };

  const onChangeAccessSecret = async (value: string) => {
    setAccessSecret(value);
    // const cached = await mcSearchTableInfoStorage.get();
    // mcSearchTableInfoStorage.set({ ...cached, accessSecret: value });
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

  const onSave = async () => {
    mcSearchTableInfoStorage.set({
      accessKey,
      accessSecret,
      region,
      type,
      appGuid,
    });
    message.success(intl.get('saveSuccess').d('保存成功'));
  };

  return (
    <div className="app options">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <div className="header-text">{PRODUCT_NAME}</div>
      </header>
      <div className="content">

        <Space className="content-space" direction="vertical" size="middle">
          <Card title={intl.get('securityParameters').d('安全设定')} size="small">
            <div className="access-key form-item">
              <div className="label">Access Key</div>
              <Input
                defaultValue={mcSearchTableInfo?.accessKey}
                value={accessKey}
                onChange={(e: { target: { value: string } }) => onChangeAccessKey(e?.target?.value)} />
            </div>
            <div className="access-secret form-item">
              <div className="label">Access Secret</div>
              <Input
                defaultValue={mcSearchTableInfo?.accessSecret}
                value={accessSecret}
                onChange={(e: { target: { value: string } }) => onChangeAccessSecret(e?.target?.value)} />
            </div>
            <Button className="save-options" type="primary" onClick={onSave}>{intl.get('save').d('保存')}</Button>
          </Card>
          <Card title={intl.get('locationParameters').d('接口设定')} size="small">

            <div className="region-selector-wrapper form-item">
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

            <div className="app-guid-input-wrapper form-item">
              <div className="label">{intl.get('appGuid')}</div>
              <Input
                defaultValue={mcSearchTableInfo?.appGuid}
                value={appGuid}
                onChange={(e: { target: { value: string } }) => onChangeAppGuid(e?.target?.value)} />
            </div>

            <div className="region-selector-wrapper form-item">
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

          </Card>
          <Card title={intl.get('otherInfo').d('其它讯息')} size="small">
            <div className="access-key form-item">
              <div className="label">{intl.get('requestTime').d('请求时间')}</div>
              <div>{mcSearchTableInfo?.queryTime ? new Date(mcSearchTableInfo?.queryTime)?.toLocaleString?.() : intl.get('empty').d('无')}</div>
            </div>
            <div className="access-key form-item">
              <div className="label">{intl.get('requestError').d('请求错误')}</div>
              {mcSearchTableInfo?.error ? <div className="error-msg">{mcSearchTableInfo?.error}</div> : <div>{intl.get('empty').d('无')}</div>}
            </div>
          </Card>
        </Space>
      </div>
    </div>
  );
};

export default Options;
