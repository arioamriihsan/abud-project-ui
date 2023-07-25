import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@app/components/auth/LoginForm/LoginForm';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useAppSelector } from '@app/hooks/reduxHooks';

const LoginPage: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { t } = useTranslation();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PageTitle>{t('common.login')}</PageTitle>
      <LoginForm />
    </>
  );
};

export default LoginPage;
