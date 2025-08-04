import React from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom'
import Home from './page/home';
import Header from './config/header'
import Footer from './config/footer'
import Blog from './page/blog'
import BlogDetial from './page/blog/blogDetails'
import AppPage from './page/app';

const { Content } = Layout;

const App: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Content>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/blog/:id' element={<BlogDetial />} />
                    <Route path='/app' element={<AppPage />} />
                </Routes>
            </Content>
            <Footer />
        </Layout>
    );
};

export default App;
