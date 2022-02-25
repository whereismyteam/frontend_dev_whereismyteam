import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setModalVisible } from '../../store/auth';
// import { setScrolled } from '../../store/navigation';
import { rootState } from '../../store';
import { fetchLogout } from '../../apis';
import Auth from '../../pages/auth';
import SearchTitleBox from '../common/searchTitleBox';
import DefaultBtn from '../button/defaultBtn';
import scrollBar from '../../assets/styles/scrollBar';

import LogoImg from '../../assets/images/logo.svg';
import LogoWhiteImg from '../../assets/images/logoWhite.svg';
import Pencil from '../../assets/images/pencil.svg';
import Notification from '../../assets/images/notification.svg';
import Profile from '../../assets/images/profile.svg';

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
  position: relative;
  width: 215px;
  justify-content: space-between;
`;

const NavIcon = styled.div`
  position: relative;
  width: 53px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-yellow);
  border-radius: 50%;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const NavIconImg = styled.img<{ isClickedNoti?: boolean; isClickedProfi?: boolean }>`
  /* #F8F8F8 */
  filter: ${(props) =>
    props.isClickedProfi || props.isClickedNoti
      ? 'invert(24%) sepia(60%) saturate(2542%) hue-rotate(205deg) brightness(98%) contrast(82%)'
      : 'invert(99%) sepia(5%) saturate(2%) hue-rotate(208deg) brightness(120%) contrast(95%)'};
  ${NavIcon}:hover & {
    /* #2353BB */
    filter: invert(24%) sepia(60%) saturate(2542%) hue-rotate(205deg) brightness(98%) contrast(82%);
  }
`;

const NavIconAlertDot = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  z-index: 99;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #2353bb;
  border: 2px solid #fff;
`;

// Navigation Modal

const NavModalCSS = `
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadein 0.5s;
  z-index: 999;
`;

const NavModalNoti = styled.div`
  position: absolute;
  width: 314px;
  height: 300px;
  ${NavModalCSS}
  top: 62px;
  left: -179px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavModalNotiInner = styled.div`
  margin-left: 10px;
  width: 270px;
  height: 256px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ${scrollBar}
`;

const NavModalNotiBox = styled.div`
  width: 246px;
  height: 70px;
  margin-bottom: 28px;
`;

const NavModalNotiBoxH3 = styled.h3`
  font-size: var(--font-size-base);
  color: #000;
  line-height: 23px;
`;

const NavModalNotiBoxSpan = styled.span`
  font-size: var(--font-size-small);
  color: var(--color-dark-grey);
`;

const NavModalProfi = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 276px;
  height: 215px;
  ${NavModalCSS}
  top: 62px;
  left: -61px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 26px 0 17px;
`;

const NavModalProfiImgWrapper = styled.div`
  position: relative;
  width: 53px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-yellow);
  border-radius: 50%;
`;

const NavModalProfiImg = styled.img`
  filter: invert(99%) sepia(5%) saturate(2%) hue-rotate(208deg) brightness(120%) contrast(95%);
`;

const NavModalProfiUserName = styled.span`
  font-size: var(--font-size-base);
  color: #000;
`;

const NavModalProfiUserEmail = styled.span`
  font-size: var(--font-size-small);
  color: var(--color-dark-grey);
`;

const NavModalProfiLogoutBtn = styled.span`
  padding: 0 10px;
  font-size: var(--font-size-small);
  color: var(--color-dark-grey);
  cursor: pointer;
`;

function Navigation() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: rootState) => state.user);
  const [isAlert, setIsAlert] = useState(true);
  const [isClickedNoti, setIsClickedNoti] = useState(false);
  const [isClickedProfi, setIsClickedProfi] = useState(false);

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

  const onClickNotiIcon = () => {
    if (isClickedProfi) {
      setIsClickedProfi((prev) => !prev);
    }
    setIsClickedNoti((prev) => !prev);
  };
  const onClickProfiIcon = () => {
    if (isClickedNoti) {
      setIsClickedNoti((prev) => !prev);
    }
    setIsClickedProfi((prev) => !prev);
  };

  const { userIdx } = useSelector((state: rootState) => state.user);
  const logoutData = { userIdx };
  const onClickLogoutBtn = async () => {
    const response = await fetchLogout(logoutData);
    if (response.ok) {
      alert('로그아웃 되었습니다');
    } else {
      alert(response.msg);
    }
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
            <NavIcon onClick={onClickNotiIcon}>
              <NavIconImg src={Notification} isClickedNoti={isClickedNoti} />
              {isAlert && <NavIconAlertDot />}
            </NavIcon>
            <NavIcon onClick={onClickProfiIcon}>
              <NavIconImg src={Profile} isClickedProfi={isClickedProfi} />
            </NavIcon>
            {isClickedNoti ? (
              <NavModalNoti>
                <NavModalNotiInner>
                  <NavModalNotiBox>
                    <NavModalNotiBoxH3>[웹 프로젝트 함께할 열정 넘치...]에 댓글이 (2)개 달렸습니다</NavModalNotiBoxH3>
                    <NavModalNotiBoxSpan>2022.12.25.12:00</NavModalNotiBoxSpan>
                  </NavModalNotiBox>
                  <NavModalNotiBox>
                    <NavModalNotiBoxH3>[웹 프로젝트 함께할 열정 넘치...]에 댓글이 (2)개 달렸습니다</NavModalNotiBoxH3>
                    <NavModalNotiBoxSpan>2022.12.25.12:00</NavModalNotiBoxSpan>
                  </NavModalNotiBox>
                  <NavModalNotiBox>
                    <NavModalNotiBoxH3>[웹 프로젝트 함께할 열정 넘치...]에 댓글이 (2)개 달렸습니다</NavModalNotiBoxH3>
                    <NavModalNotiBoxSpan>2022.12.25.12:00</NavModalNotiBoxSpan>
                  </NavModalNotiBox>
                  <NavModalNotiBox>
                    <NavModalNotiBoxH3>[웹 프로젝트 함께할 열정 넘치...]에 댓글이 (2)개 달렸습니다</NavModalNotiBoxH3>
                    <NavModalNotiBoxSpan>2022.12.25.12:00</NavModalNotiBoxSpan>
                  </NavModalNotiBox>
                  <NavModalNotiBox>
                    <NavModalNotiBoxH3>[웹 프로젝트 함께할 열정 넘치...]에 댓글이 (2)개 달렸습니다</NavModalNotiBoxH3>
                    <NavModalNotiBoxSpan>2022.12.25.12:00</NavModalNotiBoxSpan>
                  </NavModalNotiBox>
                </NavModalNotiInner>
              </NavModalNoti>
            ) : (
              <></>
            )}
            {isClickedProfi ? (
              <NavModalProfi>
                <NavModalProfiImgWrapper>
                  <NavModalProfiImg src={Profile} />
                </NavModalProfiImgWrapper>
                <NavModalProfiUserName>사용자님</NavModalProfiUserName>
                <NavModalProfiUserEmail>whereismyteam@gmail.com</NavModalProfiUserEmail>
                <DefaultBtn btnName={'마이페이지'} width={99} height={24} color={'blue'} />
                <NavModalProfiLogoutBtn onClick={onClickLogoutBtn}>로그아웃</NavModalProfiLogoutBtn>
              </NavModalProfi>
            ) : (
              <></>
            )}
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
