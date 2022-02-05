import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import LoginInputBar from './inputBar';
import DefaultBtn from '../../../components/button/defaultBtn';
import BackgroundSVG from '../../../assets/images/authModalBackground.svg';
import LogoImg from '../../../assets/images/logo.svg';
import GoogleIcon from '../../../assets/images/googleIcon.svg';
import { useRef } from 'react';
import { fetchLoginResult } from '../../../apis';
import { setIsLogin } from '../../../store/user';
import { setModalVisible } from '../../../store/auth';

interface LoginProps {
  setRegister: () => void;
}

const BackgroundIMG = styled.img`
  position: absolute;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  height: calc(100% - 80px);
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
  margin-top: 20px;
  font-size: var(--font-size-base);
  font-weight: bold;
  color: #909090;
  cursor: pointer;
`;

const SocialLoginSection = styled.div`
  margin-top: 40px;
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

const MarginBlock = styled.div`
  margin-top: 10px;
`;

function Login({ setRegister }: LoginProps) {
  const dispatch = useDispatch();

  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const onClickLoginButton = async () => {
    const email = inputEmailRef.current?.value as string;
    const password = inputPasswordRef.current?.value as string;
    if (email === '' || password === '') {
      alert('올바른 정보를 입력해주세요');
      return;
    }

    const response = (await fetchLoginResult(email, password)) as { result: string; userName: string };

    if (response.result) {
      dispatch(setIsLogin({ isLogin: true, userName: response.userName }));
      dispatch(setModalVisible(false));
    } else {
      alert('이메일과 비밀번호를 확인해주세요');
    }
  };

  return (
    <>
      <BackgroundIMG src={BackgroundSVG} />
      <ContentWrapper>
        <Logo src={LogoImg} />
        <DescriptionWrapper>
          <span>프로젝트, 대회, 스터디 팀원 구인은</span>
          <span>간편하게 구해줘 팀원에서!</span>
        </DescriptionWrapper>
        <LoginInputBar ref={inputEmailRef} spellCheck={false} placeholder="이메일" />
        <LoginInputBar ref={inputPasswordRef} type="password" placeholder="비밀번호" />
        <MarginBlock />
        <DefaultBtn onClick={onClickLoginButton} btnName={'로그인'} width={400} height={50} color="blue" />
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
