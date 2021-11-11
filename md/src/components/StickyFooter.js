import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        minHeight:'100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'black'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            MaskDetection Master
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}