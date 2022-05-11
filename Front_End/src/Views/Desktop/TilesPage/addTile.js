import React, {useState, useContext} from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
import {Link, useNavigate} from 'react-router-dom'
import { GlobalContext } from '../../../context/GlobalState'
import {v4 as uuid} from 'uuid'
import 'bootstrap/dist/css/bootstrap.min.css';
export const AddTile = () => {
    const {addTile} = useContext(GlobalContext);
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        const newTile = {
            id: uuid(),
            name
        }
        addTile(newTile);
        navigate('/tiles', {replace: true})
    }
    const onChange = (e) => {
        setName(e.target.value)
    }
  return (
      <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
    <Form onSubmit={onSubmit}>
        <FormGroup>
            <Label>Name</Label>
            <Input type = "text" value = {name} onChange = {onChange} placeholder ="Tile Name">
            </Input>
        </FormGroup>
        <Button type = "button">Submit</Button>
        <Link to = "/tiles" className='btn btn-danger ml-2'>Cancel</Link>
    </Form>
      </div>

  )
}
