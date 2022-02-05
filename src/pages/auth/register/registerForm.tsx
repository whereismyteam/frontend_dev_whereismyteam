import styled from 'styled-components';

import RegisterInput from './input';
import AgreementBox from './agreement';
import DefaultBtn from '../../../components/button/defaultBtn';

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

const PasswordGuide = styled.div`
  margin-top: 9px;
  font-size: var(--font-size-small);
  color: var(--color-dark-grey);
`;

const AgreementWrapper = styled.div`
  margin-top: 57px;
`;

function RegisterForm() {
  return (
    <ContentWrapper>
      <ContentTitle>회원가입</ContentTitle>
      <RegisterFormWrapper>
        <RegisterDetailTitle>아이디(이메일)</RegisterDetailTitle>
        <RegisterInputWrapper>
          <RegisterInput placeholder="이메일 주소" />
          <DefaultBtn btnName={'중복 확인'} width={140} height={45} color={'invBlue'} />
        </RegisterInputWrapper>
        <RegisterDetailTitle>비밀번호</RegisterDetailTitle>
        <RegisterInput placeholder="비밀번호" />
        <PasswordGuide>* 영문/숫자/특수문자 조합으로 8~15자로 입력해주세요.</PasswordGuide>
        <RegisterDetailTitle>비밀번호 확인</RegisterDetailTitle>
        <RegisterInput placeholder="비밀번호 재입력" />
        <RegisterDetailTitle>이름</RegisterDetailTitle> {/* 닉네임으로 변경? */}
        <RegisterInput placeholder="닉네임을 입력하세요" />
        <AgreementWrapper>
          <RegisterDetailTitle>모두 동의합니다.</RegisterDetailTitle> {/* 닉네임으로 변경? */}
          <AgreementBox agreementTitle={'이용약관 동의'} />
          <AgreementBox agreementTitle={'개인정보 취급방침 동의'} />
        </AgreementWrapper>
        <br />
      </RegisterFormWrapper>
      <DefaultBtn btnName={'회원가입'} width={550} height={50} color={'blue'} />
    </ContentWrapper>
  );
}

export default RegisterForm;
