import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
export default function OptionTile() {
  const [tableData, setTableData] = useState([
    {Ticker: "TSLA", strike: "850", premium: "5.20", exp: "5/14/2022"}
  ]);


  return (
<div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemText primary="TSLA" secondary="$850 $12.0 5/14/2022" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem align-items = "flex-start" >
          <ListItemText primary="AAPL" secondary="$150 $5.52 5/14/2022" />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemText primary="TQQQ" secondary="$30.14 $1.94 5/14/2022" />
        </ListItem>
      </List>
</div>
  );
}

