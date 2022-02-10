import { useSelector, useDispatch } from 'react-redux';
import { nextStep, clearState } from '../../../store/auth';

import { rootState } from '../../../store';

import RegisterForm from './registerForm';
import EmailAuth from './emailAuth';
import Welcome from './welcome';

const REGISTER_FORM = 1;
const EMAIL_AUTH = 2;
const WELCOME = 3;

function Register() {
  const RegisterStep = useSelector((state: rootState) => state.auth.currentStep);
  const dispatch = useDispatch();
  const setNextStep = () => dispatch(nextStep());
  const setClearState = () => dispatch(clearState());

  const renderByRegisterStep = (RegisterStep: number) => {
    switch (RegisterStep) {
      case REGISTER_FORM:
        return <RegisterForm setNextStep={setNextStep} />;
      case EMAIL_AUTH:
        return <EmailAuth setNextStep={setNextStep} />;
      case WELCOME:
        return <Welcome setClearState={setClearState} />;
      default:
        return <div></div>;
    }
  };

  return <>{renderByRegisterStep(RegisterStep)}</>;
}

export default Register;
