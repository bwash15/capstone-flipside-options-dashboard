import { useState, useContext } from 'react'
import AuthContext from '../../../context/AuthProvider';
import axios from "../../../api/axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
const LOGIN_URL = '/auth';

export default function Login() {
	const { setAuth } = useContext(AuthContext);
	// const [data, setData] = useState({ email: "", password: "" });
	const [email, setEmail] = useState('');
	const [password, setPwd] = useState('');

	// success page will be replaced with router to routed page on successful login
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			//const url = "http://localhost:3600/auth";
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
			setEmail('');
			setPwd('');
			setSuccess(true);

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


	// const navProfile = () => {
	// 	navigate("/main")
	// }

	return (
		<>
			{success ? (
				<section>
					<h1>Login Succesful!</h1>
					<br />
					<Navigate to="/main" replace={true}></Navigate>
				</section>
			) : (
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
			)}
		</>
	);

}
