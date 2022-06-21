import React from "react";
// import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import useUser from '../../hooks/useUser';
const API_URL = ''


function Home() {
    const {user} = useUser();
    const [optionsData, setOptionsData] = useState([]);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    
    })


    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    const navProfile = () => {
        navigate("/profilePage")
    }

    return (<div>

    </div>);
}

export default Home;
