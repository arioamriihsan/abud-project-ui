import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { LoginForm } from '../components/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  const { isLogin } = useAuthContext();
  const { t } = useTranslation();

  return !isLogin ? (
    <>
      <PageTitle>{t('common.login')}</PageTitle>
      <LoginForm />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default LoginPage;
