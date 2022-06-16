import React, {useState, useContext} from 'react'
import axios from '../../../../../api/axios'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../../../../../hooks/useAuth';


export const AddNews = () => {
    const {auth} = useAuth();
    const [stockName, setStockName] = useState('');
    const [uuid, setUuid] = useState('');
    const navigate = useNavigate();

    const tileUUID = window.location.href.split("/")[4];
    const onSubmit = async (e) => {
        e.preventDefault();
         //push to database
         const url = "newsTiles/addingNews";
       await axios.post(url, JSON.stringify({
            "newsUUID":uuid,
            "tileUUID": tileUUID,
            "stockName" :stockName,
        }),
        {headers: {"Authorization" :`Bearer ${auth.accessToken}`}});
        navigate('/tiles', {replace: true});
    }
    const changeUUID = () => {
        setUuid(uuidv4());
    }
    const onStockNameChange = (e) => {
        setStockName(e.target.value)
    }
  return (
      <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
    <Form onSubmit={onSubmit}>
        <FormGroup>
            <Label>Stock Name</Label>
            <Input type = "text" value = {stockName} onChange = {onStockNameChange} placeholder ="Stock Ticker"></Input>
        </FormGroup>
        <Button type = "submit" onClick={changeUUID}>Submit</Button>
        <Link to = "/tiles" className='btn btn-danger ml-2'>Cancel</Link>
    </Form>
      </div>

  )
}
