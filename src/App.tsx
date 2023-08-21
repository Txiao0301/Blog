import React from 'react';
import { Layout, theme } from 'antd';
import { Link, Route, Routes } from 'react-router-dom'
import Home from './page/home';
import Header from './config/header'
import Footer from './config/footer'
import Blog from './page/blog'

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '10vh' }}>
      <Header />
      <Content>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/blog' element={<Blog />} />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
};

export default App;