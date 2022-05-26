import React, { useContext, useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'
import axios from '../../api/axios'


// export default class TileList extends React.Component{

//     state = {
//       tiles: []
//     }

//     componentDidMount = () => {
//       this.getTiles();
//     }

//     getTiles = () => {
//       axios.get('/userTiles').then((response) => {
//         const data= response.data;
//         this.setState({tiles: data})
//         console.log("Data has been recieved")
//       }).catch(() => {
//         console.log("no data recieved")
//       })
//     }

//     displayTiles(tiles){

//     }
//     render(){
//       return(
//         <div>Tile List Page</div>
//       );
//     }
// }


export const TileList = () => {
  //const { tiles, removeTile } = useContext(GlobalContext)

  const[tiles, setTiles] = useState([]);
  //const {addTile} = useContext(GlobalContext);
  // const [tileName, setName] = useState('');
  // const [tileType, setType] = useState('');
  // const [uuid, setUuid] = useState('');
  const getTiles = async(e) => {
      //e.preventDefault();
      const url = './userTiles';
      const result = await axios.get(url);
      console.log(result.data);
      console.log('number of items in tiles is ' + tiles.length)
      return result.data;
      //setTiles(result);
  }

  useEffect(() => {
    setTiles(tiles => [...tiles, getTiles()]);
    console.log('number of items in tiles is now ' + tiles.length)
  }, []);

  return (
    <ListGroup className="mt-4">
    {tiles.map((tile, index) => (
      <div key = {index}>      
        <ListGroupItem className="d-flex">
          <strong>{tile.tileName}</strong>
          <strong>{tile.tileType}</strong>
          <div className='ms-auto'>
            <Link className="btn btn-warning mr-1" to={`/editTile/${tile.uuid}`}>Edit</Link>
            <Button color="danger">Delete</Button>
          </div>
        </ListGroupItem> 
      </div>
    ))}
    </ListGroup>
  )
}
