import styled from 'styled-components';

import LoginInputBar from './inputBar';
import DefaultBlueBtn from '../../../components/button/defaultBlueBtn';
import BackgroundSVG from '../../../assets/images/authModalBackground.svg';
import LogoImg from '../../../assets/images/logo.svg';
import GoogleIcon from '../../../assets/images/googleIcon.svg';

const BackgroundIMG = styled.img`
  position: absolute;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  margin-top: 64px;
  margin-bottom: 58px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 240px;
  height: 130px;
`;

const DescriptionWrapper = styled.div`
  margin-top: 17px;
  margin-bottom: 24px;
  font-size: var(--font-size-mid);
  color: #909090;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
`;

const SignUpSpan = styled.span`
  margin-top: 30px;
  font-size: var(--font-size-base);
  font-weight: bold;
  color: #909090;
  cursor: pointer;
`;

const SocialLoginSection = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SocialIcon = styled.img`
  width: 70px;
  height: 70px;
`;

const SocialDescription = styled.span`
  margin-top: 10px;
  font-size: var(--font-size-small);
  color: #909090;
`;

function Login({ setRegister }: { setRegister: () => void }) {
  return (
    <>
      <BackgroundIMG src={BackgroundSVG} />
      <ContentWrapper>
        <Logo src={LogoImg} />
        <DescriptionWrapper>
          <span>프로젝트, 대회, 스터디 팀원 구인은</span>
          <span>간편하게 구해줘 팀원에서!</span>
        </DescriptionWrapper>
        <LoginInputBar spellCheck={false} placeholder="이메일" />
        <LoginInputBar type="password" placeholder="비밀번호" />
        <DefaultBlueBtn btnName={'로그인'} width={400} height={50} marginTop={14} />
        <SignUpSpan onClick={setRegister}>회원가입</SignUpSpan>
        <SocialLoginSection>
          <SocialIcon src={GoogleIcon} />
          <SocialDescription>구글 계정으로 로그인</SocialDescription>
        </SocialLoginSection>
      </ContentWrapper>
    </>
  );
}

export default Login;
