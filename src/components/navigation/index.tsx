import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setModalVisible } from '../../store/auth';
// import { setScrolled } from '../../store/navigation';
import { rootState } from '../../store';
import Auth from '../../pages/auth';
import SearchTitleBox from '../common/searchTitleBox';
import LogoImg from '../../assets/images/logo.svg';
import LogoWhiteImg from '../../assets/images/logoWhite.svg';
import Pencil from '../../assets/images/pencil.svg';
import Notification from '../../assets/images/notification.svg';
import Profile from '../../assets/images/profile.svg';
import { useNavigate } from 'react-router-dom';

// const colorSet = {
//   Default: '#F8F8F8',
//   Blue: '#2353BB'
// }

const NavBox = styled.nav<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 10;
  padding: 0 5%;
  width: 90%;
  height: 100px;
  background: ${(props) => (props.isScrolled ? '#2353BB' : '#fff')};

  transition: all 0.5s ease-in-out;
`;

const NavLogoImg = styled.img`
  max-width: 100px;
  height: 50px;
  cursor: pointer;
`;

const AuthBtn = styled.div`
  cursor: pointer;
`;
const AuthBtnSpan = styled.span<{ isScrolled: boolean }>`
  font-weight: bold;
  font-size: var(--font-size-mid);
  color: ${(props) => (props.isScrolled ? '#fff' : '#000')};
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
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: rootState) => state.user);
  const [isAlert, setIsAlert] = useState(true);

  const modalVisible = useSelector((state: rootState) => state.auth.modalVisible);
  const dispatch = useDispatch();
  const setModalOpen = () => dispatch(setModalVisible(true));
  const setModalClose = () => dispatch(setModalVisible(false));

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    document.body.children[1].children[1].children[0].addEventListener('scroll', handleScroll);
  }, []);
  const handleScroll = () => {
    const scrollTop = document.body.children[1].children[1].children[0].scrollTop;
    if (scrollTop > 477) {
      // 나중에 적절한 높이에서 변경하도록 값 수정
      setIsScrolled(true);
      // dispatch(setIsScrolled);
    } else {
      setIsScrolled(false);
      // dispatch(setIsScrolled);
    }
  };

  const onClickLogo = () => {
    navigate('/');
  };
  return (
    <>
      <Auth setModalClose={setModalClose} visible={modalVisible} />
      <NavBox isScrolled={isScrolled}>
        <NavLogoImg src={isScrolled ? LogoWhiteImg : LogoImg} onClick={onClickLogo} />
        {isScrolled ? <SearchTitleBox location={'nav'} /> : <></>}
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
          <AuthBtn onClick={setModalOpen}>
            <AuthBtnSpan isScrolled={isScrolled}>로그인/회원가입</AuthBtnSpan>
          </AuthBtn>
        )}
      </NavBox>
    </>
  );
}

export default Navigation;
