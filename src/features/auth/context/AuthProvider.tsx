import React, { createContext, useState, useEffect, PropsWithChildren } from 'react';
import { readToken } from '@app/services/localStorage.service';

interface AuthContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

/** No operation */
// eslint-disable-next-line
const noop = () => {};

const defaultAuthContextValue = {
  isLogin: false,
  setIsLogin: noop,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const accessToken = readToken();

  const [isLogin, setIsLogin] = useState(false);

  const AuthProviderValue = {
    isLogin,
    setIsLogin,
  };

  useEffect(() => {
    if (!!accessToken) {
      return setIsLogin(true);
    }
    setIsLogin(false);
  }, [accessToken]);

  return <AuthContext.Provider value={AuthProviderValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
