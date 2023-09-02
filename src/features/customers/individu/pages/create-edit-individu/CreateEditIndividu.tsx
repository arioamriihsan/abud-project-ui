import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
import { Card } from 'components/common/Card/Card';
import { Button } from '@app/components/common/buttons/Button/Button';
import { capitalize } from '@app/utils/utils';

const CreateEditIndividu: React.FC = () => {
  const { type } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Btn icon={<LeftOutlined />} type="text" onClick={() => navigate('/customers/individu')}>
        {t('common.back')}
      </Btn>
      <Card title={`${capitalize(type || '')} Individu`}>
        <div>Buat Form</div>
      </Card>
    </>
  );
};

const Btn = styled(Button)`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  padding: 0;
  height: unset;
  color: var(--secondary-color);
`;

export default CreateEditIndividu;
