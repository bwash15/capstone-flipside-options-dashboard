import React, {useContext, useState, useEffect} from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
import {Link, useNavigate, useParams} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
//import { GlobalContext } from '../../context/GlobalState'
export const EditTile = (props) => {
    //const {tiles, editTile} = useContext(GlobalContext);
    const [selectedTile, setSelectedTile] = useState({
        id: '',
        name: ''
    });
    const navigate = useNavigate();

    const currentTileId = useParams();
    //useEffect(() => {
        //const tileId = currentTileId.id;
        //const selectedTile = tiles.find(tile => tile.id === tileId);
        //setSelectedTile(selectedTile)
   // }, [currentTileId, tiles])
    const onSubmit = (e) => {
        e.preventDefault();
        //editTile(selectedTile);
        navigate('/tiles', {replace: true})
    }
    const onChange = (e) => {
        setSelectedTile({...selectedTile, [e.target.name]: e.target.value})
    }


  return (
    <div style={{maxWidth: "30rem", margin: "4rem auto"}}>
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <Label>Name</Label>
                <Input type = "text" value = {selectedTile.name} onChange = {onChange} name = "name" placeholder ="Edit Tile" required>
                </Input>
            </FormGroup>
            <Button onSubmit = {onSubmit} type = "submit">Submit</Button>
            <Link to = "/tiles" className='btn btn-danger ml-2'>Cancel</Link>
        </Form>
      </div>
  )
}
