import React from 'react';
import { Link } from 'react-router-dom';


const Missing = () => {
    return (
        <main>
            <h2>Page Not Found</h2>
            <p> Directing back to the home page</p>
            <p>
                <Link to='/'>To Home Page</Link>
            </p>
        </main>
    )
}

export default Missing