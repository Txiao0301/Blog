import { useLocation } from 'react-router-dom';
import { jumpTo } from '../jump';
import { FaGraduationCap } from 'react-icons/fa';
import './header.css';

function MyHeader() {

    const location = useLocation();
    let current = location.pathname.substring(1)
    if (current === '') {
        current = 'home'
    }

    function gotoPage(ele: any) {
        jumpTo(ele.key);
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <FaGraduationCap className="logo-icon" />
                        个人<span>知识库</span>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <a onClick={e => {
                                    e.preventDefault();
                                    gotoPage({ key: 'home' });
                                }}
                                    className={current === 'home' ? 'active' : ''}>
                                    首页
                                </a>
                            </li>
                            <li>
                                <a onClick={e => {
                                    e.preventDefault();
                                    gotoPage({ key: 'analysis' });
                                }}
                                    className={current === 'analysis' ? 'active' : ''}>
                                    统计分析
                                </a>
                            </li>
                            <li>
                                <a onClick={e => {
                                    e.preventDefault();
                                    gotoPage({ key: 'plan' });
                                }}
                                    className={current === 'plan' ? 'active' : ''}>
                                    学习计划
                                </a>
                            </li>
                            <li>
                                <a onClick={e => {
                                    e.preventDefault();
                                    gotoPage({ key: 'wrong' });
                                }}
                                    className={current === 'wrong' ? 'active' : ''}>
                                    错题本
                                </a>
                            </li>
                            <li>
                                <a onClick={e => {
                                    e.preventDefault();
                                    gotoPage({ key: 'material' });
                                }}
                                    className={current === 'material' ? 'active' : ''}>
                                    备考资料
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="auth-buttons">
                        <button className="btn btn-login" onClick={e => {
                            gotoPage({ key: 'login' });
                        }}> 登录</button>
                        <button className="btn btn-register">注册</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MyHeader;