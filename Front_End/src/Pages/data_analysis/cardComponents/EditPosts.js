import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const EditPosts = ({
    posts, handlePostsEdit, editPostTitle, editPostBody, setEditPostTitle, setEditPostBody
}) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditPostTitle(post.title);
            setEditPostBody(post.body)
        }
    }, [post, setEditPostTitle, setEditPostBody])

    return (

        <main className='NewPost'>
            {editPostTitle &&
                <>
                    <h2>Edit your Note...</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='postTitle'>Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editPostTitle}
                            onChange={(e) => setEditPostTitle(e.target.value)}
                        />
                        <label htmlFor='postBody'>Body:</label>
                        <textarea
                            id="postBody"
                            type="text"
                            required
                            value={editPostBody}
                            onChange={(e) => setEditPostBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handlePostsEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editPostTitle &&
                <>
                    <h2>Post not found</h2>
                    <p>
                        <Link to='/'>Back to Home Page...</Link>
                    </p>
                </>

            }
        </main>
    )
}

export default EditPosts