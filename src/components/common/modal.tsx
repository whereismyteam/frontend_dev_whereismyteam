import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { fadeIn, fadeOut } from '../../assets/styles/keyframes';

type ModalProps = {
  children?: JSX.Element;
  visible: boolean;
  onClickClose: () => void;
};

const modalSettings = (visible: boolean) => css`
  visibility: ${visible ? 'visible' : 'hidden'};
  z-index: 999;
  animation: ${visible ? fadeIn : fadeOut} 0.3s ease-out;
  transition: visibility 0.3s ease-out;
`;

const Background = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(41, 41, 41, 0.5);
  ${(props) => modalSettings(props.visible)}
`;

const ModalSection = styled.div<{ visible: boolean }>`
  position: fixed;
  width: 700px;
  height: 650px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  background-color: #fff;
  ${(props) => modalSettings(props.visible)}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  margin: 30px 30px 0px 0px;
  border: none;
  background: none;
  cursor: pointer;

  font-size: var(--font-size-mid);
  color: #888;
`;

function Modal({ children, visible, onClickClose }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (visible) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 200);
    }

    return () => {
      timeoutId ?? clearTimeout(timeoutId);
    };
  }, [visible]);

  if (!isOpen) return <></>;

  return (
    <>
      <Background visible={visible} onClick={onClickClose} />
      <ModalSection visible={visible}>
        <CloseButton type="button" onClick={onClickClose}>
          X
        </CloseButton>
        {children}
      </ModalSection>
    </>
  );
}

export default Modal;
