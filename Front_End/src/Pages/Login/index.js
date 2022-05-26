import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';
import axios from '../../api/axios';
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./styles.module.css";


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
                error.loginResponse &&
                error.loginResponse.status >= 400 &&
                error.loginResponse.status <= 500
            ) {
                setError(error.loginResponse.data.message);
            }
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (

        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <img className={styles.image} src="/Images/FlipSideLogo.png" alt="Avatar" />
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
                            className={styles.input}
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
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
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
                        </div>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>


    );

}
export default Login;