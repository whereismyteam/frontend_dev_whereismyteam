import styled from 'styled-components';

import LogoImg from '../../assets/images/logo.svg';
import Pencil from '../../assets/images/pencil.svg';
import Notification from '../../assets/images/notification.svg';
import Profile from '../../assets/images/profile.svg';
import { useState } from 'react';

// const colorSet = {
//   Default: '#F8F8F8',
//   Blue: '#2353BB'
// }

const NavBox = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 5%;
  width: 90%;
  height: 100px;
  background: #fff;
`;

const NavLogoImg = styled.img`
  max-width: 100px;
  height: 50px;
  cursor: pointer;
`;

const AuthBtn = styled.div`
  cursor: pointer;
`;
const AuthBtnSpan = styled.span`
  font-weight: bold;
  font-size: var(--font-size-mid);
`;

const NavIconBox = styled.div`
  display: flex;
`;

const NavIcon = styled.div`
  position: relative;
  width: 53px;
  height: 53px;
  margin-left: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-yellow);
  border-radius: 50%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const NavIconImg = styled.img`
  /* #F8F8F8 */
  filter: invert(99%) sepia(5%) saturate(2%) hue-rotate(208deg) brightness(120%) contrast(95%);

  :hover {
    /* #2353BB */
    filter: invert(24%) sepia(60%) saturate(2542%) hue-rotate(205deg) brightness(98%) contrast(82%);
  }
`;

const NavIconAlertDot = styled.div`
  position: absolute;
  top: -2px;
  right: 0;
  z-index: 99;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #2353bb;
`;

function Navigation() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAlert, setIsAlert] = useState(true);

  return (
    <NavBox>
      <NavLogoImg src={LogoImg} />
      {isLogin ? (
        <NavIconBox>
          <NavIcon>
            <NavIconImg src={Pencil} />
          </NavIcon>
          <NavIcon>
            <NavIconImg src={Notification} />
            {isAlert && <NavIconAlertDot />}
          </NavIcon>
          <NavIcon>
            <NavIconImg src={Profile} />
          </NavIcon>
        </NavIconBox>
      ) : (
        <AuthBtn>
          <AuthBtnSpan>로그인/회원가입</AuthBtnSpan>
        </AuthBtn>
      )}
    </NavBox>
  );
}

export default Navigation;
