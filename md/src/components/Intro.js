import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import './Intro.css';

export default function Intro() {
  return (
      <div className = 'tocenter'>
      <Typography color="white" align="center" variant="h2" marked="center">
        線上口罩偵測系統
      </Typography>
      <Typography
        color="white"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        登入系統以使用線上口罩偵測系統
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        component = {Link}
        to = '/signup'
        sx={{ minWidth: 200 }}
      >
          註冊
      </Button>
      </div>
  );
}