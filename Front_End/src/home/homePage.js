import React, {useEffect, useState} from'react'
import axios from "../api/axios"
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'

import { NewsPopUp } from "../components/PopUp/newsPopUp"

export const HomePage = () => {
  
    const {auth} = useAuth();
    const {user} = useUser();
    const [optionTiles, setOptionTiles] = useState([]);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

  const getOptionTiles = () => {
    const url = '/userTiles/options/get';
    axios.post(url, JSON.stringify({
      "userID": user,
  }),{
      headers: {Authorization :`Bearer ${auth.accessToken}`},
  })
        .then((response) => {
          setOptionTiles(response.data);
      })
  }

  useEffect(() => {
    getOptionTiles();
  }, []);

    return (
    <div>
        <div className='home'>
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Options
          </Typography> */}
            <List dense={dense}>
                <ListItem>
                     <div>
                {optionTiles.map((tile, index) => (
                <div key = {index}>
                    <br></br>
                    <h2>{tile.tileName}</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Stock</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Premium</TableCell>
                                <TableCell align="right">Expiration Date</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {tile.tiles.map((details, index) => (
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {details.stockName}
                                </TableCell>
                                <TableCell align="right">${details.stockPrice}</TableCell>
                                <TableCell align="right">${details.premium}</TableCell>
                                <TableCell align="right">{details.expDate}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>    
                </div>    
                ))}
            </div>  
                </ListItem>
            </List>
          
        </Grid>
      </Grid>
    </Box>
        </div>
    </div>
  );
}
