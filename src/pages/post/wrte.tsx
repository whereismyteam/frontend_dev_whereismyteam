import { useDispatch } from 'react-redux';

import { clearState } from '../../store/auth';

import Modal from '../../components/common/modal';
import { useEffect } from 'react';

interface WriteProps {
  setModalClose: () => void;
  visible: boolean;
}

function Write({ setModalClose, visible }: WriteProps) {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      setTimeout(() => dispatch(clearState()), 200);
    },
    [visible],
  );

  return <Modal children={<div>팀원 구하자</div>} visible={visible} onClickClose={setModalClose}></Modal>;
}

export default Write;
