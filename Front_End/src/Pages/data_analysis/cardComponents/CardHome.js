import CardFeed from "./CardFeed";
import { client } from '../../utils/clients';

const CardHome = ({ posts, imgSrc, setImgSrc }) => {
    const fetchNewImage = async () => {
        const path = await client("images").then((data) => data.src);
        setImgSrc(path);
    };

    return (
        <main className="Home">
            {posts.length ? (
                <CardFeed
                    posts={posts}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    <h1>No Posts to display..</h1>
                    <button onClick={fetchNewImage}>Get new image</button>
                    <div style={{ margin: 1 }}>
                        <img src={imgSrc} height="400" width="400" />
                    </div>
                </p>
            )}
        </main>
    )
}

export default CardHome