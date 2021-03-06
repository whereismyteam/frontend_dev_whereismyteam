import { useSelector, useDispatch } from 'react-redux';

import { clearState, setRegister } from '../../store/auth';
import { rootState } from '../../store';

import Modal from '../../components/common/modal';
import Login from './login';
import Register from './register';
import { useEffect } from 'react';

interface AuthProps {
  setModalClose: () => void;
  visible: boolean;
}

function Auth({ setModalClose, visible }: AuthProps) {
  const loginOrRegister = useSelector((state: rootState) => state.auth.loginOrRegister);
  const dispatch = useDispatch();
  const setRegister1 = () => dispatch(setRegister());

  useEffect(
    () => () => {
      setTimeout(() => dispatch(clearState()), 200);
    },
    [visible],
  );

  return <Modal children={loginOrRegister ? <Login setRegister={setRegister1} /> : <Register />} visible={visible} onClickClose={setModalClose}></Modal>;
}

export default Auth;
