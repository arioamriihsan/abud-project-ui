import styled from 'styled-components';
import { Card as BaseCard } from 'antd';
import { LAYOUT } from '@app/styles/themes/constants';

export const Card = styled(BaseCard)`
  .ant-card-body {
    padding: 30px ${LAYOUT.mobile.paddingHorizontal};
  }
`;

export const AddBtnWrapper = styled.div`
  position: absolute;
  margin: ${LAYOUT.mobile.paddingHorizontal};
  right: 0;
  top: 0;
`;
