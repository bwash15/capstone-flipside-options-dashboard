import React from 'react'

const HoldLQDataDisplay = ({ title, ask, setAsk, bid, setBid, ask_size, setAskSize, bid_size, setBidSize, last_updated, setLQlast_updated, midpoint, setMidpoint, timeframe, setLQtimeFrame, _handleLastQuotehold }) => {
    return (
        <article>
            <form className='lastQuoteDataForm' >
                <h4>{title}</h4>
                <p className='postBody'>{'Ask [ ' + ask + ' ]'}</p>
                <p className='postBody'>{'Ask Size [ ' + ask_size + ' ]'}</p>
                <p className='postBody'>{'Bid [ ' + bid + ' ]'}</p>
                <p className='postBody'>{'Bid Size [ ' + bid_size + ' ]'}</p>
                <p className='postBody'>{'Lst Updtd [ ' + last_updated + ' ]'}</p>
                <p className='postBody'>{'Midpoint [ ' + midpoint + ' ]'}</p>
                <p className='postBody'>{'Timeframe [ ' + timeframe + ' ]'}</p>
            </form>
        </article>
    )
}

export default HoldLQDataDisplay