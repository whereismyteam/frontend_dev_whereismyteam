import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from '../components/navigation';
import Footer from '../components/footer';
import Main from '../pages/main';
import Post from '../pages/post';

function IndexRouter() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="post/:id" element={<Post />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default IndexRouter;
