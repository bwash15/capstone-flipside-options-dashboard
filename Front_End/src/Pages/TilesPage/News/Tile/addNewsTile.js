import React, {useState, useContext} from 'react'
import axios from '../../../../api/axios'
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
import useAuth from '../../../../hooks/useAuth';
import useUser from '../../../../hooks/useUser';


export const AddNewsTile = () => {
    const {auth} = useAuth();
    const {user} = useUser();

    const [tileName, setName] = useState('');
    const [uuid, setUuid] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
         //push to database
         const url = "/userTiles/news";
        await axios.post(url, JSON.stringify({
            "userID": user,
            "uuid": uuid,
            "tileName" :tileName,
        }),
        {headers: {"Authorization" :`Bearer ${auth.accessToken}`}});
        navigate('/tiles', {replace: true});
    }
    const changeUUID = () => {
        setUuid(uuidv4());
    }
    const onNameChange = (e) => {
        setName(e.target.value)
    }
  return (
      <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
    <Form onSubmit={onSubmit}>
        <FormGroup>
            <Label>News Tile Name</Label>
            <Input type = "text" value = {tileName} onChange = {onNameChange} placeholder ="Tile Name"></Input>
        </FormGroup>
        <Button type = "submit" onClick={changeUUID}>Submit</Button>
        <Link to = "/tiles" className='btn btn-danger ml-2'>Cancel</Link>
    </Form>
      </div>

  )
}
