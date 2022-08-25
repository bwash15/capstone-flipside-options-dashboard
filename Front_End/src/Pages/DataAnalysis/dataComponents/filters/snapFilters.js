import React from 'react'

const SnapFilters = ({ _handleClearFormFilters, _setSnapShotLink, snap_option_type, setSnapOption_type, snap_option_expire_date, setSnapOption_expire_date,
    snap_option_ticker, setSnapOptionTicker, snap_option_strike_price, setSnapOption_strike_price }) => {
    return (
        <div>
            <form className='newAggFiltersForm' >
                <label htmlFor="snap_option_ticker">Ticker:
                    <label htmlFor='snap_option_ticker'></label>
                    <input
                        type="text"
                        id="snap_option_ticker"
                        name="snap_option_ticker"
                        value={snap_option_ticker}
                        onChange={(e) => setSnapOptionTicker(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="snap_option_type">Type:
                    <label htmlFor='snap_option_type'></label>
                    <input
                        type="text"
                        id="snap_option_type"
                        name="snap_option_type"
                        value={snap_option_type}
                        onChange={(e) => setSnapOption_type(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor="snap_option_expire_date">Expire Date:
                    <label htmlFor='snap_option_expire_date'></label>
                    <input
                        type="text"
                        id="snap_option_expire_date"
                        name="snap_option_expire_date"
                        value={snap_option_expire_date}
                        onChange={(e) => setSnapOption_expire_date(e.target.value)}
                    />
                </label>
                <br />
                <label htmlFor=" snap_option_strike_price">Strike Price:
                    <label htmlFor=' snap_option_strike_price'></label>
                    <input
                        type="text"
                        id=" snap_option_strike_price"
                        name=" snap_option_strike_price"
                        value={snap_option_strike_price}
                        onChange={(e) => setSnapOption_strike_price(e.target.value)}
                    />
                </label>
                <button
                    type="submit"
                    onClick={_setSnapShotLink}>Set SnapShot Link</button>
                <br />
                <button onClick={_handleClearFormFilters}>Clear SnapShot Filters</button>
            </form>
        </div>
    )
}

export default SnapFilters