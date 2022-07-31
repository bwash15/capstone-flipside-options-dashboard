import React from 'react'

const APIpullButton = ({ buttonText, reqType, setReqType }) => {

    return (
        <button
            className={buttonText === reqType ? "selected" : "notSelected"}
            type="button"
            onClick={() => setReqType(buttonText)}
        >
            {buttonText}
        </button>
    )
}

export default APIpullButton