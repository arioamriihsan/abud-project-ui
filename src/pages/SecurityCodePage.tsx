import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { SecurityCodeForm } from '@app/features/auth/components/SecurityCodeForm/SecurityCodeForm';

const SecurityCodePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.securityCode')}</PageTitle>
      <SecurityCodeForm />
    </>
  );
};

export default SecurityCodePage;
