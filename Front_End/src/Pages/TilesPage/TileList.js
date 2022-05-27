import React, { useContext, useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/GlobalState'
import {
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap'
import axios from '../../api/axios'
import { model } from 'mongoose'


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
    const url = './userTiles/get';
    axios.post(url)
      .then((response) => {
        setTiles(response.data);
      })
    //setTiles(getTiles());
    console.log('number of items in tiles is now ' + tiles.length)
  }, []);

  const deleteTile = (props) =>{
    //get uuid
    //model.delete(uuid)
    const url = 'userTiles/delete';
    axios.post(url,props.value);
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
