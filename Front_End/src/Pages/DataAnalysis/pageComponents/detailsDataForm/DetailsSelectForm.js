import React from 'react'

const DetailsSelectForm = ({ title, contract_type, exercise_style, expiration_date, shares_per_contract, strike_price, ticker, setContractType, setExerciseStyle, setExpirationDate, setSharesPerContract, setStrikePrice, setDetailsTicker, _handleDetailsHold }) => {
    return (
        <article>
            <form className='detailsDataForm' >
                <h4>{title}</h4>
                <p className='postBody'>{'Ctrt Type - [ ' + contract_type + ' ]'}</p>
                <p className='postBody'>{'Exsz Styl - [ ' + exercise_style + ' ]'}</p>
                <p className='postBody'>{'Exp Date - [ ' + expiration_date + ' ]'}</p>
                <p className='postBody'>{'Shrs Per - [ ' + shares_per_contract + ' ]'}</p>
                <p className='postBody'>{'Strk Prc - [ ' + strike_price + ' ]'}</p>
                <p className='postBody'>{'Ticker - [ ' + ticker + ' ]'}</p>

            </form>
        </article>
    )
}

export default DetailsSelectForm

{/* <label></label>
<input
    type='text'
    name="contract_type"
    placeholder='Contract Type'
    value={'Ctrt Type - [ ' + contract_type + ' ]'}
    onChange={(e) => { setContractType(e.target.value) }} />

<label></label>
<input
    type='text'
    name="exercise_style"
    placeholder='Exercise Style'
    value={'Exsz Styl - [ ' + exercise_style + ' ]'}
    onChange={(e) => { setExerciseStyle(e.target.value) }} />

<label></label>
<input
    type='text'
    name="expiration_date"
    placeholder='Exp Date'
    value={'Exp Date - [ ' + expiration_date + ' ]'}
    onChange={(e) => { setExpirationDate(e.target.value) }} />

<label></label>
<input
    type='text'
    name="shares_per_contract"
    placeholder='Shares Per Contract'
    value={'Shrs Per - [ ' + shares_per_contract + ' ]'}
    onChange={(e) => { setSharesPerContract(e.target.value) }} />

<label></label>
<input
    type='text'
    name="strike_price"
    placeholder='Strike Price'
    value={'Strk Prc - [ ' + strike_price + ' ]'}
    onChange={(e) => { setStrikePrice(e.target.value) }} />

<label></label>
<input
    type='text'
    name="ticker"
    placeholder='ticker'
    value={'Ticker - [ ' + ticker + ' ]'}
    onChange={(e) => { setDetailsTicker(e.target.value) }} /> */}
