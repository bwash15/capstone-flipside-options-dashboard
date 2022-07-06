import CardFeed from "./CardFeed"

const CardHome = ({ posts }) => {
    return (
        <main className="Home">
            {posts.length ? (
                <CardFeed
                    posts={posts}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No posts to display
                </p>
            )}
        </main>
    )
}

export default CardHome