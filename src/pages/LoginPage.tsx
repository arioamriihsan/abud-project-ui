import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { readToken } from '@app/services/localStorage.service';
import { LoginForm } from '@app/components/auth/LoginForm/LoginForm';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const LoginPage: React.FC = () => {
  const token = readToken();

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
