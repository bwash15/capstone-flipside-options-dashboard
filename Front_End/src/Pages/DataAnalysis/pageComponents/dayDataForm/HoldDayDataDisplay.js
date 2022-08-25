import React from 'react'

const HoldDayDataDisplay = ({ dayDataArray, title, change, setChange, change_percent, setChangePercent, close, setClose, high, setHigh, last_updated, setLast_updated, low, setLow, open, setOpen, previous_close, setPreviousClose, volume, setVolume, vwap, setVwap, _handleDayHold }) => {

    return (
        <article>
            <form className='dayDataForm' >
                <h4>{title}</h4>
                <p className='postDate'>{'Change  [ ' + change + ' ]'}</p>
                <p className='postDate'>{'Change % [ ' + change_percent + ' ]'}</p>
                <p className='postDate'>{'Close [ ' + close + ' ]'}</p>
                <p className='postDate'>{'High [ ' + high + ' ] '}</p>
                <p className='postDate'>{'Lst Updtd [ ' + last_updated + ' ]'}</p>
                <p className='postDate'>{'Low [ ' + low + ' ]'}</p>
                <p className='postDate'>{'Open [ ' + open + ' ]'}</p>
                <p className='postDate'>{'Prev Clse [ ' + previous_close + ' ]'}</p>
                <p className='postDate'>{'Volume [ ' + volume + ' ]'}</p>
                <p className='postDate'>{'Vwap [ ' + vwap + ' ]'}</p>
            </form>
        </article>
    )
}

export default HoldDayDataDisplay