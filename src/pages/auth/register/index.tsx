import styled from 'styled-components';

import RegisterInput from './input';
import AgreementBox from './agreement';
import DefaultButton from '../../../components/button/defaultButton';
import DefaultReverseButton from '../../../components/button/defaultReverseButton';

const ContentWrapper = styled.div`
  margin-top: 37px;
  margin-bottom: 33px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentTitle = styled.span`
  font-size: var(--font-size-large);
  font-weight: bold;
`;

const RegisterForm = styled.div`
  width: 540px;
  margin-top: 43px;
  position: relative;
  height: 500px;
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

const VerificationTime = styled.div`
  margin: 0 12px;
  padding-top: 17.5px;
  font-size: var(--font-size-base);
  color: var(--color-dark-grey);
`;

const PasswordInfo = styled.div`
  margin-top: 9px;
  font-size: var(--font-size-small);
  color: var(--color-dark-grey);
`;

const AgreementWrapper = styled.div`
  margin-top: 57px;
`;

function Register() {
  return (
    <ContentWrapper>
      <ContentTitle>회원가입</ContentTitle>
      <RegisterForm>
        <RegisterDetailTitle>아이디(이메일)</RegisterDetailTitle>
        <RegisterInputWrapper>
          <RegisterInput placeholder="이메일 주소" />
          <DefaultReverseButton btnName={'인증번호 전송'} width={140} height={45} />
        </RegisterInputWrapper>
        <RegisterDetailTitle>인증번호</RegisterDetailTitle>
        <RegisterInputWrapper>
          <RegisterInput placeholder="인증번호 입력" />
          <VerificationTime>03:00</VerificationTime>
          <DefaultReverseButton btnName={'입력 완료'} width={140} height={45} />
        </RegisterInputWrapper>
        <RegisterDetailTitle>비밀번호</RegisterDetailTitle>
        <RegisterInput placeholder="비밀번호" />
        <PasswordInfo>* 영문/숫자/특수문자 조합으로 8~15자로 입력해주세요.</PasswordInfo>
        <RegisterDetailTitle>비밀번호 확인</RegisterDetailTitle>
        <RegisterInput placeholder="비밀번호 재입력" />
        <RegisterDetailTitle>이름</RegisterDetailTitle> {/* 닉네임으로 변경? */}
        <RegisterInput placeholder="닉네임을 입력하세요" />
        <AgreementWrapper>
          <RegisterDetailTitle>모두 동의합니다.</RegisterDetailTitle> {/* 닉네임으로 변경? */}
          <AgreementBox agreementTitle={'이용약관 동의'} />
          <AgreementBox agreementTitle={'개인정보 취급방침 동의'} />
        </AgreementWrapper>
      </RegisterForm>
      <DefaultButton width={550} height={50} marginTop={50}>
        회원가입
      </DefaultButton>
    </ContentWrapper>
  );
}

export default Register;
