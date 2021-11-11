import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';

function ElevationScroll(props) {
  const { children} = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 20 : 0,
  });
}
export default function ElevateAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
          <Grid 
          container 
          justifyContent="space-between"
          >
            <Grid item>
            <Typography variant="h6" component="div">
              MaskDetection
            </Typography>
            </Grid>
            <Grid item>
                <Button 
                variant = 'outline' 
                color="inherit" 
                startIcon={<AccountCircle/>}
                size="large"
                >登入</Button>       {/*component = {}*/ }
            </Grid>
            
            </Grid>
          </Toolbar>
        </AppBar>

      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}