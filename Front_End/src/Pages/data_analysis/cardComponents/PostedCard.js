import { useParams, Link } from 'react-router-dom';

const PostedCard = ({ posts, handlePostsDelete }) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    return (
        <main className='PostPage'>
            <article>
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.datetime}</p>
                        <p className='postBody'>{post.body}</p>
                        <Link to={`/post/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
                        <button className="deleteButton" onClick={() => handlePostsDelete(post.id)}>
                            Delete
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post not found</h2>
                        <p>
                            <Link to='/posts'>Back to Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostedCard