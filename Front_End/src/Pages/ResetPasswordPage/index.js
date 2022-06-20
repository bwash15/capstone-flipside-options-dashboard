import { useState } from 'react'
import {useNavigate, Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import styles from "./styles.module.css";
import * as React from 'react';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [status, setStatus] =useState(false);
    const [updateMSG, setUpdateMSG] = useState("");
    const [error, setError] = useState("");
    const [values, setValues] = React.useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
    });
    const resetToken = useParams();


    const handleChange = ({ currentTarget: input }) => {
        setValues({ ...values, [input.id]: input.value });
    };

    const resetPassword = async ()=>{
        setError("");
        if(!PWD_REGEX.test(values.password))
        {
            setError("Password does not meet Criteria!");
            return;
        }
        if(values.password != values.confirmPassword)
        {
            setError("Passwords do not Match!");
            return;
        }

        try{
            setStatus(prev => !prev);
            const url ="/reset";
            const res = await axios.post(url, JSON.stringify({
                "password": values.password,
                "resetToken": resetToken
            }
            ),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setUpdateMSG(res.data.message);
            setTimeout(function(){ navigate('/login'); },2000);
        }
        catch(error)
        {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setStatus(prev => !prev);
            }
        }
        

    };

    

    return (
        <form className={styles.form}>
            <div className={styles.reset_form_container}>
                    <img className={styles.image} src="/Images/FlipSideLogo.png" alt="Avatar" />
                    <Typography margin={"10px 0px 0px 0px"}>New Password:</Typography>
                    <TextField sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} type="password" style={{ width: "250px" }} id="password" variant="outlined" onChange={handleChange} value={values.password} required />
                    <Typography margin={"10px 0px 0px 0px"}>Confirm Password:</Typography>
                    <TextField sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} type="password" style={{ width: "250px" }} id="confirmPassword" variant="outlined" onChange={handleChange} value={values.confirmPassword} required />
                    {updateMSG && <div className={styles.update_msg}>{updateMSG}</div>}
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <Button style={{display: "flex", margin: "10px 0px 0px 0px"}} variant="contained" disabled={status} onClick={resetPassword}>Reset Password</Button>
                </div>
        </form>
    )
}
export default ResetPassword;