import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';

import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Main from '../pages/main';
import Post from '../pages/post';
import Social from '../pages/auth/login/social';

import { setIsLogin } from '../store/user';
import { fetchUserInfo } from '../apis';

const Layout = styled.div`
  margin-top: 100px;
  margin-bottom: 40px;

  height: calc(100vh - 140px);
  overflow-y: scroll;
`;

function IndexRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = new Cookies();
    const userIdx = cookies.get('userIdx');
    const getUserInfo = async (): Promise<void> => {
      const response = await fetchUserInfo();
      if (response.ok) {
        dispatch(setIsLogin({ isLogin: true, userIdx: response.userIdx, nickName: response.nickName, email: response.email }));
        return;
      } else {
        console.log(response);
        alert(response.msg);
        return;
      }
    };
    if (userIdx) {
      void getUserInfo();
    }
  }, []);
  return (
    <BrowserRouter>
      <Navigation />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/social/google" element={<Social />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default IndexRouter;
