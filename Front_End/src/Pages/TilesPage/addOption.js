import React, {useState, useContext} from 'react'
import axios from '../../api/axios'
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
import useAuth from '../../hooks/useAuth';


export const AddOption = () => {
    const {auth} = useAuth();
    //const {addTile} = useContext(GlobalContext);
    const [stockName, setStockName] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [premium, setPremium] = useState('');
    const [expDate, setExpDate] = useState('');
    const [uuid, setUuid] = useState('');
    const navigate = useNavigate();

    const tileUUID = window.location.href.split("/")[4];
    const onSubmit = async (e) => {
        e.preventDefault();
         //push to database
         const url = "/tiles/addingOption";
       await axios.post(url, JSON.stringify({
            "optionUUID":uuid,
            "tileUUID": tileUUID,
            "stockName" :stockName,
            "stockPrice": stockPrice,
            "expDate": expDate
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
    const onStockPriceChange = (e) => {
        setStockPrice(e.target.value)
    }
    const onPremiumChange = (e) => {
        setPremium(e.target.value)
    }
    const onExpDateChange = (e) => {
        setExpDate(e.target.value)
    }
  return (
      <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
    <Form onSubmit={onSubmit}>
        <FormGroup>
            <Label>Name</Label>
            <Input type = "text" value = {stockName} onChange = {onStockNameChange} placeholder ="Stock Ticker"></Input>
            <Label>Price</Label>
            <Input type = "text" value = {stockPrice} onChange = {onStockPriceChange} placeholder ="Stock Price"></Input>
            <Label>Expiration</Label>
            <Input type = "text" value = {expDate} onChange = {onExpDateChange} placeholder ="Exp Date"></Input>
        </FormGroup>
        <Button type = "submit" onClick={changeUUID}>Submit</Button>
        <Link to = "/tiles" className='btn btn-danger ml-2'>Cancel</Link>
    </Form>
      </div>

  )
}
