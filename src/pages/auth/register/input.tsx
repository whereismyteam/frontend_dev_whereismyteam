import styled from 'styled-components';

const RegisterInput = styled.input`
  margin-top: 15px;
  padding: 0; /* reset.css 적용이 안된것같습니다. */
  height: 25px;
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--color-yellow);
  font-size: var(--font-size-mid);

  ::placeholder {
    color: var(--color-dark-grey);
  }
  :focus {
    outline: none;
  }
`;

export default RegisterInput;
