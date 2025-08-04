import { theme } from 'antd';
import Game from '../../config/game';   


function AppPage() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div style={{ padding: 24, margin: 24, background: colorBgContainer }}>
            <Game />
        </div>
    );
};

export default AppPage;