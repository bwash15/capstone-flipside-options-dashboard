import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import mstyles from "./mstyles.module.css";
import {isMobile} from 'react-device-detect';


const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const {setUser} =useUser();
    // Used in navigating authorized and unauthorized users
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/landingpage";

    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await axios.post(LOGIN_URL, JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(loginResponse?.data));
            // Getting the accessToken from the Backend (if it is there)
            const accessToken = loginResponse?.data?.accessToken;
            const roles = loginResponse?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            setUser(email);
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });

        } catch (error) {
            if (
                error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    
    const [style,setStyle] = useState(styles);
      useEffect(() =>{
            if(window.innerWidth < 767 || isMobile)
                setStyle(mstyles);
            else
                setStyle(styles);
        
      },[isMobile, window.innerWidth]);

    return (

        <div className={style.login_container}>
            <div className={style.login_form_container}>
                <div className={style.left}>
                    <form className={style.form_container} onSubmit={handleSubmit}>
                        <img className={style.image} src="/Images/FlipSideLogo.png" alt="Avatar" />
                        <h1>Login to Your Account</h1>
                        <label htmlFor='email'></label>
                        <input
                            type="email"
                            id='email'
                            placeholder="Email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className={style.input}
                        />
                        <label htmlFor='password'></label>
                        <input
                            type="password"
                            id='password'
                            placeholder="Password"
                            name="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                            className={style.input}
                        />
                        {error && <div className={style.error_msg}>{error}</div>}
                        <button type="submit" className={style.green_btn}>
                            Sign In
                        </button>
                        <div className='persistCheck' >
                            <input
                                type="checkbox"
                                id="persist"
                                onChange={togglePersist}
                                checked={persist}
                            />
                            <label htmlFor='persist'>Trust this device</label>
                            <Link style={{display: "flex", margin: "10px 0px 10px 0px"}} to="/reset/email">Forgot Password?</Link>
                        </div>
                    </form>
                </div>
                <div className={style.right}>
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className={style.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>


    );

}
export default Login;