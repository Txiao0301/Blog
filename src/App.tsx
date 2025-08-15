import React from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom'
import Home from './page/home';
import Header from './config/header'
import Footer from './config/footer'
import Blog from './page/blog'
import BlogDetial from './page/blog/blogDetails'
import AppPage from './page/app';
import TicTacToeGame from './uilts/game/ticTacToeGame';
import OthelloGame from './uilts/game/othelloGame';

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
                    <Route path='/about' element={<div>关于</div>} />
                    <Route path='*' element={<div>404 Not Found</div>} />
                    <Route path='/ticTacToeGame' element={<TicTacToeGame/>} />
                    <Route path='/othelloGame' element={<OthelloGame/>} />
                </Routes>
            </Content>
            <Footer />
        </Layout>
    );
};

export default App;
