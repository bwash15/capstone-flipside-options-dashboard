import React, { useState, useEffect } from 'react';
import PostsLayout from './PostsLayout';
import Home from './PostsHome';
import NewPost from './NewPosts';
import PostPage from './PostPage';
import Missing from './PostsMissing';
import About from './About';
import { format } from 'date-fns';
import postSytles from './postsStyles.css';
import api from '../api/posts';

import { Route, Routes, useNavigate } from 'react-router-dom';

const UserNotes = () => {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const usersURL = '/users';
    const userNotesURL = '/posts';  //  ** Needs to be updated to [/usernotes]


    const navigate = useNavigate();

    useEffect(() => {
        const fetchposts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
            } catch (err) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
        }
        fetchposts();
    }, [])

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    const handleDelete = (id) => {
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, dateTime, body: postBody };
        try {
            const response = await api.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/');
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

            } else {
                console.log(`Error: ${err.message}`);
            }
        }
    }


    return (
        <Routes>
            <Route path="/usernotes" element={
                <PostsLayout
                    search={search}
                    setSearch={setSearch}
                />}>
                <Route index element={<Home posts={searchResults} />} />
                <Route path="usernotes/posts">
                    <Route index element={
                        <NewPost
                            handleSubmit={handleSubmit}
                            postTitle={postTitle}
                            setPostTitle={setPostTitle}
                            postBody={postBody}
                            setPostBody={setPostBody}
                        />} />
                    <Route path=":id" element={
                        <PostPage
                            posts={posts}
                            handleDelete={handleDelete}
                        />} />
                </Route>
                <Route path="about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes >
    );
}

export default UserNotes