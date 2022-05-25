import React, {useState, useContext} from 'react'
import axios from 'axios'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import {v4 as uuid} from 'uuid'
import 'bootstrap/dist/css/bootstrap.min.css';
export const AddTile = () => {
    const {addTile} = useContext(GlobalContext);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [uuid, setUuid] = useState('');
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
         //push to database
        const url = "/userTiles";
        const result = await axios.post(url, JSON.stringify({
            name,
            type,
            uuid
        }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false
        });

        // const newTile = {
        //     id: uuid(),
        //     name
        // }
        /*addTile(newTile);*/

       
        
        navigate('/tiles', {replace: true})
    }
    const onNameChange = (e) => {
        setName(e.target.value)
        setUuid('SOME UUID')
    }
    const onTypeChange = (e) => {
        setType(e.target.value)
    }
  return (
      <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
    <Form onSubmit={onSubmit}>
        <FormGroup>
            <Label>Name</Label>
            <Input type = "text" value = {name} onChange = {onNameChange} placeholder ="Tile Name"></Input>
            <Label>Type</Label>
            <Input type = "text" value = {type} onChange = {onTypeChange} placeholder ="Option Type"></Input>
        </FormGroup>
        <Button type = "submit">Submit</Button>
        <Link to = "/tiles" className='btn btn-danger ml-2'>Cancel</Link>
    </Form>
      </div>

  )
}
