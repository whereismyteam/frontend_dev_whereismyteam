import styled from 'styled-components';

import BackgroundSVG from '../../../assets/images/authModalBackground.svg';
import Background2PNG from '../../../assets/images/welcome.png';
import LogoImg from '../../../assets/images/logo.svg';
import DefaultYellowBtn from '../../../components/button/defaultYellowBtn';

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

const VerificationTime = styled.span`
  margin-right: 2px;
  color: var(--color-blue);
`;

function Welcome() {
  return (
    <>
      <BackgroundIMG src={BackgroundSVG} />
      <BackgroundIMG2 src={Background2PNG} />
      <ContentWrapper>
        <Logo src={LogoImg} />
        <ContentBox>
          <ContentTitleWrapper>
            <ContentTitle>
              <HighlightText>홍길동</HighlightText>님, {/* 이름 받도록 수정 */}
            </ContentTitle>
            <ContentTitle>
              <HighlightText>구해줘팀원</HighlightText>의 새로운
            </ContentTitle>
            <ContentTitle>
              <HighlightText>멤버</HighlightText>가 되신걸 <HighlightText>환영합니다!</HighlightText>
            </ContentTitle>
          </ContentTitleWrapper>
        </ContentBox>
        <CerticifiGuideWrapper>
          <CerticifiGuide>9T123@gmail.com으로 이메일 인증링크를 전송했습니다.</CerticifiGuide> {/* 메일 받도록 수정 */}
          <CerticifiGuide>
            <VerificationTime>03:00</VerificationTime>이내로 인증링크를 클릭 후 이메일 인증을 완료해주세요.
          </CerticifiGuide>
        </CerticifiGuideWrapper>
        <DefaultYellowBtn btnName={'로그인하러 가기'} width={430} height={35} marginTop={20} />
      </ContentWrapper>
    </>
  );
}

export default Welcome;
