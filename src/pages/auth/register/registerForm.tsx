import { useState, useRef } from 'react';

import styled from 'styled-components';

import scrollBar from '../../../assets/styles/scrollBar';
import RegisterInput from './input';
import AgreementBox from './agreement';
import DefaultBtn from '../../../components/button/defaultBtn';
import { fetchEmailConfirm, fetchRegister } from '../../../apis';

const ContentWrapper = styled.div`
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentTitle = styled.span`
  font-size: var(--font-size-large);
  font-weight: bold;
`;

const RegisterFormWrapper = styled.div`
  width: 540px;
  padding-right: 4px;
  position: relative;
  height: 500px;
  ${scrollBar}
  overflow-y: scroll;
`;

const RegisterDetailTitle = styled.div`
  margin-top: 37px;
  color: var(--color-blue);
  font-size: var(--font-size-mid);
  font-weight: 700;
`;

const RegisterInputWrapper = styled.div`
  display: flex;
`;

const PasswordGuide = styled.div`
  margin-top: 9px;
  font-size: var(--font-size-small);
  color: var(--color-dark-grey);
`;

const AgreementWrapper = styled.div`
  margin-top: 57px;
`;

const AlertText = styled.div<{ ok: boolean }>`
  font-size: var(--font-size-base);
  color: ${(props) => (props.ok ? 'black' : 'red')};
`;

function RegisterForm({ setNextStep }: { setNextStep: () => void }) {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputNickNameRef = useRef<HTMLInputElement>(null);
  const inputPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const [emailConfirm, setEmailConfirm] = useState({ ok: false, msg: '' });

  const onClickEmailConfirm = async () => {
    const email = inputEmailRef.current?.value as string;
    const response = await fetchEmailConfirm(email);
    setEmailConfirm(() => response);
  };

  const onClickRegister = async () => {
    const email = inputEmailRef.current?.value as string;
    const password = inputPasswordRef.current?.value as string;
    const passwordConfirm = inputPasswordConfirmRef.current?.value as string;
    const nickName = inputNickNameRef.current?.value as string;
    if (!emailConfirm.ok || password === '' || passwordConfirm === '' || nickName === '') {
      alert('정보를 모두 입력해주세요');
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요');
      return;
    }
    // fetchRegister
    type registerDataProps = {
      email: string;
      password: string;
      nickName: string;
    };
    type resDataProps = {
      success: boolean;
      code: number;
      msg: string;
      data: object;
    };
    const registerData: registerDataProps = {
      email,
      password,
      nickName,
    };
    const response = (await fetchRegister(registerData)) as resDataProps;

    if (response.success) {
      setNextStep();
    } else {
      alert('정보를 모두 입력해주세요');
    }
  };
  return (
    <ContentWrapper>
      <ContentTitle>회원가입</ContentTitle>
      <RegisterFormWrapper>
        <RegisterDetailTitle>아이디(이메일)</RegisterDetailTitle>
        <RegisterInputWrapper>
          <RegisterInput ref={inputEmailRef} placeholder="이메일 주소" />
          <DefaultBtn onClick={onClickEmailConfirm} btnName={'중복 확인'} width={140} height={45} color={'invBlue'} />
        </RegisterInputWrapper>
        {emailConfirm.msg !== '' && <AlertText ok={emailConfirm.ok}>{emailConfirm.msg}</AlertText>}
        <RegisterDetailTitle>비밀번호</RegisterDetailTitle>
        <RegisterInput ref={inputPasswordRef} placeholder="비밀번호" />
        <PasswordGuide>* 영문/숫자/특수문자 조합으로 8~15자로 입력해주세요.</PasswordGuide>
        <RegisterDetailTitle>비밀번호 확인</RegisterDetailTitle>
        <RegisterInput ref={inputPasswordConfirmRef} placeholder="비밀번호 재입력" />
        <RegisterDetailTitle>이름</RegisterDetailTitle> {/* 닉네임으로 변경? */}
        <RegisterInput ref={inputNickNameRef} placeholder="닉네임을 입력하세요" />
        <AgreementWrapper>
          <RegisterDetailTitle>모두 동의합니다.</RegisterDetailTitle> {/* 닉네임으로 변경? */}
          <AgreementBox agreementTitle={'이용약관 동의'} />
          <AgreementBox agreementTitle={'개인정보 취급방침 동의'} />
        </AgreementWrapper>
        <br />
      </RegisterFormWrapper>
      <DefaultBtn onClick={onClickRegister} btnName={'회원가입'} width={550} height={50} color={'blue'} />
    </ContentWrapper>
  );
}

export default RegisterForm;
