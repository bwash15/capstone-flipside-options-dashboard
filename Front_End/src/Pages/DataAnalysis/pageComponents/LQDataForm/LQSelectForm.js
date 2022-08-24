import React from 'react'

const LQSelectForm = ({ title, ask, setAsk, bid, setBid, ask_size, setAskSize, bid_size, setBidSize, last_updated, setLQlast_updated, midpoint, setMidpoint, timeframe, setLQtimeFrame, _handleLastQuotehold }) => {
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

export default LQSelectForm
{/* <label></label>
<input
    type='text'
    name="ask"
    placeholder='Ask'
    value={'Ask - [ ' + ask + ' ]'}
    onChange={(e) => { setAsk(e.target.value) }} />

<label></label>
<input
    type='text'
    name="askSize"
    placeholder='Ask Size'
    value={'Ask Size - [ ' + ask_size + ' ]'}
    onChange={(e) => { setAskSize(e.target.value) }} />

<label></label>
<input
    type='text'
    name="bid"
    placeholder='Bid'
    value={'Bid - [ ' + bid + ' ]'}
    onChange={(e) => { setBid(e.target.value) }} />

<label></label>
<input
    type='text'
    name="bidSize"
    placeholder='Bid Size'
    value={'Bid Size - [ ' + bid_size + ' ]'}
    onChange={(e) => { setBidSize(e.target.value) }} />

<label></label>
<input
    type='text'
    name="last_updated"
    placeholder='Last Updated'
    value={'Lst Updtd - [ ' + last_updated + ' ]'}
    onChange={(e) => { setLQlast_updated(e.target.value) }} />

<label></label>
<input
    type='text'
    name="midpoint"
    placeholder='Midpoint'
    value={'Midpoint - [ ' + midpoint + ' ]'}
    onChange={(e) => { setMidpoint(e.target.value) }} />
<input
    type='text'
    name="timeframe"
    placeholder='Timeframe'
    value={'Timeframe - [ ' + timeframe + ' ]'}
    onChange={(e) => { setLQtimeFrame(e.target.value) }} /> */}