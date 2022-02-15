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
  margin-top: 20px;
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

const AgreementWrapper = styled.div``;

const AlertText = styled.div<{ ok: boolean }>`
  margin-top: 6px;
  font-size: var(--font-size-base);
  color: ${(props) => (props.ok ? 'black' : 'red')};
`;

function RegisterForm({ setNextStep }: { setNextStep: () => void }) {
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputNickNameRef = useRef<HTMLInputElement>(null);
  const inputPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const [emailConfirm, setEmailConfirm] = useState({ ok: false, msg: '' });
  const [passConfirm, setPassConfirm] = useState({ ok: false, msg: '' });
  const [regConfirm, setRegConfirm] = useState('');

  const onClickEmailConfirm = async () => {
    const email = inputEmailRef.current?.value as string;
    const response = await fetchEmailConfirm(email);
    setEmailConfirm(() => response);
  };

  const onChangePassword = () => {
    const password = inputPasswordRef.current?.value as string;
    const regex = new RegExp('(?=.*[!@#$%^&*])(?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z]))');
    const { length } = password;

    setRegConfirm(() => (length >= 8 && length <= 15 && regex.test(password) ? '' : '형식에 맞게 입력해주세요.'));
  };

  const onChangePasswordConfirm = () => {
    const password = inputPasswordRef.current?.value as string;
    const passwordConfirm = inputPasswordConfirmRef.current?.value as string;

    if (password !== passwordConfirm) setPassConfirm(() => ({ ok: false, msg: '비밀번호가 일치하지 않습니다.' }));
    else setPassConfirm(() => ({ ok: true, msg: '비밀번호가 일치합니다.' }));
  };

  const onClickRegister = async () => {
    const email = inputEmailRef.current?.value as string;
    const password = inputPasswordRef.current?.value as string;
    const nickName = inputNickNameRef.current?.value as string;
    if (!emailConfirm.ok || regConfirm !== '' || !passConfirm.ok || nickName === '') {
      alert('입력 정보를 확인해주세요');
      return;
    }

    const registerData = {
      email,
      password,
      nickName,
    };
    const response = await fetchRegister(registerData);

    if (response.ok) {
      setNextStep();
    } else {
      alert(response.msg);
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
        <RegisterInput onChange={onChangePassword} ref={inputPasswordRef} placeholder="비밀번호" type="password" />
        <PasswordGuide>* 영문/숫자/특수문자 조합으로 8~15자로 입력해주세요.</PasswordGuide>
        {regConfirm !== '' && <AlertText ok={false}>{regConfirm}</AlertText>}
        <RegisterDetailTitle>비밀번호 확인</RegisterDetailTitle>
        <RegisterInput onChange={onChangePasswordConfirm} ref={inputPasswordConfirmRef} placeholder="비밀번호 재입력" type="password" />
        {passConfirm.msg !== '' && <AlertText ok={passConfirm.ok}>{passConfirm.msg}</AlertText>}
        <RegisterDetailTitle>이름</RegisterDetailTitle> {/* 닉네임으로 변경? */}
        <RegisterInput ref={inputNickNameRef} placeholder="닉네임을 입력하세요" />
        <AgreementWrapper>
          <RegisterDetailTitle>모두 동의합니다.</RegisterDetailTitle> {/* 닉네임으로 변경? */}
          <AgreementBox agreementTitle={'이용약관 동의'} />
          <AgreementBox agreementTitle={'개인정보 취급방침 동의'} />
        </AgreementWrapper>
        <br />
        <br />
      </RegisterFormWrapper>
      <DefaultBtn onClick={onClickRegister} btnName={'회원가입'} width={550} height={50} color={'blue'} />
    </ContentWrapper>
  );
}

export default RegisterForm;
