import { Layout, Avatar, Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import { jumpTo } from '../jump';


const { Header } = Layout;

function MyHeader() {

    const location = useLocation();
    let current = location.pathname.substring(1)
    if (current === '') {
        current = 'home'
    }

    function gotoPage(ele: any) {
        jumpTo(ele.key);
        // const path = ele.key
        // window.location.href = '/#/' + path
    }

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Avatar
                style={{ marginRight: 24 }}
                src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'}
            />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[current]}
                items={[{
                    key: 'home',
                    label: '主页',
                }, {
                    key: 'blog',
                    label: '文章'
                }, {
                    key: 'app',
                    label: '应用'
                }, {
                    key: 'about',
                    label: '关于'
                }]}
                onClick={(e) => gotoPage(e)}
            />
        </Header>
    );
};

export default MyHeader;