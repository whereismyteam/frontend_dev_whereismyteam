import styled from 'styled-components';

import LoginInputBar from './inputBar';
import DefaultButton from '../../../components/button/defaultButton';
import BackgroundSVG from '../../../assets/images/authModalBackground.svg';
import LogoImg from '../../../assets/images/logo.svg';
import GoogleIcon from '../../../assets/images/googleIcon.svg';

const BackgroundIMG = styled.img`
  position: absolute;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Logo = styled.img`
  width: 240px;
  height: 130px;
`;

const DescriptionWrapper = styled.div`
  font-size: var(--font-size-mid);
  color: #909090;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
`;

const SignUpSpan = styled.span`
  font-size: var(--font-size-base);
  font-weight: bold;
  color: #909090;
  cursor: default;
`;

const SocialLoginSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SocialIcon = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
`;

const SocialDescription = styled.span`
  margin-top: 5px;
  font-size: var(--font-size-small);
  color: #909090;
  cursor: default;
`;

function Login() {
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
        <DefaultButton width={400} height={50}>
          로그인
        </DefaultButton>
        <SignUpSpan>회원가입</SignUpSpan>
        <SocialLoginSection>
          <SocialIcon src={GoogleIcon} />
          <SocialDescription>구글 계정으로 로그인</SocialDescription>
        </SocialLoginSection>
      </ContentWrapper>
    </>
  );
}

export default Login;
