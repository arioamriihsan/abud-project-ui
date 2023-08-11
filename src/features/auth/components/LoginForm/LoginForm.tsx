import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePostLogin } from '../../hooks/authHooks';
import { useAuthContext } from '../../hooks/useAuthContext';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { notificationController } from '@app/controllers/notificationController';
import { getProfile } from '@app/api/profile.api';
import { LoginRequest } from '@app/api/auth.api';
import { persistUser } from '@app/services/localStorage.service';
import * as S from './LoginForm.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setIsLogin } = useAuthContext();
  const { mutateAsync: login, isLoading: loginLoading } = usePostLogin();

  const handleSubmit = async (form: LoginRequest) => {
    const { username, password } = form;
    if (!username || !password) return;

    try {
      await login({ username, password });
      const profileResp = await getProfile();

      const profileData = profileResp?.data?.data;
      const fullName = profileData?.full_name || '';

      setIsLogin(true);
      persistUser(profileData);

      navigate('/');

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
        <Auth.FormTitle>{t('common.login')}</Auth.FormTitle>
        <S.LoginDescription>{t('login.loginInfo')}</S.LoginDescription>
        <Auth.FormItem
          name="username"
          label={t('common.userName')}
          rules={[{ required: true, message: t('auth.requiredUsername') }]}
        >
          <Auth.FormInput placeholder={t('common.userName')} />
        </Auth.FormItem>
        <Auth.FormItem
          name="password"
          label={t('common.password')}
          rules={[
            { required: true, message: t('auth.requiredPassword') },
            { min: 8, message: t('auth.minPassword') },
          ]}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </Auth.FormItem>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={loginLoading}>
            {t('common.login')}
          </Auth.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
