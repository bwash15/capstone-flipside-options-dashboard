import React, { useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth';

export const InnerTileList = () => {
  const[tiles, setTiles] = useState([]);
  const {auth} = useAuth();
  const tileUUID = window.location.href.split("/")[4];

  const getTiles = () => {
    const url = '/tiles';
    axios.post(url, JSON.stringify({
      "uuid": tileUUID,
  }),{
      headers: {Authorization :`Bearer ${auth.accessToken}`},
  })
        .then((response) => {
          console.log("response is " + JSON.stringify(response.data.tiles));
          setTiles(response.data.tiles);
      })
  }

  useEffect(() => {
    getTiles();
    console.log("the tiles array is set to " + JSON.stringify(tiles))
    //console.log("the non stringy" + (tiles.tiles))
  }, []);

  const deleteTile = async (val) =>{
    const url = '/tiles';
    await axios.delete(url,
  {headers: {"Authorization" :`Bearer ${auth.accessToken}`},
    data: JSON.stringify({
      "tileUUID": tileUUID,
      "optionUUID": val,
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
          <strong>{tile.stockName}</strong>
          <strong>-</strong>
          <strong>{tile.stockPrice}</strong>
          <strong>-</strong>
          <strong>{tile.premium}</strong>
          <strong>-</strong>
          <strong>{tile.expDate}</strong>
          <div className='ms-auto'>
            <Link className="btn btn-warning mr-1" to={`/editTile/${tile.uuid}`}>Edit</Link>
            <Button color="danger" onClick={() => deleteTile(tile.uuid)}>Delete</Button>
          </div>
        </ListGroupItem> 
      </div>
    ))}
    </ListGroup>
  )
}
