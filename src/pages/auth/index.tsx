import { useState } from 'react';
import Modal from '../../components/Modal';

interface AuthProps {
  setModalClose: () => void;
  visible: boolean;
}

function Auth({ setModalClose, visible }: AuthProps) {
  return <Modal visible={visible} onClickClose={setModalClose}></Modal>;
}

export default Auth;
