import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Panel } from '@app/components/common/Collapse/Collapse';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Button } from '@app/components/common/buttons/Button/Button';
import { mergeBy } from '@app/utils/utils';
import * as S from './IndividuSearch.styles';

interface FieldData {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}

const IndividuSearch: React.FC = () => {
  const [fields, setFields] = useState<FieldData[]>([
    { name: 'nik', value: '' },
    { name: 'name', value: '' },
    { name: 'npwp', value: '' },
  ]);

  const [form] = BaseForm.useForm();
  const { t } = useTranslation();

  return (
    <S.CollapseWrapper defaultActiveKey={['1']}>
      <Panel header={t('customers.filter')} key="1">
        <BaseForm
          form={form}
          layout="vertical"
          name="filterIndividu"
          onFieldsChange={(_, allFields) => {
            const currentFields = allFields.map((item) => ({
              name: Array.isArray(item.name) ? item.name[0] : '',
              value: item.value,
            }));
            const uniqueData = mergeBy(fields, currentFields, 'name');
            setFields(uniqueData);
          }}
        >
          <Row gutter={{ md: 15, xl: 30 }}>
            <Col xs={24} md={12} xl={12}>
              <BaseForm.Item name="nik" label="NIK">
                <Input />
              </BaseForm.Item>
            </Col>
            <Col xs={24} md={12} xl={12}>
              <BaseForm.Item name="name" label={t('common.name')}>
                <Input />
              </BaseForm.Item>
            </Col>
            <Col xs={24} md={12} xl={12}>
              <BaseForm.Item name="npwp" label="NPWP">
                <Input />
              </BaseForm.Item>
            </Col>
          </Row>
          <Button icon={<SearchOutlined />} type="primary">
            {t('customers.apply')}
          </Button>
        </BaseForm>
      </Panel>
    </S.CollapseWrapper>
  );
};

export default IndividuSearch;
