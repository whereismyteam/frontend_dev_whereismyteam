import { useState, useRef } from 'react';

import styled from 'styled-components';

import scrollBar from '../../../assets/styles/scrollBar';
import RegisterInput from './input';
import AgreementBox from './agreement';
import DefaultBtn from '../../../components/button/defaultBtn';
import { fetchEmailConfirm, fetchNickNameConfirm, fetchRegister } from '../../../apis';
import { setUserId } from '../../../store/auth';
import { useDispatch } from 'react-redux';

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
  margin-top: 40px;
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
  const dispatch = useDispatch();

  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const inputNickNameRef = useRef<HTMLInputElement>(null);
  const inputPasswordConfirmRef = useRef<HTMLInputElement>(null);
  const agreementAllRef = useRef<HTMLInputElement>(null);
  const agreementOneRef = useRef<HTMLInputElement>(null);
  const agreementTwoRef = useRef<HTMLInputElement>(null);

  const [emailConfirm, setEmailConfirm] = useState({ ok: false, msg: '' });
  const [passConfirm, setPassConfirm] = useState({ ok: false, msg: '' });
  const [nickNameConfirm, setNickNameConfirm] = useState({ ok: false, msg: '' });
  const [regConfirm, setRegConfirm] = useState('');

  const onClickEmailConfirm = async () => {
    const email = inputEmailRef.current?.value as string;
    const response = await fetchEmailConfirm(email);
    setEmailConfirm(() => response);
  };

  const onClickNicknameConfirm = async () => {
    const nickName = inputNickNameRef.current?.value as string;
    const response = await fetchNickNameConfirm(nickName);
    setNickNameConfirm(() => response);
  };

  const onChangePassword = () => {
    const password = inputPasswordRef.current?.value as string;
    const regex = new RegExp('(?=.*[!@#$%^&*])(?=.*[0-9])((?=.*[a-z])|(?=.*[A-Z]))');
    const { length } = password;

    setRegConfirm(() => (length >= 8 && length <= 15 && regex.test(password) ? '' : '????????? ?????? ??????????????????.'));

    const passwordConfirm = inputPasswordConfirmRef.current?.value as string;
    if (passwordConfirm !== '') onChangePasswordConfirm();
  };

  const onChangePasswordConfirm = () => {
    const password = inputPasswordRef.current?.value as string;
    const passwordConfirm = inputPasswordConfirmRef.current?.value as string;

    if (password !== passwordConfirm) setPassConfirm(() => ({ ok: false, msg: '??????????????? ???????????? ????????????.' }));
    else setPassConfirm(() => ({ ok: true, msg: '??????????????? ???????????????.' }));
  };

  const onClickRegister = async () => {
    const email = inputEmailRef.current?.value as string;
    const password = inputPasswordRef.current?.value as string;
    const nickName = inputNickNameRef.current?.value as string;
    const agreementOne = agreementOneRef.current?.checked;
    const agreementTwo = agreementTwoRef.current?.checked;

    if (!emailConfirm.ok || regConfirm !== '' || !passConfirm.ok || nickName === '') {
      alert('?????? ????????? ??????????????????');
      return;
    }

    if (!agreementOne || !agreementTwo) {
      alert('????????? ?????? ??????????????????');
      return;
    }

    const registerData = {
      email,
      password,
      nickName,
    };
    const response = await fetchRegister(registerData);

    if (response.ok) {
      dispatch(setUserId(email));
      setNextStep();
    } else {
      alert(response.msg);
    }
  };

  const onClickAllAgreement = () => {
    if (!agreementAllRef.current?.checked) {
      agreementOneRef.current!.checked = true;
      agreementTwoRef.current!.checked = true;
    } else {
      agreementOneRef.current!.checked = false;
      agreementTwoRef.current!.checked = false;
    }
  };

  return (
    <ContentWrapper>
      <ContentTitle>????????????</ContentTitle>
      <RegisterFormWrapper>
        <RegisterDetailTitle>?????????(?????????)</RegisterDetailTitle>
        <RegisterInputWrapper>
          <RegisterInput ref={inputEmailRef} placeholder="????????? ??????" />
          <DefaultBtn onClick={onClickEmailConfirm} btnName={'?????? ??????'} width={140} height={45} color={'invBlue'} />
        </RegisterInputWrapper>
        {emailConfirm.msg !== '' && <AlertText ok={emailConfirm.ok}>{emailConfirm.msg}</AlertText>}
        <RegisterDetailTitle>????????????</RegisterDetailTitle>
        <RegisterInput onChange={onChangePassword} ref={inputPasswordRef} placeholder="????????????" type="password" />
        <PasswordGuide>* ??????/??????/???????????? ???????????? 8~15?????? ??????????????????.</PasswordGuide>
        {regConfirm !== '' && <AlertText ok={false}>{regConfirm}</AlertText>}
        <RegisterDetailTitle>???????????? ??????</RegisterDetailTitle>
        <RegisterInput onChange={onChangePasswordConfirm} ref={inputPasswordConfirmRef} placeholder="???????????? ?????????" type="password" />
        {passConfirm.msg !== '' && <AlertText ok={passConfirm.ok}>{passConfirm.msg}</AlertText>}
        <RegisterDetailTitle>?????????</RegisterDetailTitle>
        <RegisterInputWrapper>
          <RegisterInput ref={inputNickNameRef} placeholder="???????????? ???????????????" />
          <DefaultBtn onClick={onClickNicknameConfirm} btnName={'?????? ??????'} width={140} height={45} color={'invBlue'} />
        </RegisterInputWrapper>
        {nickNameConfirm.msg !== '' && <AlertText ok={nickNameConfirm.ok}>{nickNameConfirm.msg}</AlertText>}
        <br />
        <br />
        <AgreementWrapper>
          <AgreementBox inputRef={agreementAllRef} inputId="all" agreementTitle={'?????? ???????????????'} onClickAll={onClickAllAgreement} />
          <br />
          <AgreementBox inputRef={agreementOneRef} inputId="agreement1" agreementTitle={'???????????? ??????'} />
          <AgreementBox inputRef={agreementTwoRef} inputId="agreement2" agreementTitle={'???????????? ???????????? ??????'} />
        </AgreementWrapper>
        <br />
        <br />
      </RegisterFormWrapper>
      <DefaultBtn onClick={onClickRegister} btnName={'????????????'} width={550} height={50} color={'blue'} />
    </ContentWrapper>
  );
}

export default RegisterForm;
