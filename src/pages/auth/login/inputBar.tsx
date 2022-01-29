import styled from 'styled-components';

const LoginInputBar = styled.input`
  width: 336px;
  height: 40px;
  padding: 5px 32px;

  font-size: var(--font-size-base);

  color: var(--color-blue);
  font-weight: bold;
  ::placeholder {
    color: var(--color-blue);
    font-weight: bold;
  }
  border: 2px solid var(--color-yellow);
  border-radius: 30px;

  :focus {
    outline: none;
  }
`;

export default LoginInputBar;
