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
import { GlobalContext } from '../../context/GlobalState'
import { v4 as uuidv4 } from "uuid";
import 'bootstrap/dist/css/bootstrap.min.css';



export const AddTile = () => {
    //const {addTile} = useContext(GlobalContext);
    const [tileName, setName] = useState('');
    const [tileType, setType] = useState('');
    const [uuid, setUuid] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
         //push to database
         const url = "/userTiles";
        await axios.post(url, JSON.stringify({
            "uuid": uuid,
            "tileName" :tileName,
            "tileType": tileType,
        }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        navigate('/tiles', {replace: true});
    }
    const changeUUID = () => {
        setUuid(uuidv4());
    }
    const onNameChange = (e) => {
        setName(e.target.value)
        
    }
    const onTypeChange = (e) => {
        setType(e.target.value)
    }
  return (
      <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
    <Form onSubmit={onSubmit}>
        <FormGroup>
            <Label>Name</Label>
            <Input type = "text" value = {tileName} onChange = {onNameChange} placeholder ="Tile Name"></Input>
            <Label>Type</Label>
            <Input type = "text" value = {tileType} onChange = {onTypeChange} placeholder ="Option Type"></Input>
        </FormGroup>
        <Button type = "submit" onClick={changeUUID}>Submit</Button>
        <Link to = "/tiles" className='btn btn-danger ml-2'>Cancel</Link>
    </Form>
      </div>

  )
}
