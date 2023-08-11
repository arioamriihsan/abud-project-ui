import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../hooks/useAuthContext';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Navigate } from 'react-router-dom';
import { LockForm } from '../components/LockForm/LockForm';

const LockPage: React.FC = () => {
  const [hasLogout, setHasLogout] = useState(false);

  const { t } = useTranslation();
  const { isLogin } = useAuthContext();

  useEffect(() => {
    if (!isLogin) {
      return setHasLogout(true);
    }
    setHasLogout(false);
  }, [isLogin]);

  return !hasLogout ? (
    <>
      <PageTitle>{t('common.lock')}</PageTitle>
      <LockForm />
    </>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default LockPage;
