import { Breadcrumb, Layout, theme } from 'antd';
import BlogList from './blogList'

function MyBlog() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    
    return (
        <div style={{ padding: 24, margin: 24, background: colorBgContainer }}>
            <BlogList />
        </div>
    )
}

export default MyBlog;