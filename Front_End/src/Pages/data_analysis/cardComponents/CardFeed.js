import Card from "./Card";

const CardFeed = ({ posts }) => {
    return (
        <>
            {posts.map(item => (
                <Card key={item.id} item={item} />
            ))}
        </>
    )
}

export default CardFeed