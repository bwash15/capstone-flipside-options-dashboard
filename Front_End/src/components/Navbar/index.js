import { React, useState, useContext } from 'react'
// import { FaCookie } from 'react-icons/fa';
import { Navigate } from 'react-router-dom'
import axios from '../../api/axios';
import { Nav, NavLink, Bars, NavMenu, NavButton, NavButtonLink } from './NavBarElements'
const NavBar = () => {
    const [email, setEmail] = useState('');
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const URL = "http://localhost:3600/_routes/api/users";
            const loginResponse = await axios.post(URL, JSON.stringify({ email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(loginResponse?.data));
            // Getting the accessToken from the Backend (if it is there)
            const accessToken = loginResponse?.data?.accessToken;
            const roles = loginResponse?.data?.roles;
            // setAuth({ email, password, roles, accessToken });
            // setEmail('');
            // setPwd('');
            // setSuccess(true);

        } catch (error) {
            if (
                error.loginResponse &&
                error.loginResponse.status >= 400 &&
                error.loginResponse.status <= 500
            ) {
                setError(error.loginResponse.data.message);
            }
        }
    };


    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img style={{ height: '60px', width: '120px' }} src="Images/FlipSideLogo.png" alt="Logo" />
                </NavLink>

                <Bars />
                <NavMenu>
                    <NavLink to='/home' activestyle="true">
                        Home
                    </NavLink>
                    <NavLink to='/tiles' activestyle="true">
                        Tiles
                    </NavLink>
                    <NavLink to='/trading' activestyle="true">
                        Trading
                    </NavLink>
                    <NavLink to='/profile' activestyle="true">
                        Profile
                    </NavLink>
                </NavMenu>
                <NavButton onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Logout
                </NavButton>
            </Nav>
        </>
    )
}
export default NavBar;








// {logoutSuccess ? (
//     <section>
//         <h1>Logout Succesful!</h1>
//         <br />
//         <Navigate to="/login" replace={true}></Navigate>
//     </section>
// ) : ()}