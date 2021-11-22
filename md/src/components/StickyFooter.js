import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function StickyFooter() {
  return (
    <Box className='fitcontent'
      sx={{
        minHeight:'100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth:'320px',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,//padding y
          mt: 'auto',
          backgroundColor:'black',
          color:'white'
        }}
      >
        <Container minWidth="100%">
          <Typography variant="body1">
            MaskDetection
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}