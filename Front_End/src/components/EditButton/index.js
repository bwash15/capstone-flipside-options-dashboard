import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styles from './style.module.css';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import * as React from 'react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';

const URL = '/ProfilePage';

const NAME_REGEX = /^[A-z][A-z]{0,23}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PHONE_REGEX = /^[0-9]{9}$/;


const EditButton = (props) => {

    const {auth} = useAuth();
    const [showEditButton, setEditButton] = React.useState(true);
    const [showAcceptButton, setAcceptButton] = React.useState(false);
    const [showCancelButton, setCancelButton] = React.useState(false);
    const [showPhoneText, setPhoneText] = React.useState(true);
    const [showPhoneEdit, setPhoneEdit] = React.useState(false);
    const [enabled, setEnabled] = React.useState(true);
    const [firstError, setFirstError] = React.useState("");
    const [lastError, setLastError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [phoneError, setPhoneError] = React.useState("");
    const [phoneNum, setPhoneNum] = useState();
    const [newPhoneNum, setNewPhoneNum] = useState();

    

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        try {
            console.log("START");
            const res = await axios.post(URL, JSON.stringify({
                "email": props.value
            }
            ),
                {headers: {"Authorization" :`Bearer ${auth.accessToken}`}}
            );
            console.log("After");
            console.log(JSON.stringify(res?.data));
            console.log(res.data.firstname);
            setPhoneNum(res.data.phonenumber);
            setUser({
                firstName: res.data.firstname,
                lastName: res.data.lastname,
                email: res.data.email
            });

        } catch (error) {
            if (
                error.loginResponse &&
                error.loginResponse.status >= 400 &&
                error.loginResponse.status >= 500
            ) {
                console.log(error.loginResponse.data.message);
            }
        }
    }

    const updateUserInfo = async() =>{
        if(newUser && user)
        {
            try {
                console.log("START");
                const res = await axios.put(URL, JSON.stringify({
                    "oldEmail": props.value,
                    "email": user.email,
                    "firstname": user.firstName,
                    "lastname": user.lastName,
                    "phonenumber": phoneNum
                }
                ),
                    
                    {headers: {"Authorization" :`Bearer ${auth.accessToken}`}}
                    
                );
                console.log("After");
                console.log(res.data.firstname);
                console.log(JSON.stringify(res?.data));
                console.log(res.data.firstname);
                setPhoneNum(res.data.phonenumber);
                setUser({
                    firstName: res.data.firstname,
                    lastName: res.data.lastname,
                    email: res.data.email
                });
                setNewPhoneNum(phoneNum);
                setNewUser(user);
                console.log(phoneNum);


            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setEmailError(error.response.data.message);
                    setUser(newUser); 
                    setPhoneNum(newPhoneNum); 
                }
            }
        }
    };

    const [user, setUser] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    })
    const [newUser, setNewUser] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setUser({ ...user, [input.id]: input.value });
    };

    function handleEdit() {
        setEditButton(prev => !prev);
        setAcceptButton(prev => !prev);
        setCancelButton(prev => !prev);
        setEnabled(prev => !prev);
        setPhoneText(prev => !prev);
        setPhoneEdit(prev => !prev);
        console.log(phoneNum);
        setNewUser(user);
        if(phoneNum === "N/A")
            setPhoneNum("");
        setNewPhoneNum(phoneNum);
    }

    function handleAccept() {
        if (!NAME_REGEX.test(user.firstName) || !NAME_REGEX.test(user.lastName) || !EMAIL_REGEX.test(user.email)) {
            if (!NAME_REGEX.test(user.firstName))
                setFirstError("Invalid FirstName!");
            if (!NAME_REGEX.test(user.lastName))
                setLastError("Invalid LastName!");
            if (!EMAIL_REGEX.test(user.email))
                setEmailError("Invalid Email!");
            if (!PHONE_REGEX.test(user.phone) && user.phone != "N/A")
                setPhoneError("Invalid Phone Number!");
            return;
        }
        else {
            if(phoneNum === "")
                setPhoneNum("N/A");
            updateUserInfo();
            setEditButton(prev => !prev);
            setAcceptButton(prev => !prev);
            setCancelButton(prev => !prev);
            setEnabled(prev => !prev);
            setPhoneText(prev => !prev);
            setPhoneEdit(prev => !prev);
        }
    }

    function handleCancel() {
        setEditButton(prev => !prev);
        setAcceptButton(prev => !prev);
        setCancelButton(prev => !prev);
        setEnabled(prev => !prev);
        setPhoneText(prev => !prev);
        setPhoneEdit(prev => !prev);
        setFirstError("");
        setLastError("");
        setEmailError("");
        setPhoneError("");
        setUser(newUser);
        setPhoneNum(newPhoneNum);
    }

    const handleUpdatePassword = async () =>{
        try {
            const url = "/ProfilePage/email"
            await axios.post(url, JSON.stringify({
                "email": user.email,
            }
            ),
                
                {headers: {"Authorization" :`Bearer ${auth.accessToken}`}}
                
            );
            console.log("After");


        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setEmailError(error.response.data.message);
                console.log(error)
            }
        }
    }
    return (
        <div>
            <Stack justifyContent={"right"} spacing={2} direction="row" margin={"10px"}>
                {showEditButton && <Button id="edit" variant="contained" onClick={handleEdit}>Edit</Button>}
                {showAcceptButton && <Button id="accept" variant="contained" color="success" onClick={handleAccept}>Accept</Button>}
                {showCancelButton && <Button id="cancel" variant="contained" color="error" onClick={handleCancel}>Cancel</Button>}
            </Stack>
            <div class={styles.wrapper}>
                <div className={styles.one_label}>
                    <Typography sx={{ width: "100px" }}>FirstName:</Typography>
                </div>
                <div className={styles.one_input}>
                    <TextField sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} style={{ width: "250px", heigth: "70px" }} id="firstName" variant="outlined" disabled={enabled} onChange={handleChange} value={user.firstName} required />
                </div>
                {firstError && <div className={styles.one_error}>{firstError}</div>}
                <div className={styles.two_label}>
                    <Typography sx={{ width: "100px" }}>LastName:</Typography>
                </div>
                <div className={styles.two_input}>
                    <TextField sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} style={{ width: "250px" }} id="lastName" variant="outlined" disabled={enabled} onChange={handleChange} value={user.lastName} required />
                </div>
                {lastError && <div className={styles.two_error}>{lastError}</div>}
                <div className={styles.three_label}>
                    <Typography sx={{ width: "100px" }}>Email:</Typography>
                </div>
                <div className={styles.three_input}>
                    <TextField sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} style={{ width: "250px" }} id="email" variant="outlined" disabled={enabled} onChange={handleChange} value={user.email} required />
                </div>
                {emailError && <div className={styles.three_error}>{emailError}</div>}
                <div className={styles.four_label}>
                    <Typography sx={{ width: "100px" }}>Phone #:</Typography>
                </div>
                <div className={styles.four_input}>
                {showPhoneText && <TextField sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} style={{ width: "250px" }} variant="outlined" disabled={enabled} onChange={handleChange} value={phoneNum} required />}
                {showPhoneEdit && <PhoneInput 
                     className={styles.four_phone}
                    defaultCountry="US"
                    id="phone"
                    value={phoneNum}
                    disabled={enabled}
                    onChange={setPhoneNum} />}
                </div>
                {phoneError && <div className={styles.four_error}>{phoneError}</div>}
                <div className={styles.password_label}>
                    <Button onClick={handleUpdatePassword}>Update Password</Button>
                </div>
            </div>
        </div>
    );
}

export default EditButton;