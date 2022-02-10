import styled from 'styled-components';

import BackgroundSVG from '../../../assets/images/authModalBackground.svg';
import DefaultBtn from '../../../components/button/defaultBtn';

const BackgroundIMG = styled.img`
  position: absolute;
  z-index: -2;
`;

const ContentWrapper = styled.div`
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentTitle = styled.h2`
  font-size: var(--font-size-large);
  color: #000;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
`;

const ContentTitleWrapper = styled.div`
  margin-top: 155px;
`;

const ContentTitleDetail = styled.h2`
  margin-top: 10px;
  font-size: var(--font-size-mid);
  color: #000;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
`;

const HighlightText = styled.span`
  font-weight: bold;
  color: var(--color-blue);
`;

const SkipBtn = styled.div`
  margin-top: 26px;
  font-size: var(--font-size-base);
  color: var(--color-dark-grey);
  cursor: pointer;
`;

const FailAuthWrapper = styled.div`
  margin-top: 68px;
  width: 500px;
  display: flex;
  justify-content: space-between;
`;

const FailAuthTitle = styled.span`
  font-weight: bold;
  font-size: var(--font-size-small);
`;

const ResendBtn = styled.span`
  font-size: var(--font-size-small);
  color: var(--color-blue);
  cursor: pointer;
`;

function EmailAuth({ setNextStep }: { setNextStep: () => void }) {
  const alertSkipEmailAuth = () => {
    const ok = confirm('건너뛰면 서비스 이용 일부가 제한될 수 있습니다. 그래도 건너뛰시겠습니까?');
    if (ok) {
      setNextStep();
    }
  };

  return (
    <>
      <BackgroundIMG src={BackgroundSVG} />
      <ContentWrapper>
        <ContentTitle>이메일 인증</ContentTitle>
        <ContentTitleWrapper>
          <ContentTitleDetail>구해줘 팀원의 다양한 서비스 이용을 위해</ContentTitleDetail>
          <ContentTitleDetail>
            <HighlightText>이메일 인증</HighlightText>이 한 번 필요합니다.
          </ContentTitleDetail>
        </ContentTitleWrapper>
        <DefaultBtn onClick={setNextStep} btnName={'인증링크 전송'} width={500} height={50} color={'blue'} />
        <SkipBtn onClick={alertSkipEmailAuth}>건너뛰기</SkipBtn>
        <FailAuthWrapper>
          <FailAuthTitle>이메일을 받지 못하셨나요?</FailAuthTitle>
          <ResendBtn>이메일 인증링크 재전송</ResendBtn>
        </FailAuthWrapper>
      </ContentWrapper>
    </>
  );
}
export default EmailAuth;
