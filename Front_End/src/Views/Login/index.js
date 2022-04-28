import { useState, useEffect } from "react";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import mobilestyles from "./mobilestyle.module.css";

export default function Login() {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			console.log(res.user);
			localStorage.setItem("user", JSON.stringify({
				firstName: res.user.firstName,
				lastName: res.user.lastName,
				email: res.user.email,
				_id:  res.user._id
			}) )
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	
	if(isMobile){

		function getDimesions(){
			const {innerWidth: width, innerHeight: height} = window;
			return{
				width,
				height,
			}
		}
		return (
			
			
				<div className={mobilestyles.login_container}>
					<div className={mobilestyles.login_form_container}>
						<div className={mobilestyles.left}>
							<form className={mobilestyles.form_container}>
								<img className= {mobilestyles.image} src="/Images/FlipSideLogo.png" alt="Avatar"/>
								<h1>Login to Your Account</h1>
								<input
									type="email"
									placeholder="Email"
									name="email"
									onChange={handleChange}
									value={data.email}
									required
									className={mobilestyles.input}
								/>
								<input
									type="password"
									placeholder="Password"
									name="password"
									onChange={handleChange}
									value={data.password}
									required
									className={mobilestyles.input}
								/>
								{error && <div className={mobilestyles.error_msg}>{error}</div>}
								<button className={mobilestyles.green_btn} onTouchStart={handleSubmit}>
									Sign In
								</button>
							</form>
						</div>
						<div className={mobilestyles.right}>
							<h1>New Here ?</h1>
							<Link to="/signup">
								<button type="button" className={mobilestyles.white_btn}>
									Sign Up
								</button>
							</Link>
						</div>
					</div>
				</div>
			
			
		);
	}
	else{

		return (
			
				<div className={styles.login_container}>
					<div className={styles.login_form_container}>
						<div className={styles.left}>
							<form className={styles.form_container} onSubmit={handleSubmit}>
								<img className= {styles.image} src="/Images/FlipSideLogo.png" alt="Avatar"/>
								<h1>Login to Your Account</h1>
								<input
									type="email"
									placeholder="Email"
									name="email"
									onChange={handleChange}
									value={data.email}
									required
									className={styles.input}
								/>
								<input
									type="password"
									placeholder="Password"
									name="password"
									onChange={handleChange}
									value={data.password}
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
			
		);
	}
}
