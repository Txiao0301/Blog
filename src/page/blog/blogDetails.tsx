import { theme } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function BlogDetail() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [content, setContent] = useState('');
    var { id } = useParams();

    useEffect(() => {
        fetchData()
    }, [content])

    const fetchData = () => {
        axios.get('/blog', {
            data: {
                id: id
            }
        }).then(res => {
            setContent(res.data.data)
        })
    }

    return (
        <div style={{ padding: 24, margin: 24, background: colorBgContainer }} dangerouslySetInnerHTML={{ __html: content }}>

        </div>
    )
}

export default BlogDetail;
