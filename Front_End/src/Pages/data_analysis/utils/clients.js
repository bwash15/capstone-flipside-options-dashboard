import fetch from "isomorphic-unfetch";
import postsApi from '../api/posts';
import snapShotsApi from '../api/snapShots';
import usersApi from '../api/users';

const Client = async (endpoint, { body, ...customConfig }) => {
    const headers = { "content-type": "application/json" };
    const config = {
        method: body ? "POST" : "GET",
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };
    if (body) {
        config.body = JSON.stringify(body);
    }

    return fetch(`http://localhost:3500/${endpoint}`, config)
        .then(response => response.json())
        .then(data => {
            console.log(data);

        });
}

const FetchDataFromDB = async ({ setPosts, setSnapShots }) => {
    try {
        // Data is in the response.data
        const postResponse = await postsApi.get('/posts');
        if (postResponse && postResponse.data) setPosts(postResponse.data);
        sessionStorage.setItem("posts", JSON.stringify(postResponse.data));
        const SnapShotResponse = await snapShotsApi.get('/snapShot');
        if (SnapShotResponse && SnapShotResponse.data) setSnapShots(SnapShotResponse.data);
        sessionStorage.setItem("snapShots", JSON.stringify(SnapShotResponse.data));

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

export { Client, FetchDataFromDB };