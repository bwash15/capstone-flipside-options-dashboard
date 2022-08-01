import postsApi from '../../data_analysis/api/posts';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const HandleGetPosts = async ({ setPosts }) => {
    try {
        const postResponse = await postsApi.get('/posts');
        if (postResponse && postResponse.data) setPosts(postResponse.data);
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

const HandlePostSubmit = async ({ posts, postTitle, postBody, setPosts, setPostBody, setPostTitle }) => {

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
        id,
        title: postTitle,
        dateTime,
        body: postBody
    };

    try {
        const response = await postsApi.post('/posts', newPost);
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostBody('');
        setPostTitle('');

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

const HandlePostsEdit = async ({ id, posts, editPostTitle, editPostBody, setPosts, setEditPostBody, setEditPostTitle }) => {
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {
        id,
        Title: editPostTitle,
        dateTime,
        body: editPostBody
    };
    try {
        const editPostsResponse = await postsApi.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(post => post.id === id ? { ...editPostsResponse.data } : post));
        setEditPostTitle('');
        setEditPostBody('');

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

const HandlePostsDelete = async ({ setPosts, id }) => {
    const navigate = useNavigate()
    try {
        await postsApi.delete(`/posts/${id}`);
        const updatedPosts = await postsApi.get('/posts');
        setPosts(updatedPosts);
        navigate('/');
    } catch (err) {
        console.log(err.message);
    }
}

export { HandlePostsDelete, HandlePostSubmit, HandlePostsEdit, HandleGetPosts } 