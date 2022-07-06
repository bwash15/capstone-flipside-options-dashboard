import React from 'react'

const Footer = () => {
    const today = new Date();

    return (
        <footer>
            <p>Copyright &copy; {today.getFullYear()}</p>
        </footer>
    )
}

Footer.defaultProps = {
    colorValue: "#fof8ff"
}

export default Footer