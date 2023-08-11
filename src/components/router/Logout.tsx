import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useAuthContext } from '@app/features/auth/hooks/useAuthContext';
import { usePostLogout } from '@app/features/auth/hooks/authHooks';
import { deleteToken, deleteUser, readUser } from '@app/services/localStorage.service';
import { notificationController } from '@app/controllers/notificationController';
import { Spinner } from '@app/components/common/Spinner/Spinner';

const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Logout: React.FC = () => {
  const profile = readUser();
  const username = profile?.username || '';

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsLogin } = useAuthContext();
  const { mutateAsync: logout } = usePostLogout();

  const doLogout = useCallback(async () => {
    if (!username) return;

    logout({ username })
      .then()
      .catch((err) => notificationController.error({ message: err.message }))
      .finally(() => {
        deleteToken();
        deleteUser();
        setIsLogin(false);
        navigate('/auth/login');
      });
  }, [logout, setIsLogin, navigate, username]);

  useEffect(() => {
    doLogout();
  }, [doLogout]);

  return (
    <LogoutWrapper>
      <Spinner size="large" tip={t('auth.loggingOut')} />
    </LogoutWrapper>
  );
};

export default Logout;
