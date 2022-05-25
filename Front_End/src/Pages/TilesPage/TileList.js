import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'



export const TileList = () => {
  const { tiles, removeTile } = useContext(GlobalContext)
  //const {addTile} = useContext(GlobalContext);
  // const [tileName, setName] = useState('');
  // const [tileType, setType] = useState('');
  // const [uuid, setUuid] = useState('');

  return (
    <ListGroup className="mt-4">
    {tiles.map(tile => (
      <ListGroupItem className="d-flex">
        <strong>{tile.name}</strong>
        <div className='ms-auto'>
          <Link className="btn btn-warning mr-1" to={`/editTile/${tile.id}`}>Edit</Link>
          <Button onClick={() => removeTile(tile.id)} color="danger">Delete</Button>
        </div>
      </ListGroupItem>
    ))}
  </ListGroup>

  )
}
