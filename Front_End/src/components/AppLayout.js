/**
 *  The Outlet component represents all the children of
 *  the Layout component - Anything Nested inside the Layout
 *  component is represented by the Outlet
 *  ** This allows us to add more things such as a 
 *     static header or footer can be placed here
 *  ** Also, we can create more Outlets as we create
 *     more routing throughout the application
 * 
 */

import { Outlet } from "react-router-dom";
import React from 'react';

const AppLayout = () => {
    return (
        <main>
            <Outlet />
        </main>
    )
}

export default AppLayout





