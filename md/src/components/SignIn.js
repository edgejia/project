import { useRef, useCallback, useState, useEffect, useContext, React} from "react";
import {Link} from 'react-router-dom';
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
  const [msg, setmsg] = useState(null);

  const connectws = () =>{
    setws(socket);
  }

  useEffect(() => {
    if(ws){
      console.log('success connect!');
      initwebsocket();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);

  const initwebsocket = () => {
    ws.on('connect', function(){
      ws.emit('connet_event', 'connected to server');
    })
    sendMessage()
  }

  const sendMessage = () => {
    //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
    ws.emit('signin_event', msg)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('signin_email'),
      password: data.get('signin_password'),
    });
    setmsg({email: data.get('signin_email'), password: data.get('signin_password')});

    if(ws){
      sendMessage();
    }
    else{
      connectws();
    }
   };

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
              id="signin_email"
              label="電子郵件"
              name="signin_email"
              autoComplete="email" // eslint-disable-next-line
              inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }}   
              placeholder='請輸入電子郵件'
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="signin_password"
              label="密碼"
              type="password"
              id="signin_password"
              autoComplete="current-password"
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