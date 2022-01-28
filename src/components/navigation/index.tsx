import styled from 'styled-components';

import LogoImg from '../../assets/images/logo.svg';
import Pencil from '../../assets/images/pencil.svg';
import Notification from '../../assets/images/notification.svg';
import Profile from '../../assets/images/profile.svg';

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
  margin: 25px 0px 25px 50px;
  max-width: 100px;
  height: 50px;
`;

const NavIconBox = styled.div`
  display: flex;
  margin: 26px 84px 0 0;
`;

const NavIcon = styled.div`
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
  fill: #000;
`;

function Navigation() {
  return (
    <NavBox>
      <NavLogoImg src={LogoImg} />
      <NavIconBox>
        <NavIcon>
          <NavIconImg src={Pencil} />
        </NavIcon>
        <NavIcon>
          <NavIconImg src={Notification} />
        </NavIcon>
        <NavIcon>
          <NavIconImg src={Profile} />
        </NavIcon>
      </NavIconBox>
    </NavBox>
  );
}

export default Navigation;
