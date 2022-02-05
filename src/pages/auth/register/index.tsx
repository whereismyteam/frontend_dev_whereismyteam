import { useState } from 'react';

import RegisterForm from './registerForm';
import Welcome from './welcome';

function Register() {
  const [isRegistered, setIsRegistered] = useState(false);

  return <>{isRegistered ? <RegisterForm /> : <Welcome />}</>;
}

export default Register;
