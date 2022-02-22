import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchEmailSend } from '../../../apis';

import BackgroundSVG from '../../../assets/images/authModalBackground.svg';
import LoadingSpinner from '../../../assets/styles/loadingSpinner';
import DefaultBtn from '../../../components/button/defaultBtn';
import { rootState } from '../../../store';

const BackgroundIMG = styled.img`
  position: absolute;
  z-index: -2;
`;

const ContentWrapper = styled.div`
  padding: 40px;
  position: relative;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const ContentTitle = styled.h2`
  font-size: var(--font-size-large);
  color: #000;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
`;

const ContentTitleWrapper = styled.div``;

const ContentTitleDetail = styled.h2`
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
  font-size: var(--font-size-base);
  color: var(--color-dark-grey);
  cursor: pointer;
`;

const FailAuthWrapper = styled.div`
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
  const userEmail = useSelector((state: rootState) => state.auth.userId);

  const [loading, setLoading] = useState(false);

  const alertSkipEmailAuth = () => {
    const ok = confirm('건너뛰면 서비스 이용 일부가 제한될 수 있습니다. 그래도 건너뛰시겠습니까?');
    if (ok) {
      setNextStep();
    }
  };

  const onClickBtn = async () => {
    setLoading(true);
    const response = await fetchEmailSend(userEmail);

    if (response.ok) {
      setNextStep();
    } else {
      alert(response.msg);
    }
  };

  return (
    <>
      <BackgroundIMG src={BackgroundSVG} />
      <ContentWrapper>
        {loading ? <ContentTitle>이메일 전송중입니다</ContentTitle> : <ContentTitle>이메일 인증</ContentTitle>}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <ContentTitleWrapper>
              <ContentTitleDetail>구해줘 팀원의 다양한 서비스 이용을 위해</ContentTitleDetail>
              <ContentTitleDetail>
                <HighlightText>이메일 인증</HighlightText>이 한 번 필요합니다.
              </ContentTitleDetail>
            </ContentTitleWrapper>
            <DefaultBtn onClick={onClickBtn} btnName={'인증링크 전송'} width={500} height={50} color={'blue'} />
            <SkipBtn onClick={alertSkipEmailAuth}>건너뛰기</SkipBtn>
          </>
        )}
        <FailAuthWrapper>
          <FailAuthTitle>이메일을 받지 못하셨나요?</FailAuthTitle>
          <ResendBtn>이메일 인증링크 재전송</ResendBtn>
        </FailAuthWrapper>
      </ContentWrapper>
    </>
  );
}
export default EmailAuth;
