import styled from 'styled-components';

import BackgroundSVG from '../../../assets/images/authModalBackground.svg';
import Background2PNG from '../../../assets/images/welcome.png';
import LogoImg from '../../../assets/images/logo.svg';
import DefaultBtn from '../../../components/button/defaultBtn';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../../store';

const BackgroundIMG = styled.img`
  position: absolute;
  z-index: -2;
`;

const BackgroundIMG2 = styled.img`
  position: absolute;
  width: 700px;
  top: 25%;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 240px;
  height: 130px;
`;

const ContentBox = styled.div`
  width: 640px;
  height: 295px;
  background-image: none; /* img url */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentTitleWrapper = styled.div``;

const ContentTitle = styled.h2`
  margin-top: 10px;
  font-size: var(--font-size-large);
  color: #000;
  text-align: center;
  letter-spacing: 1px;
`;

const HighlightText = styled.span`
  font-weight: bold;
  color: var(--color-blue);
`;

const CerticifiGuideWrapper = styled.div`
  margin-top: 13px;
`;

const CerticifiGuide = styled.p`
  margin-top: 5px;
  color: var(--color-pink-red);
  font-size: var(--font-size-base);
  text-align: center;
`;

const CerticifiUserInfo = styled.span`
  margin-right: 2px;
  color: #000;
`;

const MarginBlock = styled.div`
  margin-top: 10px;
`;

function Welcome({ setClearState }: { setClearState: () => void }) {
  const userEmail = useSelector((state: rootState) => state.auth.userId);

  const [timer, setTimer] = useState(180);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((now) => {
        if (now == 1) clearInterval(timerId);
        return now - 1;
      });
    }, 1000);
  }, []);

  return (
    <>
      <BackgroundIMG src={BackgroundSVG} />
      <BackgroundIMG2 src={Background2PNG} />
      <ContentWrapper>
        <Logo src={LogoImg} />
        <ContentBox>
          <ContentTitleWrapper>
            <ContentTitle>
              <HighlightText>?????????</HighlightText>???, {/* ?????? ????????? ?????? */}
            </ContentTitle>
            <ContentTitle>
              <HighlightText>???????????????</HighlightText>??? ?????????
            </ContentTitle>
            <ContentTitle>
              <HighlightText>??????</HighlightText>??? ????????? <HighlightText>???????????????!</HighlightText>
            </ContentTitle>
          </ContentTitleWrapper>
        </ContentBox>
        <CerticifiGuideWrapper>
          <CerticifiGuide>
            <CerticifiUserInfo>{userEmail}</CerticifiUserInfo>?????? ????????? ??????????????? ??????????????????.
          </CerticifiGuide>{' '}
          {/* ?????? ????????? ?????? */}
          <CerticifiGuide>
            <CerticifiUserInfo>{`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}</CerticifiUserInfo>?????????
            ??????????????? ?????? ??? ????????? ????????? ??????????????????.
          </CerticifiGuide>
        </CerticifiGuideWrapper>
        <MarginBlock />
        <DefaultBtn onClick={setClearState} btnName={'??????????????? ??????'} width={430} height={35} color={'yellow'} />
      </ContentWrapper>
    </>
  );
}

export default Welcome;
