import React from 'react'

const HoldULADataDisplay = ({ title, change_to_break_even, setChangeToBreakEven, last_updated, setULlastUpdated, price, setPrice, ticker, setULTicker, timeframe, setULTimeFrame }) => {
    return (
        <article>
            <form className='ULADataForm' >
                <h4>{title}</h4>
                <p className='postBody'>{'Chg Br_Evn [ ' + change_to_break_even + ' ]'}</p>
                <p className='postBody'>{'Lst Updtd [ ' + last_updated + ' ]'}</p>
                <p className='postBody'>{'Price [ ' + price + ' ]'}</p>
                <p className='postBody'>{'Ticker [ ' + ticker + ' ]'}</p>
                <p className='postBody'>{'Timeframe [ ' + timeframe + ' ]'}</p>
            </form>
        </article>
    )
}

export default HoldULADataDisplay