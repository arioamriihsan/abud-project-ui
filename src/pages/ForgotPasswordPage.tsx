import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { ForgotPasswordForm } from '@app/features/auth/components/ForgotPasswordForm/ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('common.forgotPass')}</PageTitle>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPasswordPage;
