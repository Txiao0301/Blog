import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import '../../mock/login.js';
import { jumpTo } from '../../config/jump';
import { showToast } from '../../config/popup/popupService';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: true
    });

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('登录数据:', formData);
        axios.post('/login', {
            data: formData

        }).then(res => {
            console.log('登录响应:', res.data);
            if (res.data.success) {
                showToast({
                    message: '登录成功', duration: 1500,
                    onClose: () => {
                        jumpTo('home');
                    }
                });
            } else {
                console.info('登录失败: ' + res.data.message);
                showToast({ message: res.data.message, duration: 1500 });
            }
        })
    };

    return (
        <div className="login-container">
            <section className="form-section">
                <div className="form-container">
                    <h2 className="form-title">欢迎回到个人知识库</h2>
                    <p className="form-subtitle">输入账号密码，开启高效学习</p>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                name="username"
                                placeholder="手机号/邮箱"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                name="password"
                                placeholder="请输入密码"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-options">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                />
                                <span className="checkmark"></span>
                                记住账号
                            </label>
                            <a href="#" className="forgot-password">忘记密码?</a>
                        </div>

                        <button type="submit" className="btn-gradient">立即登录</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
