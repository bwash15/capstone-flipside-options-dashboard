import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import axios from '../api/axios';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { v4 as uuidv4 } from "uuid";
import { Card, CardBody, CardTitle, CardText, Row, Col, Button, Form } from 'reactstrap';

function SimpleDialog(props) {

    const[tiles, setTiles] = useState([]);
    const[optionNames, setOptionNames] = useState([]);
    const[show, setShow] = useState(false);
    const[selection, setSelection] = useState();
    const[innerTileName, setInnerTileName] = useState();
    const {auth} = useAuth();
    const {user} = useUser();


    const getOptionNames = () => {
        const url = '/userTiles/options/get';
        axios.post(url, JSON.stringify({
          "userID" : user
      }),
      {headers: {Authorization :`Bearer ${auth.accessToken}`}})
            .then((response) => {
              setOptionNames(response.data);
          })
      }

    useEffect(() => {
    getOptionNames();
    }, []);

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Tiles</DialogTitle>
      <List sx={{ pt: 0 }}>
        {optionNames.map((option) => (
          <ListItem button onClick={() => handleListItemClick(option.tileName)} key={option.tileName}>
            <ListItemText primary={option.tileName} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {

    const {auth} = useAuth();
    const {user} = useUser();
    const[tiles, setTiles] = useState([]);
    const[savedTiles, setSavedTiles] = useState([])
    const[savedTilesFromApi, setSavedTilesFromApi] = useState([])
    
    const getTiles = () => {
        const url = '/optionTiles/home';
        axios.post(url, JSON.stringify({
          "userID": user,
          "innerTileName": selectedValue
      }),{
          headers: {Authorization :`Bearer ${auth.accessToken}`},
      })
            .then((response) => {
              setTiles(response.data.tiles);
          })
      }

      const saveHomeTiles = (e) => {
        e.preventDefault();
        const url = '/homeTiles/post';
        console.log("entered save tiles and tile names is " + JSON.stringify(savedTiles))
        axios.post(url, JSON.stringify({
          "userID": user,
          "tileNames": savedTiles,
          "uuid": uuidv4()
      }),{
          headers: {Authorization :`Bearer ${auth.accessToken}`},
      })
            .then((response) => {
            console.log("saved tiles")
          })
      }
      const getHomeTiles = () => {
        const url = '/homeTiles/get';
        axios.post(url, JSON.stringify({
          "userID": user
      }),{
          headers: {Authorization :`Bearer ${auth.accessToken}`},
      })
            .then((response) => {
            let joined = savedTiles.concat(response.data.tileNames)
            console.log("joined inside of gethometiles is " + joined);
            setSavedTiles(joined);
            console.log("got tiles " + JSON.stringify(response.data.tileNames.tileName));
            console.log("got tiles " + JSON.stringify(response.data));
          })
      }
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleSaveButton = async (e) => {
    e.preventDefault();
    let joined = savedTiles.concat(selectedValue);
    console.log("joined array is " + joined);
    setSavedTiles(joined);
    console.log("should have saved?")
  }

  const isMounted = useRef(false);

  useEffect(() => {
    // if (isMounted.current) {
    //     console.log("called save")
    //     saveHomeTiles();
    //   } else {
    //     isMounted.current = true;
    //   }
   saveHomeTiles();
  }, [savedTiles])

  useEffect(() => {
    getTiles();
    //getHomeTiles();
  }, [open]);

  return (
    <div>
        <div>
            Saved tiles is {savedTilesFromApi.map((tile, index) => (
                <div key = {index}>
                    {tile.tileName}
                </div>     
            ))}
        </div>
        <div>
                {selectedValue}
                <Row xs={1} md={2} className="g-4">
                        <Col>
                        {tiles.map((tile, index) => (
                            <div key = {index}>
                                    <Card>
                                        <CardBody>
                                            <CardTitle>
                                            {tile.stockName}   
                                            </CardTitle>
                                            <CardText>
                                            Price: {tile.stockPrice}
                                            <br></br>
                                            Premium: {tile.premium}
                                            <br/>
                                            Expiration: {tile.expDate}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                            </div>    
                            ))}
                            </Col>
                </Row>
            <br />
            <Button variant="outlined" onClick={handleClickOpen}>
                Add
            </Button>
            {selectedValue != null && <Button variant="outlined"  onClick={handleSaveButton}>
                Save
            </Button>} 
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    </div>
    
  );
}
