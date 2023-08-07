import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Navigate } from 'react-router-dom';
import { LockForm } from '../components/LockForm/LockForm';
import { readToken } from '@app/services/localStorage.service';

const LockPage: React.FC = () => {
  const token = readToken();
  const [hasLogout, setHasLogout] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (!token) {
      return setHasLogout(true);
    }
    setHasLogout(false);
  }, [token]);

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
