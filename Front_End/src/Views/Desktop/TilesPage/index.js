import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Top Stock Option
        </Typography>
        <Typography variant="h5" component="div">
          TQQQ
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        ProShares UltraPro QQQ
        </Typography>
        <Typography variant="body2">
            TQQQ provides 3x leveraged exposure to a modified market-cap-weighted index tracking 100 of the largest non-financial firms listed on NASDAQ.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    
  );
}