import styled from 'styled-components';

const DefaultButton = styled.button<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  font-size: var(--font-size-base);
  font-weight: bold;
  color: #fff;
  background-color: var(--color-blue);
  border: none;
  border-radius: 30px;
`;

export default DefaultButton;
