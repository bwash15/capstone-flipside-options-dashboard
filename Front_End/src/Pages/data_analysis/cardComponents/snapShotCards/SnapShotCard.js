import { Link } from 'react-router-dom';

const SnapShotCard = ({ snapShot }) => {
    return (
        <>
            <article className='post'>
                <Link to={`/snapShots/snapShot/${snapShot.request_id.toString()}`} >
                    <h2>Ticker: {snapShot.results.details.ticker}</h2>
                </Link>
                <p className='postDate'>Last Updated: {snapShot.results.day.last_updated}</p>
                <p className='postDate'>Request ID: {snapShot.request_id}</p>
                {/** ---------------DAY---------------------- **/}
                <h5>Day: </h5>
                <p className='postBody'>Open: {snapShot.results.day.open}</p>
                <p className='postBody'>Close: {snapShot.results.day.close}</p>
                <p className='postBody'>High: {snapShot.results.day.high}</p>
                <p className='postBody'>Low: {snapShot.results.day.low}</p>

                {/** ---------------DETAILS------------------ **/}
                <h5>Details: </h5>
                <p className='postBody'>Expiration Date: {snapShot.results.details.expiration_date}</p>
                <p className='postBody'>Strike Price: {snapShot.results.details.strike_price}</p>
                <p className='postBody'>Ticker: {snapShot.results.details.ticker}</p>

                {/** ---------------LAST_QUOTE--------------- **/}
                <h5>Last Quote: </h5>
                <p className='postBody'>Midpoint: {snapShot.results.last_quote.midpoint}</p>

                {/** ---------------UNDERLYING_ASSET--------- **/}
                <h5>Underlying Asset: </h5>
                <p className='postBody'>Price: {snapShot.results.underlying_asset.price}</p>
                <p className='postBody'>Ticker: {snapShot.results.underlying_asset.ticker}</p>
                <p className='postBody'>TimeFrame: {snapShot.results.underlying_asset.timeframe}</p>
            </article>
        </>
    )
}

export default SnapShotCard