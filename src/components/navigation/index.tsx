import styled from 'styled-components';

import LogoImg from '../../assets/images/logo.svg';
import Pencil from '../../assets/images/pencil.svg';
import Notification from '../../assets/images/notification.svg';
import Profile from '../../assets/images/profile.svg';

// const colorSet = {
//   Default: '#F8F8F8',
//   Blue: '#2353BB'
// }

const NavBox = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background: #fff;
`;

const NavLogoImg = styled.img`
  margin: 22px 0 0 77px;
  max-width: 100px;
  height: 50px;
  cursor: pointer;
`;

const AuthBtn = styled.div`
  margin: 45px 108px 0 0;
  cursor: pointer;
`;
const AuthBtnSpan = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
`;

const NavIconBox = styled.div`
  display: flex;
  margin: 26px 84px 0 0;
`;

const NavIcon = styled.div`
  position: relative;
  width: 53px;
  height: 53px;
  margin-left: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8d274;
  border-radius: 50%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const NavIconImg = styled.img`
  /* #F8F8F8 */
  filter: invert(99%) sepia(5%) saturate(2%) hue-rotate(208deg) brightness(120%) contrast(95%);
  /* #2353BB */
  /* filter: invert(24%) sepia(60%) saturate(2542%) hue-rotate(205deg) brightness(98%) contrast(82%); */
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
  return (
    <NavBox>
      <NavLogoImg src={LogoImg} />
      {true ? ( // isLogined
        <NavIconBox>
          <NavIcon>
            <NavIconImg src={Pencil} />
          </NavIcon>
          <NavIcon>
            <NavIconImg src={Notification} />
            <NavIconAlertDot />
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
