import styled from 'styled-components';

type Props = {
  agreementTitle: string;
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: 11px;
  display: flex;
  justify-content: space-between;
`;

const WrapperLeft = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperRight = styled.div`
  cursor: pointer;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  /* border: 2px solid var(--color-yellow);
  border-radius: 50%; */
  /* --체크박스 컴포넌트 따로 작성 필요-- */
`;

const LeftSpan = styled.span`
  margin-left: 11px;
  font-size: var(--font-size-base);
  color: #000;
`;

const RightSpan = styled.span`
  font-size: var(--font-size-base);
  color: var(--color-dark-grey);
`;

function AgreementBox({ agreementTitle }: Props) {
  return (
    <Wrapper>
      <WrapperLeft>
        <CheckBox type="checkbox" />
        <LeftSpan>{agreementTitle}</LeftSpan>
      </WrapperLeft>
      <WrapperRight>
        <RightSpan>보기&emsp;&gt;</RightSpan>
      </WrapperRight>
    </Wrapper>
  );
}

export default AgreementBox;
