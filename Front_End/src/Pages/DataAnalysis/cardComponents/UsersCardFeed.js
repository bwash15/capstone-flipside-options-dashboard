import UsersCard from "./UsersCard";

const UsersCardFeed = ({ users }) => {
    return (
        <>
            {users.map(user => (
                <UsersCard key={user.id} user={user} />
            ))}
        </>
    )
}

export default UsersCardFeed