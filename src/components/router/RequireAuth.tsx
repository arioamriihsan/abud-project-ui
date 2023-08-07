import React from 'react';
import { Navigate } from 'react-router-dom';
import { WithChildrenProps } from '@app/types/generalTypes';
import { readToken, readUser } from '@app/services/localStorage.service';

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const token = readToken();
  const user = readUser();

  const loginSuccess = !!token && user;

  return loginSuccess ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
