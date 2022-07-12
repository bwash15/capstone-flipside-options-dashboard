import React, {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import "./styles.index.css"
export const TopStocks = () => {

    const [tile, setTile] = useState([
        {'stockName': 'TSLA', 'change': '+50%', 'stockPrice': '600', 'premium':'20', 'expDate':'2022-07-15'},
        {'stockName': 'TQQQ', 'change': '+43%', 'stockPrice': '25', 'premium':'3', 'expDate':'2022-07-15'},
        {'stockName': 'AAPL', 'change': '+38%', 'stockPrice': '125', 'premium':'5', 'expDate':'2022-07-15'},
        {'stockName': 'GME', 'change': '+30%', 'stockPrice': '212', 'premium':'12', 'expDate':'2022-07-15'},
        {'stockName': 'SPY', 'change': '+25%', 'stockPrice': '385', 'premium':'189', 'expDate':'2022-07-15'}
    ]);

  return (
    <div className="dailyMovers">
        <div className='dailyMoversText'>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Daily Movers
        </Typography> 
        </div>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
        <TableRow>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Change</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Premium</TableCell>
            <TableCell align="right">Expiration Date</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {tile.map((details, index) => (
            <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                {details.stockName}
            </TableCell>
            <TableCell align="right">{details.change}</TableCell>
            <TableCell align="right">${details.stockPrice}</TableCell>
            <TableCell align="right">${details.premium}</TableCell>
            <TableCell align="right">{details.expDate}</TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
</TableContainer>  
    </div>
              
  )
}
