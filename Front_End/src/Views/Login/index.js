import { useState } from "react";
import { isMobile } from "react-device-detect";
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

	const setMobile = (e) => {
		if(isMobile){
			if(e === "login_container")
				return mobilestyles.login_container;
			if(e === "login_form_container")
				return mobilestyles.login_form_container;
			if(e === "left")
				return mobilestyles.left;
			if(e === "form_container")
				return mobilestyles.form_container;
			if(e === "image")
				return mobilestyles.image;
			if(e === "input")
				return mobilestyles.input;
			if(e === "error_msg")
				return mobilestyles.error_msg;
			if(e === "green_btn")
				return mobilestyles.green_btn;
			if(e === "right")
				return mobilestyles.right;
			if(e === "white_btn")
				return mobilestyles.white_btn;
		}
		if(!isMobile){
			if(e === "login_container")
				return styles.login_container;
			if(e === "login_form_container")
				return styles.login_form_container;
			if(e === "left")
				return styles.left;
			if(e === "form_container")
				return styles.form_container;
			if(e === "image")
				return styles.image;
			if(e === "input")
				return styles.input;
			if(e === "error_msg")
				return styles.error_msg;
			if(e === "green_btn")
				return styles.green_btn;
			if(e === "right")
				return styles.right;
			if(e === "white_btn")
				return styles.white_btn;
		}
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

	
	
		return (
				<div className={setMobile("login_container")}>
					<div className={setMobile("login_form_container")}>
						<div className={setMobile("left")}>
							<form className={setMobile("form_container")}>
								<img className= {setMobile("image")} src="/Images/FlipSideLogo.png" alt="Avatar"/>
								<h1>Login to Your Account</h1>
								<input
									type="email"
									placeholder="Email"
									name="email"
									onChange={handleChange}
									value={data.email}
									required
									className={setMobile("input")}
								/>
								<input
									type="password"
									placeholder="Password"
									name="password"
									onChange={handleChange}
									value={data.password}
									required
									className={setMobile("input")}
								/>
								{error && <div className={setMobile("error_msg")}>{error}</div>}
								<button className={setMobile("green_btn")} onClick={handleSubmit}>
									Sign In
								</button>
							</form>
						</div>
						<div className={setMobile("right")}>
							<h1>New Here ?</h1>
							<Link to="/signup">
								<button type="button" className={setMobile("white_btn")}>
									Sign Up
								</button>
							</Link>
						</div>
					</div>
				</div>
			
			
		);
	
}
