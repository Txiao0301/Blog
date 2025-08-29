import { theme } from 'antd';
import HomePage from './homePage';


function Home() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div style={{ padding: 24, margin: 24, background: colorBgContainer }}>
            <HomePage />
        </div>
    );
};

export default Home;