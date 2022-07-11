import { Link } from 'react-router-dom';

const Card = ({ post }) => {
    return (
        <>
            <article className="post">
                <Link to={`post/${post.id}`}>
                    <h2>{post.title}</h2>
                    <p className="postDate">{post.datetime}</p>
                </Link>
                <p className="postBody">{
                    (post.body).length <= 25
                        ? post.body
                        : `${(post.body).slice(0, 25)}...`
                }</p>
            </article>
            {/* <article className='post'>
                <Link to={`/post/${item.request_id}`}>
                    <h2>Item Expiration Date</h2>
                    <h4>{item.results.details.expiration_date}</h4>
                    <h2>Item Strike Price</h2>
                    <h4>{item.results.details.strike_price}</h4>
                    <h2>Item MidPoint</h2>
                    <h4>{item.results.last_quote.midpoint}</h4>
                    <h2>Item Ticker</h2>
                    <h4>{item.results.underlying_asset.ticker}</h4>
                    <h2>Item Last Updated</h2>
                    <h4>{item.results.last_quote.last_updated}</h4>
                </Link>
            </article> */}
            {/* <article className='post'>
                <Link to={`/Card/${item.request_id}`}>
                    <h2>Item Expiration Date</h2>
                    <h4>{item.results.details.expiration_date}</h4>
                    <h2>Item Strike Price</h2>
                    <h4>{item.results.details.strike_price}</h4>
                    <h2>Item MidPoint</h2>
                    <h4>{item.results.last_quote.midpoint}</h4>
                    <h2>Item Ticker</h2>
                    <h4>{item.results.underlying_asset.ticker}</h4>
                    <h2>Item Last Updated</h2>
                    <h4>{item.results.last_quote.last_updated}</h4>
                </Link>
            </article> */}
        </>
    )
}

export default Card