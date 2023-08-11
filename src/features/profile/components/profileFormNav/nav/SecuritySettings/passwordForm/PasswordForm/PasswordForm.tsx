import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';
import { useChangePassword } from '@app/features/auth/hooks/authHooks';
import { useAuthContext } from '@app/features/auth/hooks/useAuthContext';
import { useGetProfile } from '@app/features/profile/hooks/profileHooks';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { ConfirmItemPassword } from '@app/features/profile/components/profileFormNav/nav/SecuritySettings/passwordForm/ConfirmPasswordItem/ConfirmPasswordItem';
import { CurrentPasswordItem } from '@app/features/profile/components/profileFormNav/nav/SecuritySettings/passwordForm/CurrentPasswordItem/CurrentPasswordItem';
import { NewPasswordItem } from '@app/features/profile/components/profileFormNav/nav/SecuritySettings/passwordForm/NewPasswordItem/NewPasswordItem';
import { notificationController } from '@app/controllers/notificationController';
import * as S from './PasswordForm.styles';

interface FormPassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export const PasswordForm: React.FC = () => {
  const [isFieldsChanged, setFieldsChanged] = useState(false);
  const { t } = useTranslation();

  const { isLogin } = useAuthContext();
  const { data: profileData } = useGetProfile(isLogin);
  const username = profileData?.data?.username ?? '';

  const { mutateAsync: changePassword, isLoading: changePasswordLoading } = useChangePassword();

  const onFinish = async (values: FormPassword) => {
    setFieldsChanged(true);

    try {
      const resp = await changePassword({ ...values, username });
      notificationController.success({ message: resp?.data?.message });
      setFieldsChanged(false);
    } catch (err: any) {
      notificationController.error({ message: err.message });
    }
  };

  return (
    <BaseButtonsForm
      name="newPassword"
      requiredMark="optional"
      isFieldsChanged={isFieldsChanged}
      onFieldsChange={() => setFieldsChanged(true)}
      footer={
        <S.Btn loading={changePasswordLoading} type="primary" htmlType="submit">
          {t('common.confirm')}
        </S.Btn>
      }
      onFinish={onFinish}
    >
      <Row gutter={{ md: 15, xl: 30 }}>
        <Col span={24}>
          <BaseButtonsForm.Item>
            <BaseButtonsForm.Title>{t('profile.nav.securitySettings.changePassword')}</BaseButtonsForm.Title>
          </BaseButtonsForm.Item>
        </Col>

        <Col xs={24} md={12} xl={24}>
          <CurrentPasswordItem />
        </Col>

        <Col xs={24} md={12} xl={24}>
          <NewPasswordItem />
        </Col>

        <Col xs={24} md={12} xl={24}>
          <ConfirmItemPassword />
        </Col>
      </Row>
    </BaseButtonsForm>
  );
};
