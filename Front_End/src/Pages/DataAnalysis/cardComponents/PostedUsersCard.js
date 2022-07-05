import { useParams, Link } from 'react-router-dom';

const PostedUsersCard = ({ users, handleUsersDelete }) => {
    const { id } = useParams();
    const user = users.find(user => (user.id).toString() === id);

    return (
        <main className='postPage'>
            <article>
                {user &&
                    <>
                        <h2>{user.name}</h2>
                        <p className='postDate'>{user.datetime}</p>
                        <p className='postBody'>{user.body}</p>
                        <button onClick={() => handleUsersDelete(user.id)}>
                            Delete
                        </button>
                    </>
                }
                {!user &&
                    <>
                        <h2>user not found</h2>
                        <p>
                            <Link to='/users'>Back to Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostedUsersCard