import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { Link, Navigate } from "react-router-dom";
import styles from "./styles.module.css";

const NAME_REGEX = /^[A-z][A-z]{0,23}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const REGISTER_URL = './signup'

const Signup = () => {


    const userRef = useRef();
    const [success, setSuccess] = useState(false);
    const [firstname, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);

    const [lastname, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(firstname));
    }, [firstname])

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(lastname));
    }, [lastname])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])


    const setClassName = (e, h) => {
        if (e && h)
            return styles.goodInput;
        if (e && !h)
            return styles.badInput;
        else
            return styles.input;
    }


    // const [data, setData] = useState({
    // 	firstname: "",
    // 	lastname: "",
    // 	email: "",
    // 	password: "",
    // });
    const [error, setError] = useState("");
    //const navigate = useNavigate();

    // const handleChange = ({ currentTarget: input }) => {
    // 	setData({ ...data, [input.name]: input.value });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "/register";
            const result = await axios.post(url, JSON.stringify({
                email,
                firstname,
                lastname,
                password
            }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

            setFirstName("");
            setLastName("");
            setEmail('');
            setPwd('');
            setMatchPwd("");
            setSuccess(true);
            console.log(result.data);
            console.log(JSON.stringify(result));
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
        <>
            {success ? (
                <section>
                    <p>
                        <Navigate to="/" replace={true}></Navigate>
                    </p>
                </section>
            ) : (

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
                                <label htmlFor="firstname"></label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    placeholder="Firstname"
                                    ref={userRef}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstname}
                                    required
                                    className={setClassName(firstname, validFirstName)}
                                    autoFocus={true}
                                />
                                <label htmlFor="lastname"></label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Lastname"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastname}
                                    required
                                    className={setClassName(lastname, validLastName)}
                                />
                                <label htmlFor="email"></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    className={setClassName(email, validEmail)}
                                />
                                <label htmlFor="password"></label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={password}
                                    required
                                    className={setClassName(password, validPwd)}
                                />
                                <label htmlFor="confirmpassword"></label>
                                <input
                                    type="password"
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    placeholder="Confirm Password"
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
            )}
        </>
    )
};

export default Signup;