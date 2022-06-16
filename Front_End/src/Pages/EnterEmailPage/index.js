import { useState } from 'react'
import {useNavigate, Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import styles from "./styles.module.css";
import * as React from 'react';

const EMAIL_REGEX = /\S+@\S+\.\S+/;

const ResetPassword = () => {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [status, setStatus] =useState(false);
    const [updateMSG, setUpdateMSG] = useState("");
    const [error, setError] = useState("");
    const [values, setValues] = React.useState({
        email: ''
    });
    const resetToken = useParams();


    const handleChange = ({ currentTarget: input }) => {
        setValues({ ...values, [input.id]: input.value });
    };

    const checkEmail = async ()=>{
        if(!EMAIL_REGEX.test(values.email))
        {
            setError("Invalid Email!");
            return;
        }

        try{
            setStatus(prev => !prev);
            const url ="/reset/email";
            const res = await axios.post(url, JSON.stringify({
                "email": values.email
            }
            ),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setUpdateMSG(res.data.message);
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
        <form className={styles.form} onSubmit={checkEmail}>
            <div className={styles.reset_form_container}>
                    <img className={styles.image} src="/Images/FlipSideLogo.png" alt="Avatar" />
                    <Typography margin={"10px 0px 0px 0px"}>Email:</Typography>
                    <TextField sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} type="email" style={{ width: "250px" }} id="email" variant="outlined" onChange={handleChange} value={values.email} required />
                    {updateMSG && <div className={styles.update_msg}>{updateMSG}</div>}
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <Button style={{display: "flex", margin: "10px 0px 0px 0px"}} variant="contained" disabled={status} onClick={checkEmail}>Send Email</Button>
                    <Link style={{display: "flex", margin: "10px 0px 0px 0px"}} to="/login">Back To Login!</Link>
                </div>
        </form>
    )
}
export default ResetPassword;