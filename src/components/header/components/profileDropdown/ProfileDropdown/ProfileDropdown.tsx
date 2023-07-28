import React from 'react';
import { Col, Row } from 'antd';
import { Dropdown } from '@app/components/common/Dropdown/Dropdown';
import { H6 } from '@app/components/common/typography/H6/H6';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import { getInitials, shortenName } from '@app/utils/utils';
import * as S from './ProfileDropdown.styles';

export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();

  const user = useAppSelector((state) => state.user.user);
  const fullName = user?.full_name ?? '';
  const username = user?.username ?? '';
  const userBackgroundColor = user?.background_color ?? '';

  return user ? (
    <Dropdown overlay={<ProfileOverlay />} trigger={['click']}>
      <S.ProfileDropdownHeader as={Row} gutter={[10, 10]} align="middle">
        <Col>
          <S.ProfileAvatar backgroundColor={userBackgroundColor} alt={username} shape="circle" size={40}>
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
