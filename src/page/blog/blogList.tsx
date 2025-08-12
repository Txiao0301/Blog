import React, { useEffect, useState } from 'react';
import { theme, Pagination, List, Space } from 'antd';
import axios from 'axios';
import '../../mock/blog.js';

const BlogList: React.FC = () => {

    const {
        token: { fontSizeHeading4 },
    } = theme.useToken();

    const [page, setPage] = useState(1);

    const [list, setList] = useState([]);

    const [total] = useState(100);

    const [size] = useState(20);

    useEffect(() => {
        console.info('useEffect')
        fetchData()
    }, [page])

    const fetchData = () => {
        axios.post('/blogList/list', {
            data: {
                page: page
            }
        }).then(res => {
            setList(res.data.data.list)
        })
    }

    return (
        <>
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <List
                    size="large"
                    bordered
                    dataSource={list}
                    renderItem={({ id, title }) => (
                        <List.Item onClick={() => {
                            window.open(`/#/blog/${id}`, '_blank');
                        }}>
                            {title}
                        </List.Item>
                    )}
                />
                <Pagination simple defaultCurrent={page} current={page} defaultPageSize={size} pageSize={size} onChange={setPage} total={total} />
            </Space>
        </>

    )
};

export default BlogList;
