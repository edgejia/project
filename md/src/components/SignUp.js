import * as React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UStateContex from './UStateContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const USX = React.useContext(UStateContex);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    USX.signup(data.get('signup_email'),data.get('signup_username'),data.get('signup_password'))
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>     {/*for img */}
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            註冊
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="signup_email"
                  label="電子郵件"
                  name="signup_email"
                  autoComplete="email" // eslint-disable-next-line
                  inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }}   
                  placeholder='請輸入電子郵件'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                required
                fullWidth
                name="signup_username"
                label="使用者名稱"
                type="username"
                id="signup_username"
                autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="signup_password"
                  label="密碼"
                  type="password"
                  id="signup_password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              註冊
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link 
                component = {Link}
                to = '/signin'>
                    已經擁有帳戶了嗎?從這裡登入
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}