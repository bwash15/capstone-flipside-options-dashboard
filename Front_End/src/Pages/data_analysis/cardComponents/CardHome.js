import CardFeed from "./CardFeed";
import { FetchDataFromDB } from '../utils/clients';

const CardHome = ({ posts }) => {


    return (
        <main className="Home">
            {posts.length ? (
                <CardFeed
                    posts={posts}
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    <h1>No Posts to display..</h1>
                    <button >Get new image</button>
                </p>
            )}
        </main>
    )
}

export default CardHome