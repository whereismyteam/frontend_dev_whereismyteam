import { useState } from 'react';

import Modal from '../../components/common/modal';
import Login from './login';
import Register from './register';

interface AuthProps {
  setModalClose: () => void;
  visible: boolean;
}

function Auth({ setModalClose, visible }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);

  const setRegister = () => setIsLogin((current) => !current);

  return <Modal children={isLogin ? <Login setRegister={setRegister} /> : <Register />} visible={visible} onClickClose={setModalClose}></Modal>;
}

export default Auth;
