import styled, { keyframes } from 'styled-components';

const spinner = () => keyframes`
    from {transform: rotate(0deg); }
    to {transform: rotate(360deg);}
`;

export default styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 64px;
  height: 64px;
  margin-top: -32px;
  margin-left: -32px;
  border-radius: 50%;
  border: 8px solid transparent;
  border-top-color: var(--color-blue);
  border-bottom-color: var(--color-blue);
  animation: ${spinner()} 0.8s ease infinite;
`;
