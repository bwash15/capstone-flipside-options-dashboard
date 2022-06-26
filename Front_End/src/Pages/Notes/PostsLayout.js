import React from 'react';
import Header from './PostsHeader';
import Footer from './PostsFooter';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

const PostsLayout = ({ search, setSearch }) => {
    return (
        <div className='App'>
            <Header title="User Notes" />
            <Nav search={search} setSearch={setSearch} />
            <Outlet />
            <Footer />
        </div>
    )
}
export default PostsLayout