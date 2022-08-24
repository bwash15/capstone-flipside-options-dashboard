import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HandleGetSnapShots, HandleSnapShotSubmit, HandleSnapShotEdit, HandleSnapShotDelete } from "../../../analysisControllers/snapShotController";
import FiltersSelect from '../../filters/filtersSelect';
import axios from 'axios';

export default function SnapShotData({ snapShot }) {


    const [isLoading, setIsLoading] = useState('');
    const [error, setError] = useState('');

    const [userReqSnapShot, setUserReqSnapShot] = useState([])

    const [selectedSnapShot, setSelectedSnapShot] = useState({
        request_id: '12345678900987654321',
        results: {
            break_even_price: 0.0,
            day: {
                change: 0.0,
                change_percent: 0.0,
                close: 0.0,
                high: 0.0,
                last_updated: 'selected_today',
                low: 0.0,
                open: 0.0,
                previous_close: 0.0,
                volume: 0.0,
                vwap: 0.0
            },
            details: {
                contractType: 'String',
                exercise_style: 'String',
                expiration_date: 0.0,
                shares_per_contract: 0.0,
                strike_rice: 0.0,
                ticker: 'String'
            },
            greeks: {
                delta: 0.0,
                gamma: 0.0,
                theta: 0.0,
                vega: 0.0,

            },
            implied_volatility: 0.0,
            last_quote: {
                ask: 0.0,
                ask_size: 0.0,
                bid: 0.0,
                bid_size: 0.0,
                last_updated: 0.0,
                midPoint: 0.0,
                timeframe: 'String'
            },
            open_interest: 0.0,
            underlying_asset: {
                change_to_break_even: 0.0,
                last_updated: 0.0,
                price: 0.0,
                ticker: 'String',
                timeframe: 'String'
            },
        },
        status: 'OK'
    })

    // useEffect(() => {

    // },[])



    return (
        <main className='SnapViewPage'>
            <article>
                {snapShot &&
                    <>
                        <form>
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

                        </form>
                        <div>
                            <h2>Ticker: {selectedSnapShot.results.details.ticker}</h2>
                            <p className='postDate'>Last Updated: {selectedSnapShot.results.day.last_updated}</p>
                            <p className='postBody'>Break Even Price: {selectedSnapShot.results.break_even_price}</p>
                            {/** ---------------DAY---------------------- **/}
                            <h5>Day: </h5>
                            <p className='postBody'>Change: {selectedSnapShot.results.day.change}</p>
                            <p className='postBody'>Change Percent:{selectedSnapShot.results.day.change_percent}</p>
                            <p className='postBody'>Open: {selectedSnapShot.results.day.open}</p>
                            <p className='postBody'>Close: {selectedSnapShot.results.day.close}</p>
                            <p className='postBody'>Previous Close: {selectedSnapShot.results.day.previous_close}</p>
                            <p className='postBody'>High: {selectedSnapShot.results.day.high}</p>
                            <p className='postBody'>Low: {selectedSnapShot.results.day.low}</p>
                            <p className='postBody'>Volume: {selectedSnapShot.results.day.volume}</p>
                            <p className='postBody'>Vwap: {selectedSnapShot.results.day.vwap}</p>
                            {/** ---------------DETAILS------------------ **/}
                            <h5>Details: </h5>
                            <p className='postBody'>Contract Type: {selectedSnapShot.results.details.contract_type}</p>
                            <p className='postBody'>Exercise Style: {selectedSnapShot.results.details.exercise_style}</p>
                            <p className='postBody'>Expiration Date: {selectedSnapShot.results.details.expiration_date}</p>
                            <p className='postBody'>Shares Per Contract: {selectedSnapShot.results.details.shares_per_contract}</p>
                            <p className='postBody'>Strike Price: {selectedSnapShot.results.details.strike_price}</p>
                            <p className='postBody'>Ticker: {selectedSnapShot.results.details.ticker}</p>
                            {/** ---------------GREEKS------------------- **/}
                            <h5>Greeks: </h5>
                            <p className='postBody'>Delta: {selectedSnapShot.results.greeks.delta}</p>
                            <p className='postBody'>Gamma: {selectedSnapShot.results.greeks.gamma}</p>
                            <p className='postBody'>Theta: {selectedSnapShot.results.greeks.theta}</p>
                            <p className='postBody'>Vega: {selectedSnapShot.results.greeks.vega}</p>
                            <p className='postBody'>Implied Volatility: {selectedSnapShot.results.implied_volatility}</p>
                            {/** ---------------LAST_QUOTE--------------- **/}
                            <h5>Last Quote: </h5>
                            <p className='postBody'>Ask: {selectedSnapShot.results.last_quote.ask}</p>
                            <p className='postBody'>Ask Size: {selectedSnapShot.results.last_quote.ask_size}</p>
                            <p className='postBody'>Bid: {selectedSnapShot.results.last_quote.bid}</p>
                            <p className='postBody'>Bid Size: {selectedSnapShot.results.last_quote.bidSize}</p>
                            <p className='postBody'>Last Updated: {selectedSnapShot.results.last_quote.last_updated}</p>
                            <p className='postBody'>Midpoint: {selectedSnapShot.results.last_quote.midpoint}</p>
                            <p className='postBody'>TimeFrame: {selectedSnapShot.results.last_quote.timeframe}</p>

                            <p className='postBody'>Open Interest: {selectedSnapShot.results.open_interest}</p>
                            {/** ---------------UNDERLYING_ASSET--------- **/}
                            <h5>Underlying Asset: </h5>
                            <p className='postBody'>Change to Break Even: {selectedSnapShot.results.underlying_asset.change_to_break_even}</p>
                            <p className='postBody'>Last Updated: {selectedSnapShot.results.underlying_asset.last_updated}</p>
                            <p className='postBody'>Price: {selectedSnapShot.results.underlying_asset.price}</p>
                            <p className='postBody'>Ticker: {selectedSnapShot.results.underlying_asset.ticker}</p>
                            <p className='postBody'>TimeFrame: {selectedSnapShot.results.underlying_asset.timeframe}</p>
                        </div>
                    </>
                }
                {!snapShot &&
                    <>
                        <h2>SnapShot not found</h2>
                        <p>
                            <Link to='/analytics'>Back to Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )

}