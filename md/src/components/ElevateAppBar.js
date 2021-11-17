import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';

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
            <Typography variant="h6" component="div" style={{flexGrow:1}}>{/*此行以下為左appbar左邊，以上為右邊 */}
              MaskDetection
            </Typography>
            <Button 
            variant = 'outline' 
            color="inherit" 
            startIcon={<AccountCircle/>}
            size="large"
            component = {Link}
            to = '/signin'
            >登入</Button>       {/*component = {}*/ }
            <IconButton
            variant = 'outline'
            color = 'inherit'
            >
              <MenuIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>

      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}