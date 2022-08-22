import React from 'react'

const GreeksSelectForm = ({ title, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, _handleGreeksHold }) => {
    return (
        <article>
            <form className='greeksDataForm'>
                <h4>{title}</h4>
                <p className='postBody'>{'Delta - [ ' + delta + ' ]'}</p>
                <p className='postBody'>{'Gamma - [ ' + gamma + ' ]'}</p>
                <p className='postBody'>{'Theta - [ ' + theta + ' ]'}</p>
                <p className='postBody'>{'Vega - [ ' + vega + ' ]'}</p>
            </form>
        </article>
    )
}

export default GreeksSelectForm
{/* <form className='greeksDataForm' >
    <h2>{title}</h2>
    <label></label>
    <input
        type='text'
        name="delta"
        placeholder='Delta'
        value={'Delta - [ ' + delta + ' ]'}
        onChange={(e) => { setDelta(e.target.value) }} />

    <label></label>
    <input
        type='text'
        name="gamma"
        placeholder='Gamma'
        value={'Gamma - [ ' + gamma + ' ]'}
        onChange={(e) => { setGamma(e.target.value) }} />

    <label></label>
    <input
        type='text'
        name="theta"
        placeholder='Theta'
        value={'Theta - [ ' + theta + ' ]'}
        onChange={(e) => { setTheta(e.target.value) }} />

    <label></label>
    <input
        type='text'
        name="vega"
        placeholder='Vega'
        value={'Vega - [ ' + vega + ' ]'}
        onChange={(e) => { setVega(e.target.value) }} />
</form> */}