import { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styles from './style.module.css';
import axios from '../../api/axios';
import { StepButton } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import * as React from 'react';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const URL = '/ProfilePage';

const NAME_REGEX = /^[A-z][A-z]{0,23}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PHONE_REGEX = /^[0-9]{9}$/;

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  
  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  });
  
  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

const EditButton = (props) => {

    const {auth} = useAuth();
    const [showEditButton, setEditButton] = React.useState(true);
    const [showAcceptButton, setAcceptButton] = React.useState(false);
    const [showCancelButton, setCancelButton] = React.useState(false);
    const [enabled, setEnabled] = React.useState(true);
    const [firstError, setFirstError] = React.useState("");
    const [lastError, setLastError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");
    const [phoneError, setPhoneError] = React.useState("");
    

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
                    "lastname": user.lastName
                }
                ),
                    
                    {headers: {"Authorization" :`Bearer ${auth.accessToken}`}}
                    
                );
                console.log("After");
                console.log(res.data.firstname);
                console.log(JSON.stringify(res?.data));
                console.log(res.data.firstname);
                setUser({
                    firstName: res.data.firstname,
                    lastName: res.data.lastname,
                    email: res.data.email
                });
                setNewUser(user);


            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setEmailError(error.response.data.message);
                    setUser(newUser);  
                }
            }
        }
    };

    const [user, setUser] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "N/A"
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
        setNewUser(user);
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
            setEditButton(prev => !prev);
            setAcceptButton(prev => !prev);
            setCancelButton(prev => !prev);
            setEnabled(prev => !prev);
            updateUserInfo();
        }
    }

    function handleCancel() {
        setEditButton(prev => !prev);
        setAcceptButton(prev => !prev);
        setCancelButton(prev => !prev);
        setEnabled(prev => !prev);
        setFirstError("");
        setLastError("");
        setEmailError("");
        setPhoneError("");
        setUser(newUser);
    }

    function HasPhone(){
        if(!user.phone)
            return "N/A";
        else
            return "";
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
                    <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} sx={{'& legend': { display: 'none' },'& fieldset': { top: 0 }}} style={{ width: "250px" }} id="phone" variant="outlined" disabled={enabled} onChange={handleChange} value={user.phone} required />
                </div>
                {phoneError && <div className={styles.four_error}>{phoneError}</div>}
                <div className={styles.password_label}>
                    <Button>Update Password</Button>
                </div>
            </div>
        </div>
    );
}

export default EditButton;