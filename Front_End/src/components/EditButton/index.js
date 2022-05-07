import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from './style.module.css'

const NAME_REGEX = /^[A-z][A-z]{0,23}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const EditButton = () => {

    const [showEditButton, setEditButton] = React.useState(true);
    const [showAcceptButton, setAcceptButton] = React.useState(false);
    const [showCancelButton, setCancelButton] = React.useState(false);
    const [enabled, setEnabled] = React.useState(true);
    const [firstError, setFirstError] = React.useState("");
    const [lastError, setLastError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [user, setUser] = React.useState({
        firstName: "Dustin",
        lastName: "Huntzinger",
        email: "ts@ts.com"
    })
    const [newUser, setNewUser] = React.useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    const handleChange = ({ currentTarget: input }) => {
		setUser({ ...user, [input.id]: input.value });
	};

    function handleEdit (){
        setEditButton(prev => !prev);
        setAcceptButton(prev => !prev);
        setCancelButton(prev => !prev);
        setEnabled(prev => !prev);
        setNewUser(user);
    }

    function handleAccept (){
        if(!NAME_REGEX.test(user.firstName) || !NAME_REGEX.test(user.lastName) || !EMAIL_REGEX.test(user.email))
        {
            if(!NAME_REGEX.test(user.firstName))
                setFirstError("Invalid FirstName!");
            if(!NAME_REGEX.test(user.lastName))
                setLastError("Invalid LastName!");
            if(!EMAIL_REGEX.test(user.email))
                setEmailError("Invalid Email!");
            return;
        }
        else
        {
            setEditButton(prev => !prev);
            setAcceptButton(prev => !prev);
            setCancelButton(prev => !prev);
            setEnabled(prev => !prev);
            setNewUser(user);
            setFirstError("");
            setLastError("");
            setEmailError("");
        }
    }

    function handleCancel (){
        setEditButton(prev => !prev);
        setAcceptButton(prev => !prev);
        setCancelButton(prev => !prev);
        setEnabled(prev => !prev);
        setFirstError("");
        setLastError("");
        setEmailError("");
        setUser(newUser);
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
                    <Typography sx={{width: "100px"}}>FirstName:</Typography>
                </div>
                <div className={styles.one_input}>
                    <TextField style={{width: "250px"}} id="firstName" variant="outlined" disabled={enabled} onChange={handleChange} value={user.firstName} required/>
                </div>
                {firstError && <div className={styles.one_error}>{firstError}</div>}
                <div className={styles.two_label}>
                    <Typography sx={{width: "100px"}}>LastName:</Typography>
                </div>
                <div className={styles.two_input}>
                    <TextField style={{width: "250px"}} id="lastName" variant="outlined" disabled={enabled} onChange={handleChange} value={user.lastName} required/>
                </div>
                {lastError && <div className={styles.two_error}>{lastError}</div>}
                <div className={styles.three_label}>
                    <Typography sx={{width: "100px"}}>Email:</Typography>
                </div>
                <div className={styles.three_input}>
                    <TextField style={{width: "250px"}} id="email" variant="outlined" disabled={enabled} onChange={handleChange} value={user.email} required/>
                </div>
                {emailError && <div className={styles.three_error}>{emailError}</div>}
            </div>
        </div>
    );
}

export default EditButton;