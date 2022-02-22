import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Main from '../pages/main';
import Post from '../pages/post';

const Layout = styled.div`
  margin-top: 100px;
  margin-bottom: 40px;

  height: calc(100vh - 140px);
  overflow-y: scroll;
`;

function IndexRouter() {
  return (
    <BrowserRouter>
      <Navigation />
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/post/:postId" element={<Post />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default IndexRouter;
