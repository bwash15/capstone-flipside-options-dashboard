import React from 'react'
import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete }) => {
    // this [id] is declared in the router
    // must match what you set for the route
    const { id } = useParams();
    // The post we want to display
    const post = posts.find(post => (post.id).toString() === id);
    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post not found</h2>
                        <p>
                            <Link to='/'>Back to Analysis Home Page</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage