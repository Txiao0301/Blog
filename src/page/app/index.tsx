import { theme } from 'antd';
import { jumpToOnNewTab } from '../../config/jump';
import './index.css';

function AppPage() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div style={{ padding: 24, margin: 24, background: colorBgContainer }}>
            <div className='title' onClick={() => jumpToOnNewTab('ticTacToeGame')}>井字棋游戏</div>
            <div className='title' onClick={() => jumpToOnNewTab('othelloGame')}>翻转棋游戏</div>
        </div>
    );
};

export default AppPage;