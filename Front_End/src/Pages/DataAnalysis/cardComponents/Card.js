import { Link } from 'react-router-dom';

const Card = ({ item }) => {
    return (
        <>
            <article className='post'>
                <Link to={`/post/${item.id}`} >
                    <h2>{item.title}</h2>
                    <p className='postDate'>{item.datetime}</p>
                </Link>
                <p className='postBody'>{
                    (item.body).length <= 25 ? item.body : `${(item.body).slice(0, 25)}...`
                }</p>
            </article>
            {/* <article className='post'>
                <Link to={`/card/${item.request_id}`}>
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
            </article>
            <article className='post'>
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