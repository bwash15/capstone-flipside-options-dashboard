import { useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import styles from "./styles.module.css";
import * as React from 'react';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {
    const [error, setError] = useState("");
    const [values, setValues] = React.useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
    });


    const handleChange = ({ currentTarget: input }) => {
        setValues({ ...values, [input.id]: input.value });
    };

    const resetPassword = ()=>{
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
        

    };
    
    return (
        <form className={styles.form}>
            <div className={styles.reset_form_container}>
                    <img className={styles.image} src="/Images/FlipSideLogo.png" alt="Avatar" />
                    <Typography margin={"10px 0px 0px 0px"}>New Password:</Typography>
                    <TextField sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} type="password" style={{ width: "250px" }} id="password" variant="outlined" onChange={handleChange} value={values.password} required />
                    <Typography margin={"10px 0px 0px 0px"}>Confirm Password:</Typography>
                    <TextField sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} type="password" style={{ width: "250px" }} id="confirmPassword" variant="outlined" onChange={handleChange} value={values.confirmPassword} required />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <Button style={{display: "flex", margin: "10px 0px 0px 0px"}} variant="contained" onClick={resetPassword}>Reset Password</Button>
                </div>
        </form>
    )
}
export default ResetPassword;