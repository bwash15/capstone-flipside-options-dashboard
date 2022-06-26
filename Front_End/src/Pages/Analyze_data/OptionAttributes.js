import React from 'react'
import AttributeButton from '../components/AttributeButton'



const OptionAttributes = ({ option_ticker, option_type, option_expire_date, option_strike_price, option_multiplier, option_timespan, option_from, option_to, setOptionTicker, setOption_type, setOption_expire_date, setOption_strike_price, setOption_multiplier, setOption_timespan, setOption_from, setOption_To, handleAttributeSubmit }) => {

    return (
        <main className='NewPost'>
            <h3>Search Filters</h3>
            <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="option_ticker">Ticker
                    <input
                        type="text"
                        id="option_ticker"
                        name="option_ticker"
                        value={option_ticker}
                        onChange={(e) => setOptionTicker(e.target.value)}
                    />
                </label>

                <br />
                <label htmlFor="option_type">Type
                    <input
                        type="text"
                        id="option_type"
                        name="option_type"
                        value={option_type}
                        onChange={(e) => setOption_type(e.target.value)}
                    />

                </label>
                <br />
                <label htmlFor="option_expire_date">Expire Date
                    <input
                        type="text"
                        id="option_expire_date"
                        name="option_expire_date"
                        value={option_expire_date}
                        onChange={(e) => setOption_expire_date(e.target.value)}
                    />

                </label>
                <br />
                <label htmlFor="option_strike_price">Strike Price
                    <input
                        type="text"
                        id="option_strike_price"
                        name="option_strike_price"
                        value={option_strike_price}
                        onChange={(e) => setOption_strike_price(e.target.value)}
                    />

                </label>
                <br />

                <label htmlFor="option_multiplier">Multiplier
                    <input
                        type="text"
                        id="option_multiplier"
                        name="option_multiplier"
                        value={option_multiplier}
                        onChange={(e) => setOption_multiplier(e.target.value)}
                    />

                </label>
                <br />
                <label htmlFor="option_timespan">Time Span
                    <input
                        type="text"
                        id="option_timespan"
                        name="option_timespan"
                        value={option_timespan}
                        onChange={(e) => setOption_timespan(e.target.value)}
                    />

                </label>
                <br />
                <label htmlFor="option_from">From Date
                    <input
                        type="text"
                        id="option_from"
                        name="option_from"
                        value={option_from}
                        onChange={(e) => setOption_from(e.target.value)}
                    />

                </label>
                <br />
                <label htmlFor="option_to">To Date
                    <input
                        type="text"
                        id="option_to"
                        name='option_to'
                        value={option_to}
                        onChange={(e) => setOption_To(e.target.value)}
                    />

                </label>
                <br />


            </form>
            <button className='apiPullbutton' type='submit'>Update Parameters</button>

        </main>
    )
}

export default OptionAttributes