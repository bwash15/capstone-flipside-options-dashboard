import React from 'react'

const HoldGreeksDataDisplay = ({ title, delta, setDelta, gamma, setGamma, theta, setTheta, vega, setVega, _handleGreeksHold }) => {
    return (
        <article>
            <form className='greeksDataForm'>
                <h4>{title}</h4>
                <p className='postBody'>{'Delta [ ' + delta + ' ]'}</p>
                <p className='postBody'>{'Gamma [ ' + gamma + ' ]'}</p>
                <p className='postBody'>{'Theta [ ' + theta + ' ]'}</p>
                <p className='postBody'>{'Vega [ ' + vega + ' ]'}</p>
            </form>
        </article>
    )
}

export default HoldGreeksDataDisplay