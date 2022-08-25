import React from 'react'

const HoldDetailsDataDisplay = ({ title, contract_type, exercise_style, expiration_date, shares_per_contract, strike_price, ticker, setContractType, setExerciseStyle, setExpirationDate, setSharesPerContract, setStrikePrice, setDetailsTicker, _handleDetailsHold }) => {
    return (
        <article>
            <form className='detailsDataForm' >
                <h4>{title}</h4>
                <p className='postBody'>{'Ctrt Type [ ' + contract_type + ' ]'}</p>
                <p className='postBody'>{'Exsz Styl [ ' + exercise_style + ' ]'}</p>
                <p className='postBody'>{'Exp Date [ ' + expiration_date + ' ]'}</p>
                <p className='postBody'>{'Shrs Per [ ' + shares_per_contract + ' ]'}</p>
                <p className='postBody'>{'Strk Prc [ ' + strike_price + ' ]'}</p>
                <p className='postBody'>{'Ticker [ ' + ticker + ' ]'}</p>

            </form>
        </article>
    )
}

export default HoldDetailsDataDisplay