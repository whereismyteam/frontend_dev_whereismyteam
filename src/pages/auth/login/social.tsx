import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../../assets/styles/loadingSpinner';

function Social() {
  const navigate = useNavigate();
  useEffect(() => {
    const current = decodeURI(window.location.href).split('?')[1];
    const params = new URLSearchParams(current);
    const keywords = params.get('code');
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    alert(`AuthCode: ${keywords}`);
    navigate('/');
    window.location.reload();
  }, []);
  return <LoadingSpinner />;
}

export default Social;
