import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '@app/hooks/useResponsive';
import { usePostLogin } from '@app/features/auth/hooks/authHooks';
import { Dates } from '@app/constants/Dates';
import { getInitials } from '@app/utils/utils';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { notificationController } from '@app/controllers/notificationController';
import { readUser } from '@app/services/localStorage.service';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';
import * as S from './LockForm.styles';

interface LockFormData {
  password: string;
}

export const LockForm: React.FC = () => {
  const navigate = useNavigate();
  const { mobileOnly } = useResponsive();
  const { t } = useTranslation();

  const { mutateAsync: login, isLoading: loginLoading } = usePostLogin();

  const [dateState, setDateState] = useState(new Date());

  const user = readUser();
  const fullName = user?.full_name || '';
  const username = user?.username || '';
  const userBackgroundColor = user?.background_color || '';

  const currentDateInUTC = dateState.toUTCString();
  const currentTime = Dates.format(currentDateInUTC, 'h:mm A');
  const currentDate = Dates.format(currentDateInUTC, 'dddd, MMMM D YYYY');

  useEffect(() => {
    const interval = setInterval(() => setDateState(new Date()), 10 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async ({ password }: LockFormData) => {
    if (!password || !username) return;

    try {
      await login({ username, password });

      navigate(-1);
      notificationController.success({
        message: `${t('auth.greeting')}, ${fullName}`,
      });
    } catch (err: any) {
      notificationController.error({ message: err.message });
    }
  };

  return (
    <Auth.FormWrapper>
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional">
        <S.ContentWrapper>
          <S.Time>{currentTime}</S.Time>
          <S.Date>{currentDate}</S.Date>
          <S.AvatarCircle>
            <S.LockAvatar
              backgroundColor={userBackgroundColor}
              alt={username}
              shape="circle"
              size={mobileOnly ? 59 : 77}
            >
              {getInitials(fullName)}
            </S.LockAvatar>
          </S.AvatarCircle>
          <S.Name>{fullName}</S.Name>
        </S.ContentWrapper>
        <S.FormItem
          label={t('common.password')}
          name="password"
          rules={[
            { required: true, message: t('auth.requiredPassword') },
            { min: 8, message: t('auth.minPassword') },
          ]}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </S.FormItem>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={loginLoading}>
            {t('common.login')}
          </Auth.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
