import styled from 'styled-components';

const DefaultButton = styled.button<{ width: number; height: number; marginTop?: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-top: ${(props) => props.marginTop}px;
  font-size: var(--font-size-base);
  font-weight: bold;
  color: #fff;
  background-color: var(--color-blue);
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

export default DefaultButton;
