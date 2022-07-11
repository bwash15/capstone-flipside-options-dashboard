import Card from "./Card";

const CardFeed = ({ posts }) => {
    return (
        <>
            {posts.map(post => (
                <Card key={post.id} post={post} />
            ))}
        </>
    )
}

export default CardFeed