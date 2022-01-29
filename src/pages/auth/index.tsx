import Modal from '../../components/common/modal';
// import Login from './login';
import Register from './register';

interface AuthProps {
  setModalClose: () => void;
  visible: boolean;
}

function Auth({ setModalClose, visible }: AuthProps) {
  return <Modal children={<Register />} visible={visible} onClickClose={setModalClose}></Modal>;
}

export default Auth;
