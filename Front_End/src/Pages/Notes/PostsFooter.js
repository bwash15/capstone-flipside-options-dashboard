import React from 'react'

const Footer = ({ backColorValue, isDarkText, setBackColorValue, setIsDarkText }) => {
    const today = new Date();

    return (
        <footer>
            <button
                type='button'
                onClick={() => {
                    setIsDarkText(!isDarkText)
                    setBackColorValue(!backColorValue)
                }}>
                Dark Mode
            </button>
            <p>Copyright &copy; {today.getFullYear()}</p>
        </footer>
    )
}

Footer.defaultProps = {
    colorValue: "#fof8ff"
}

export default Footer