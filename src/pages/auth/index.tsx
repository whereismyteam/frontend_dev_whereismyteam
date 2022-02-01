import { useState } from 'react';

import Modal from '../../components/common/modal';
<<<<<<< Updated upstream
=======
import Login from './login';
>>>>>>> Stashed changes
import Register from './register';

interface AuthProps {
  setModalClose: () => void;
  visible: boolean;
}

function Auth({ setModalClose, visible }: AuthProps) {
<<<<<<< Updated upstream
=======
  const [isLogin, setIsLogin] = useState(true);

  const setRegister = () => setIsLogin((current) => !current);

  return <Modal children={isLogin ? <Login setRegister={setRegister} /> : <Register />} visible={visible} onClickClose={setModalClose}></Modal>;
>>>>>>> Stashed changes
}

export default Auth;
