import styled from 'styled-components';
import { media } from '@app/styles/themes/constants';
import { Collapse } from 'components/common/Collapse/Collapse';
import { Button } from '@app/components/common/buttons/Button/Button';

export const CollapseWrapper = styled(Collapse)`
  width: 100%;
  margin-bottom: 1.25rem;
`;

export const Btn = styled(Button)`
  margin: 0.5rem 0 1.5rem 0;
  width: 100%;

  @media only screen and ${media.md} {
    max-width: 10rem;
  }

  @media only screen and ${media.xl} {
    max-width: unset;
  }
`;
