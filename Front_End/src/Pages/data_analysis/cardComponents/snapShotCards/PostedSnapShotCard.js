import { useParams, Link } from 'react-router-dom';

const PostedSnapShotCard = ({ snapShots, handleSnapShotDelete }) => {
    const { id } = useParams();
    const snapShot = snapShots.find(snapShot => (snapShot.request_id) === id);

    return (
        <main className='postPage'>
            <article>
                {snapShot &&
                    <>
                        <h2>Ticker: {snapShot.results.details.ticker}</h2>
                        <p className='postDate'>Last Updated: {snapShot.results.day.last_updated}</p>
                        <p className='postBody'>Break Even Price: {snapShot.results.break_even_price}</p>
                        {/** ---------------DAY---------------------- **/}
                        <h5>Day: </h5>
                        <p className='postBody'>Change: {snapShot.results.day.change}</p>
                        <p className='postBody'>Change Percent:{snapShot.results.day.change_percent}</p>
                        <p className='postBody'>Open: {snapShot.results.day.open}</p>
                        <p className='postBody'>Close: {snapShot.results.day.close}</p>
                        <p className='postBody'>Previous Close: {snapShot.results.day.previous_close}</p>
                        <p className='postBody'>High: {snapShot.results.day.high}</p>
                        <p className='postBody'>Low: {snapShot.results.day.low}</p>
                        <p className='postBody'>Volume: {snapShot.results.day.volume}</p>
                        <p className='postBody'>Vwap: {snapShot.results.day.vwap}</p>
                        {/** ---------------DETAILS------------------ **/}
                        <h5>Details: </h5>
                        <p className='postBody'>Contract Type: {snapShot.results.details.contract_type}</p>
                        <p className='postBody'>Exercise Style: {snapShot.results.details.exercise_style}</p>
                        <p className='postBody'>Expiration Date: {snapShot.results.details.expiration_date}</p>
                        <p className='postBody'>Shares Per Contract: {snapShot.results.details.shares_per_contract}</p>
                        <p className='postBody'>Strike Price: {snapShot.results.details.strike_price}</p>
                        <p className='postBody'>Ticker: {snapShot.results.details.ticker}</p>
                        {/** ---------------GREEKS------------------- **/}
                        <h5>Greeks: </h5>
                        <p className='postBody'>Delta: {snapShot.results.greeks.delta}</p>
                        <p className='postBody'>Gamma: {snapShot.results.greeks.gamma}</p>
                        <p className='postBody'>Theta: {snapShot.results.greeks.theta}</p>
                        <p className='postBody'>Vega: {snapShot.results.greeks.vega}</p>
                        <p className='postBody'>Implied Volatility: {snapShot.results.implied_volatility}</p>
                        {/** ---------------LAST_QUOTE--------------- **/}
                        <h5>Last Quote: </h5>
                        <p className='postBody'>Ask: {snapShot.results.last_quote.ask}</p>
                        <p className='postBody'>Ask Size: {snapShot.results.last_quote.ask_size}</p>
                        <p className='postBody'>Bid: {snapShot.results.last_quote.bid}</p>
                        <p className='postBody'>Bid Size: {snapShot.results.last_quote.bidSize}</p>
                        <p className='postBody'>Last Updated: {snapShot.results.last_quote.last_updated}</p>
                        <p className='postBody'>Midpoint: {snapShot.results.last_quote.midpoint}</p>
                        <p className='postBody'>TimeFrame: {snapShot.results.last_quote.timeframe}</p>

                        <p className='postBody'>Open Interest: {snapShot.results.open_interest}</p>
                        {/** ---------------UNDERLYING_ASSET--------- **/}
                        <h5>Underlying Asset: </h5>
                        <p className='postBody'>Change to Break Even: {snapShot.results.underlying_asset.change_to_break_even}</p>
                        <p className='postBody'>Last Updated: {snapShot.results.underlying_asset.last_updated}</p>
                        <p className='postBody'>Price: {snapShot.results.underlying_asset.price}</p>
                        <p className='postBody'>Ticker: {snapShot.results.underlying_asset.ticker}</p>
                        <p className='postBody'>TimeFrame: {snapShot.results.underlying_asset.timeframe}</p>
                        <button onClick={() => handleSnapShotDelete(snapShot.request_id)}>
                            Delete
                        </button>
                    </>
                }
                {!snapShot &&
                    <>
                        <h2>SnapShot not found</h2>
                        <p>
                            <Link to='/snapshots'>Back to Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostedSnapShotCard