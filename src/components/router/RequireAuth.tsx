import React from 'react';
import { Navigate } from 'react-router-dom';
import { WithChildrenProps } from '@app/types/generalTypes';
import { useAuthContext } from '@app/features/auth/hooks/useAuthContext';

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const { isLogin } = useAuthContext();

  return isLogin ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
