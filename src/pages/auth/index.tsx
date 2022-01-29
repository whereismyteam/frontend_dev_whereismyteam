import Modal from '../../components/common/modal';
import Login from './login';

interface AuthProps {
  setModalClose: () => void;
  visible: boolean;
}

function Auth({ setModalClose, visible }: AuthProps) {
  return <Modal children={<Login />} visible={visible} onClickClose={setModalClose}></Modal>;
}

export default Auth;
