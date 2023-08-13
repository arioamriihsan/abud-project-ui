import React from 'react';
import { Col, Row } from 'antd';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { H6 } from '@app/components/common/typography/H6/H6';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useResponsive } from '@app/hooks/useResponsive';
import { getInitials, shortenName } from '@app/utils/utils';
import { readUser } from '@app/services/localStorage.service';
import * as S from './ProfileDropdown.styles';

export const ProfileDropdown: React.FC = () => {
  const profile = readUser();
  const { isTablet } = useResponsive();

  const fullName = profile?.full_name ?? '';
  const username = profile?.username ?? '';
  const userBackgroundColor = profile?.background_color ?? '';

  return !!profile ? (
    <Dropdown overlay={<ProfileOverlay />} trigger={['click']}>
      <S.ProfileDropdownHeader as={Row} gutter={[10, 10]} align="middle">
        <Col>
          <S.ProfileAvatar backgroundcolor={userBackgroundColor} alt={username} shape="circle" size={40}>
            {getInitials(fullName)}
          </S.ProfileAvatar>
        </Col>
        {isTablet && (
          <Col>
            <H6>{shortenName(fullName)}</H6>
          </Col>
        )}
      </S.ProfileDropdownHeader>
    </Dropdown>
  ) : null;
};
