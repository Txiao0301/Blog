import React from 'react';
import { Divider, theme, Pagination } from 'antd';


const BlogList: React.FC = () => {
    const {
        token: { fontSizeHeading4 },
    } = theme.useToken();
    return (
        <>
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>
            <Divider />
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>
            <Divider />
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>
            <Divider />
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>
            <Divider />
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>
            <Divider />
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>
            <Divider />
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>
            <Divider />
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>
            <Divider />
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>
            <Divider />
            <p className='blog-list-title-content' style={{ fontSize: fontSizeHeading4 }}>
                My blog title.
            </p>

            <Pagination simple defaultCurrent={1} defaultPageSize={10} total={80} />
        </>

    )
};

export default BlogList;