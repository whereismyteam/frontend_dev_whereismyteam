import { ReactNode } from 'react';
import styled from 'styled-components';

type ModalProps = {
  children?: ReactNode;
};

const Background = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(41, 41, 41, 0.5);
  z-index: 999;
`;

const ModalSection = styled.div`
  width: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 16px;
  z-index: 999;
`;

function Modal({ children }: ModalProps) {
  return (
    <>
      <Background />
      <ModalSection>{children}</ModalSection>
    </>
  );
}

export default Modal;
