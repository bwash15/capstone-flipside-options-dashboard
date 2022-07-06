import { Link } from 'react-router-dom';

const UsersCard = ({ user }) => {
    return (
        <>
            <article className='post'>
                <Link to={`/card/${user.id}`} >
                    <h2>{user.title}</h2>
                    <p className='postDate'>{user.datetime}</p>
                </Link>
                <p className='postBody'>{
                    (user.body).length <= 25 ? user.body : `${(user.body).slice(0, 25)}...`
                }</p>
            </article>
        </>
    )
}

export default UsersCard