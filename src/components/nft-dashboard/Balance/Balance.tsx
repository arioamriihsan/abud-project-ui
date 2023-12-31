import React from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { NFTCard } from '@app/components/nft-dashboard/common/NFTCard/NFTCard';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { formatNumberWithCommas, getCurrencyPrice } from '@app/utils/utils';
import * as S from './Balance.styles';

export const Balance: React.FC = () => {
  const { theme } = useAppSelector((state) => state.theme);

  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24}>
        <S.TitleText level={2}>{t('nft.yourBalance')}</S.TitleText>
      </Col>

      <Col span={24}>
        <NFTCard isSider>
          <Row gutter={[30, 30]}>
            <Col span={24}>
              <Row gutter={[14, 14]}>
                <Col span={24}>
                  <S.TitleBalanceText level={3}>
                    {getCurrencyPrice(formatNumberWithCommas(100), 'USD')}
                  </S.TitleBalanceText>
                </Col>

                <Col span={24}>
                  <Row gutter={[55, 10]} wrap={false}>
                    <Col>
                      <S.SubtitleBalanceText>
                        {getCurrencyPrice(formatNumberWithCommas(200), 'ETH')}
                      </S.SubtitleBalanceText>
                    </Col>

                    <Col>
                      <S.SubtitleBalanceText>
                        {getCurrencyPrice(formatNumberWithCommas(300), 'BTC')}
                      </S.SubtitleBalanceText>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <S.TopUpButton type={theme === 'dark' ? 'ghost' : 'primary'} block>
                {t('nft.topUpBalance')}
              </S.TopUpButton>
            </Col>
          </Row>
        </NFTCard>
      </Col>
    </Row>
  );
};
