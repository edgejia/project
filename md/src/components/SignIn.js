import { useState, useEffect, useContext, React} from "react";
import {Link,useLocation} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { socketcontext } from "../context/socket";
import { TokenContext} from "../context/token"


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const socket = useContext(socketcontext);
  const [ws, setws] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const tokenInfo = useContext(TokenContext);
  const location = useLocation();
  const connectws = () =>{
    setws(socket);
  }

  useEffect(() => {
    if(ws){
      initwebsocket();
      console.log('success connect!');
    }
    console.log(location)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  const initwebsocket = () => {
    ws.on('connect', function(){
      ws.emit('connet_event', 'connected to server');
    })
    
    ws.emit('signin_event', {email: email, password: password});
    ws.on('getToken', function(msg){
      tokenInfo.setTokenByDispatch({type: "SET", value: msg['token']});
    })
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    connectws();
  };

  const handleChange_email = (event) =>{
    setEmail(event.target.value);
  };

  const handleChange_password = (event) =>{
    setPassword(event.target.value);
  };

  const abc = (event) =>{
    console.log(tokenInfo.tokenContext);
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登入
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="電子郵件"
              name="signin_email"
              autoComplete="email" // eslint-disable-next-line
              inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }}   
              placeholder='請輸入電子郵件'
              autoFocus
              onChange={handleChange_email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="signin_password"
              label="密碼"
              type="password"
              autoComplete="current-password"
              onChange={handleChange_password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登入
            </Button>
            <Button onClick={abc}>abc</Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link 
                component = {Link}
                to = '/signup'>
                  {"尚未擁有帳戶嗎?從這裡註冊"}
                </Link>
              </Grid>
            </Grid>
          </Box>

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}