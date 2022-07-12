import React, {useState, useContext} from 'react'
import axios from '../../../../../api/axios'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    ButtonGroup
} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../../../../../hooks/useAuth';


export const AddOption = () => {
    const {auth} = useAuth();
    const [stockName, setStockName] = useState('');
    const [stockPrice, setStockPrice] = useState('50');
    const [expDate, setExpDate] = useState('');
    const [uuid, setUuid] = useState('');

    const [addContent, setAddContent] = useState(false);
    const navigate = useNavigate();


    const tileUUID = window.location.href.split("/")[5];
    const innerTileName = window.location.href.split("/")[4];

    const onSubmit = async (e) => {
        e.preventDefault();
         //push to database
         const url = "/optionTiles/addingOption";
       await axios.post(url, JSON.stringify({
            "optionUUID":uuid,
            "tileUUID": tileUUID,
            "stockName" :stockName,
            "innerTileName": innerTileName,
            "stockPrice": stockPrice,
            "expDate": expDate
        }),
        {headers: {"Authorization" :`Bearer ${auth.accessToken}`}});
        navigate(`/optionTiles/${innerTileName}/${tileUUID}`, {replace: true});
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
    const onRadioButtonClick =(radio) =>{
        setExpDate(radio);
    }
    const handleContent = (e) =>{
        e.preventDefault();
        setAddContent(true);
    }
  return (
      <div style={{maxWidth: "30rem", margin: "4rem auto"}}>

    <Form onSubmit={handleContent}>
        <FormGroup>
            <Label>Stock Name</Label>
            <Input type = "text" value = {stockName} onChange = {onStockNameChange} placeholder ="Stock Ticker"></Input>
        </FormGroup>
    </Form>

    {
        addContent && <Form onSubmit={onSubmit}>
        <FormGroup>
           
            <Label>Price</Label>
            <div>{stockPrice}</div>
            
            <Input type = "range" min = '50' max = '200' value = {stockPrice} onChange = {onStockPriceChange} placeholder ="Stock Price"></Input>
        </FormGroup>
        <div>
        <ButtonGroup size="lg">
            <Button color="primary" onClick={() => onRadioButtonClick('220715')}>7/15/2022</Button>
            <Button color="primary" onClick={() => onRadioButtonClick('220722')}>7/22/2022</Button>
            <Button color="primary" onClick={() => onRadioButtonClick('220729')}>7/29/2022</Button>
        </ButtonGroup>
        </div>
        <br></br>
        <Button type = "submit" onClick={changeUUID}>Submit</Button>
        <Button onClick = {() => setAddContent(false)} className='btn btn-danger ml-2'>Cancel</Button>
     
        

    </Form>
    }
      </div>

  )
}