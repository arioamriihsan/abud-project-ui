import React from 'react';
import { Button as BaseButton } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BASE_COLORS } from '@app/styles/themes/constants';

export const GuidenceButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const { t } = useTranslation();

  return (
    <Button
      type="link"
      href="https://docs.google.com/document/d/1agQcNQOJysPJH5VPEvWDNlBtYCPgLn4VN0LyR0OCK5Q/edit?usp=sharing"
      icon={<GuidenceIcon />}
      target="_blank"
      $isDark={theme === 'dark'}
      {...props}
    >
      {t('header.guidence')}
    </Button>
  );
};

const Button = styled(BaseButton)<{ $isDark: boolean }>`
  color: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  background: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
  border-radius: 50px;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
    background: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  }
`;

const GuidenceIcon = styled(ReadOutlined)`
  font-size: 1.5rem;
  vertical-align: middle;
`;
