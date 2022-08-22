import React from 'react'

const ULASelectForm = ({ title, change_to_break_even, setChangeToBreakEven, last_updated, setULlastUpdated, price, setPrice, ticker, setULTicker, timeframe, setULTimeFrame }) => {
    return (
        <p>
            <form className='ULADataForm' >
                <h2>{title}</h2>
                <label></label>
                <input
                    type='text'
                    name="change_to_break_even"
                    placeholder='Change to Break Even'
                    value={'Chg Br_Evn - [ ' + change_to_break_even + ' ]'}
                    onChange={(e) => { setChangeToBreakEven(e.target.value) }} />

                <label></label>
                <input
                    type='text'
                    name="last_updated"
                    placeholder='Last Updated'
                    value={'Lst Updtd - [ ' + last_updated + ' ]'}
                    onChange={(e) => { setULlastUpdated(e.target.value) }} />

                <label></label>
                <input
                    type='text'
                    name="price"
                    placeholder='Price'
                    value={'Price - [ ' + price + ' ]'}
                    onChange={(e) => { setPrice(e.target.value) }} />

                <label></label>
                <input
                    type='text'
                    name="ticker"
                    placeholder='ticker'
                    value={'Ticker - [ ' + ticker + ' ]'}
                    onChange={(e) => { setULTicker(e.target.value) }} />

                <label></label>
                <input
                    type='text'
                    name="timeframe"
                    placeholder='Timeframe'
                    value={'Timeframe - [ ' + timeframe + ' ]'}
                    onChange={(e) => { setULTimeFrame(e.target.value) }} />
            </form>
        </p>
    )
}

export default ULASelectForm