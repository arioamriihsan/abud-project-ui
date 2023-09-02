import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { Table } from 'components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import * as S from './IndividuTable.styles';
import { useResponsive } from '@app/hooks/useResponsive';

const IndividuTable: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mobileOnly } = useResponsive();

  const columns = [
    {
      title: 'NIK',
      dataIndex: 'nik',
    },
    {
      title: t('common.name'),
      dataIndex: 'name',
    },
    {
      title: 'NPWP',
      dataIndex: 'npwp',
    },
    {
      title: t('common.address'),
      dataIndex: 'address',
    },
    {
      title: t('customers.occupation'),
      dataIndex: 'occupation',
    },
    {
      title: 'KTP',
      dataIndex: 'ktp',
    },
  ];

  const handleClick = () => navigate('/customers/individu/create');

  return (
    <S.Card title={t('customers.tableTitle')}>
      <S.AddBtnWrapper>
        <Button
          size="small"
          type="primary"
          shape={mobileOnly ? 'circle' : 'default'}
          icon={<PlusOutlined />}
          onClick={handleClick}
        >
          {!mobileOnly && t('buttons.add')}
        </Button>
      </S.AddBtnWrapper>
      <Table
        components={{
          body: {
            cell: undefined,
          },
        }}
        bordered
        dataSource={[]}
        columns={columns}
        loading={false}
        scroll={{ x: 800 }}
      />
    </S.Card>
  );
};

export default IndividuTable;
