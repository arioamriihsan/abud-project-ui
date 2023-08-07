import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '@app/hooks/useResponsive';
import { getInitials } from '@app/utils/utils';
import { Profile } from '@app/api/profile.api';
import * as S from './ProfileInfo.styles';

interface ProfileInfoProps {
  profileData: Profile | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  const [fullness] = useState(90);

  const { t } = useTranslation();
  const { isDesktop } = useResponsive();

  const fullName = profileData?.full_name ?? '';
  const username = profileData?.username ?? '';

  return profileData ? (
    <S.Wrapper>
      <S.ImgWrapper>
        <S.AvatarCircle size={isDesktop ? 160 : 100} shape="circle" alt="Profile">
          {getInitials(fullName)}
        </S.AvatarCircle>
      </S.ImgWrapper>
      <S.Title>{fullName}</S.Title>
      <S.Subtitle>{username}</S.Subtitle>
      <S.FullnessWrapper>
        <S.FullnessLine width={fullness}>{fullness}%</S.FullnessLine>
      </S.FullnessWrapper>
      <S.Text>{t('profile.fullness')}</S.Text>
    </S.Wrapper>
  ) : null;
};
