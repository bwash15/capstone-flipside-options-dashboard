import React, { useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'
import axios from '../../../../api/axios'
import useAuth from '../../../../hooks/useAuth';

export const NewsTileList = () => {
  const[tiles, setTiles] = useState([]);
  const {auth} = useAuth();

  const getTiles = () => {
    const url = '/userTiles/news';
    axios.get(url, {headers: {Authorization :`Bearer ${auth.accessToken}`}})
        .then((response) => {
          setTiles(response.data);
      })
  }

  useEffect(() => {
    getTiles();
  }, []);

  const deleteTile = async (val) =>{
    const url = '/userTiles/news';
    await axios.delete(url,
  {headers: {"Authorization" :`Bearer ${auth.accessToken}`},
    data: JSON.stringify({
      "uuid": val,
    })
  });
  //refreshes the page with the new information
  getTiles();
  }

  return (
    <ListGroup className="mt-4">
    {tiles.map((tile, index) => (
      <div key = {index}>      
        <ListGroupItem className="d-flex">
          <strong>{tile.tileName}</strong>
          <div className='ms-auto'>
            <Link className="btn btn-warning mr-1" to={`/newsTiles/${tile.uuid}`}>Edit</Link>
            <Button color="danger" onClick={() => deleteTile(tile.uuid)}>Delete</Button>
          </div>
        </ListGroupItem> 
      </div>
    ))}
    </ListGroup>
  )
}
