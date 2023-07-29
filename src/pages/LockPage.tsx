import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { LockForm } from '@app/components/auth/LockForm/LockForm';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Navigate } from 'react-router-dom';

const LockPage: React.FC = () => {
  const [hasLogout, setHasLogout] = useState(false);

  const token = useAppSelector((state) => state.user.profile);
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
