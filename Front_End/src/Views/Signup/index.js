import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from  "./styles.module.css";


const NAME_REGEX = /^[A-z][A-z]{0,23}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Signup = () => {

	
	const userRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

	 useEffect(() => {
         userRef.current.focus();
     }, [])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstName));
    }, [firstName])
	
	useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])

	const setClassName=(e, h) => {
		if(e && h)
			return styles.goodInput;
		if(e && !h)
			return styles.badInput;
		else
			return styles.input;
	}


    const [errMsg, setErrMsg] = useState('');


	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://flipside-test-back-9n4ed.ondigitalocean.app/api/users";
			
			const { data: res } = await axios.post(url, data);
			navigate("/");
			console.log(res.message);
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
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							id="firstname"
							name="firstName"
							ref={userRef}
							onChange={handleChange}
							onInput={(e) => setFirstName(e.target.value)}
							value={data.firstName}
							required
							className={setClassName(firstName, validFirstName)}
							autofocus={true}
						/>
						<input
							type="text"
							placeholder="Last Name"
							id="lastname"
							name="lastName"
							onChange={handleChange}
							onInput={(e) => setLastName(e.target.value)}
							value={data.lastName}
							required
							className={setClassName(lastName, validLastName)}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							id="email"
							onChange={handleChange}
							value={data.email}
							required
							onInput={(e) => setEmail(e.target.value)}
							className={setClassName(email, validEmail)}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							id="password"
							onChange={handleChange}
							value={data.pwd}
							required
							onInput={(e) => setPwd(e.target.value)}
							className={setClassName(pwd, validPwd)}
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmpassword"
							id="confirmpassword"
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							className={setClassName(matchPwd, validMatch)}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
