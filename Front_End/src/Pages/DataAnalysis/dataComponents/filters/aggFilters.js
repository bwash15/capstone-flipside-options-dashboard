import React from 'react'

const AggFilters = ({ _handleClearFormFilters, _setAggregatesLink, option_type, option_expire_date, option_ticker, option_strike_price, option_multiplier, option_timespan, option_from, option_to, setOption_type, setOption_expire_date, setOptionTicker, setOption_strike_price, setOption_multiplier, setOption_timespan, setOption_from,
    setOption_To }) => {
    return (
        <div>
            <form className='newAggFiltersForm' >
                <label htmlFor="option_ticker">Ticker:
                    <label htmlFor='option_ticker'></label>
                    <input
                        type="text"
                        id="option_ticker"
                        name="option_ticker"
                        value={option_ticker}
                        onChange={(e) => setOptionTicker(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_type">Type:
                    <label htmlFor='option_type'></label>
                    <input
                        type="text"
                        id="option_type"
                        name="option_type"
                        value={option_type}
                        onChange={(e) => setOption_type(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_expire_date">Expire Date:
                    <label htmlFor='option_expire_date'></label>
                    <input
                        type="text"
                        id="option_expire_date"
                        name="option_expire_date"
                        value={option_expire_date}
                        onChange={(e) => setOption_expire_date(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_strike_price">Strike Price:
                    <label htmlFor='option_strike_price'></label>
                    <input
                        type="text"
                        id="option_strike_price"
                        name="option_strike_price"
                        value={option_strike_price}
                        onChange={(e) => setOption_strike_price(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_multiplier">Multiplier:
                    <label htmlFor='option_multiplier'></label>
                    <input
                        type="text"
                        id="option_multiplier"
                        name="option_multiplier"
                        value={option_multiplier}
                        onChange={(e) => setOption_multiplier(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_timespan">Time Span:
                    <label htmlFor='option_timespan'></label>
                    <input
                        type="text"
                        id="option_timespan"
                        name="option_timespan"
                        value={option_timespan}
                        onChange={(e) => setOption_timespan(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_from">From Date:
                    <label htmlFor='option_from'></label>
                    <input
                        type="text"
                        id="option_from"
                        name="option_from"
                        value={option_from}
                        onChange={(e) => setOption_from(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="option_to">To Date:
                    <label htmlFor='option_to'></label>
                    <input
                        type="text"
                        id="option_to"
                        name='option_to'
                        value={option_to}
                        onChange={(e) => setOption_To(e.target.value)}
                    />
                </label>
                <br />
                <button
                    type="submit"
                    onClick={_setAggregatesLink}>Set Aggregates Link</button>

                <button onClick={_handleClearFormFilters}>Clear Aggregate Filters</button>
            </form>
        </div>
    )
}

export default AggFilters