import { theme } from 'antd';


function Home() {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div style={{ padding: 24, margin: 24, background: colorBgContainer }}>Hello World!</div>
    );
};

export default Home;