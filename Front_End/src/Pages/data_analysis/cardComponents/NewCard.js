import React from 'react'

const NewCard = ({ HandlePostsSubmit, postTitle, setPostTitle, postBody, setPostBody, }) => {
    return (
        <main className='NewPost'>
            <h2>Take A Note...</h2>
            <form className='newPostForm' onSubmit={HandlePostsSubmit}>
                <label htmlFor='postTitle'>Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor='postBody'>Body:</label>
                <textarea
                    id="postBody"
                    type="text"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewCard