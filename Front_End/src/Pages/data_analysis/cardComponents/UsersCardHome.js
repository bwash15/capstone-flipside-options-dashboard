import UsersCardFeed from "./UsersCardFeed"

const UsersCardHome = ({ users }) => {
    return (
        <main className="Home">
            {users.length ? (
                <UsersCardFeed
                    users={users}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No users to display
                </p>
            )}
        </main>
    )
}

export default UsersCardHome