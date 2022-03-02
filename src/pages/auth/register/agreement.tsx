import styled from 'styled-components';

type Props = {
  agreementTitle: string;
  inputId: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onClickAll?: () => void;
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

const LeftSpan = styled.span`
  margin-left: 11px;
  font-size: var(--font-size-base);
  color: #000;
`;

const RightSpan = styled.span`
  font-size: var(--font-size-base);
  color: var(--color-dark-grey);
`;

const CheckBoxInput = styled.input`
  display: none;

  &:checked + label {
    background-color: var(--color-yellow);
  }
`;

const CheckBoxLabel = styled.label`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-yellow);
  border-radius: 50%;

  &:hover {
    background-color: var(--color-yellow);
    opacity: 0.5;
  }
`;

function CheckBox({ inputId, inputRef, onClickAll }: { inputId: string; inputRef: React.RefObject<HTMLInputElement>; onClickAll?: () => void }) {
  return (
    <>
      <CheckBoxInput ref={inputRef} type="checkbox" id={inputId} />
      <CheckBoxLabel htmlFor={inputId} onClick={onClickAll} />
    </>
  );
}

function AgreementBox({ agreementTitle, inputId, inputRef, onClickAll }: Props) {
  return (
    <Wrapper>
      <WrapperLeft>
        <CheckBox inputId={inputId} inputRef={inputRef} onClickAll={onClickAll} />
        <LeftSpan>{agreementTitle}</LeftSpan>
      </WrapperLeft>
      {inputId !== 'all' && (
        <WrapperRight>
          <RightSpan>보기&emsp;&gt;</RightSpan>
        </WrapperRight>
      )}
    </Wrapper>
  );
}

export default AgreementBox;
