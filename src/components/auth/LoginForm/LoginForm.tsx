import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doLogin } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import * as S from './LoginForm.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';

interface LoginFormData {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = (values: LoginFormData) => {
    setLoading(true);
    dispatch(doLogin(values))
      .unwrap()
      .then((res) => {
        const fullName = res?.full_name || '';
        navigate('/');
        notificationController.success({
          message: `${t('auth.greeting')}, ${fullName}`,
        });
      })
      .catch((err) => notificationController.error({ message: err.message }))
      .finally(() => setLoading(false));
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
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
            {t('common.login')}
          </Auth.SubmitButton>
        </BaseForm.Item>
      </BaseForm>
    </Auth.FormWrapper>
  );
};
