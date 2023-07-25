import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@app/components/common/buttons/Button/Button';
import { LockOutlined } from '@ant-design/icons';
import { HeaderActionWrapper } from '../../Header.styles';

export const LockAccount: React.FC = () => {
  const navigate = useNavigate();

  const handleLockAccount = () => {
    navigate('/auth/lock');
  };

  return (
    <HeaderActionWrapper>
      <Button type="text" icon={<LockOutlined />} onClick={handleLockAccount} />
    </HeaderActionWrapper>
  );
};
