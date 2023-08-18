import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Navigate } from 'react-router-dom';

const AutoLogout: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: userKickOut } = useQuery('Force Logout', () => {
    return queryClient.getQueryData('Force Logout') || (false as boolean);
  });

  return userKickOut ? <Navigate to={'/logout'} replace /> : null;
};

export default AutoLogout;
