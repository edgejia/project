import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Link} from 'react-router-dom';
import UStateContex from './UStateContext';

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
  const USX = React.useContext(UStateContex);
  const handleLogout = ()=>{
    USX.logout();
  }


  const btnstat = ()=>{
    if(!USX.token){
      return <>
      <Button 
      variant = 'outline' 
      color="inherit" 
      startIcon={<AccountCircle/>}
      size="large"
      component = {Link}
      to = '/signup'
      >註冊</Button>
      <Button 
      variant = 'outline' 
      color="inherit" 
      startIcon={<AccountCircle/>}
      size="large"
      component = {Link}
      to = '/signin'
      >登入</Button>       {/*component = {}*/ }
      </>
    }else{
      return <>
      <Button 
      variant = 'outline' 
      color="inherit" 
      startIcon={<AccountCircle/>}
      size="large"
      onClick = {handleLogout}
      >登出</Button>
      </>
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" style={{flexGrow:1}}>{/*此行以下為左appbar左邊，以上為右邊 */}
              MaskDetection
            </Typography>
            
            {btnstat()}
          </Toolbar>
        </AppBar>

      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}