import React, { useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth';

export const TileList = () => {
  //const { tiles, removeTile } = useContext(GlobalContext)

  const[tiles, setTiles] = useState([]);
  const {auth} = useAuth();

  //const {addTile} = useContext(GlobalContext);
  // const [tileName, setName] = useState('');
  // const [tileType, setType] = useState('');
  // const [uuid, setUuid] = useState('');
  // const getTiles = async(e) => {
  //     //e.preventDefault();
  //     const url = './userTiles/get';
  //     const result = await axios.post(url);
  //     console.log(result.data);
  //     console.log('number of items in tiles is ' + tiles.length)
  //     return result.data;
  //     //setTiles(result);
  // }

  useEffect(() => {
    console.log("tile page");
    console.log(auth.accessToken)
    const url = '/userTiles';
    //{headers: {'Authorization' : `Bearer ${auth.accessToken}`}}
    axios.get(url, {headers: {"Authorization" :`Bearer ${auth.accessToken}`}})
        .then((response) => {
          console.log("should have done post request");
          setTiles(response.data);
      })
    //setTiles(getTiles());
    console.log('number of items in tiles is now ' + tiles.length)
  }, []);

  const deleteTile = (props) =>{
    //get uuid
    //model.delete(uuid)
    const url = 'userTiles/delete';
    //axios.post(url,props.value);
  }

  return (
    <ListGroup className="mt-4">
    {tiles.map((tile, index) => (
      <div key = {index}>      
        <ListGroupItem className="d-flex">
          <strong>{tile.tileName}</strong>
          <strong>{tile.tileType}</strong>
          <div className='ms-auto'>
            <Link className="btn btn-warning mr-1" to={`/editTile/${tile.uuid}`}>Edit</Link>
            <Button color="danger" value = {tile.uuid} onClick={deleteTile}>Delete</Button>
          </div>
        </ListGroupItem> 
      </div>
    ))}
    </ListGroup>
  )
}
