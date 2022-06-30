import React from 'react'
import { useState, useEffect } from 'react';
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
import { Card, CardBody, CardTitle, CardText, Row, Col, Button, Form } from 'reactstrap';
import { set } from 'mongoose';


export const TileCard = () => {
    const[tiles, setTiles] = useState([]);
    const[optionNames, setOptionNames] = useState([]);
    const[show, setShow] = useState(false);
    const[selection, setSelection] = useState();
    const[innerTileName, setInnerTileName] = useState();
    const {auth} = useAuth();
    const {user} = useUser();

    const getTiles = () => {
        const url = '/optionTiles/home';
        axios.post(url, JSON.stringify({
          "userID": user,
          "innerTileName": selection
      }),{
          headers: {Authorization :`Bearer ${auth.accessToken}`},
      })
            .then((response) => {
              console.log("data " + JSON.stringify(response.data.tiles))
              setTiles(response.data.tiles);
              setInnerTileName(response.data.tileName)
          })
      }

      const getOptionNames = () => {
        const url = '/userTiles/options/get';
        axios.post(url, JSON.stringify({
          "userID" : user
      }),
      {headers: {Authorization :`Bearer ${auth.accessToken}`}})
            .then((response) => {
                console.log("option names are " + JSON.stringify(response.data))
              setOptionNames(response.data);
          })
      }
    
    const showTile = (event) => {
        setShow(true)
    }

    useEffect(() => {
        getTiles();
        getOptionNames();
    }, [innerTileName]);
    
    const handleChange = (event) => {
        setSelection(event.target.value)
        setInnerTileName(event.target.value)
    }


    return (
        <div>
            <Button type = "submit"  onClick={showTile}>Add Option Tile</Button>
            <select value = {selection} onChange = {handleChange}>
                        {optionNames.map((tile, index) => (
                            <option value = {tile.tileName}>{tile.tileName}</option>
                        ))}
            </select>
            {show ? 
            <div>
                {innerTileName}
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
            </div> : <div>Nothing</div>
            }
        </div>
    )
}
