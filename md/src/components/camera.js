import React from "react";
import { useRef,useCallback,useState,useEffect} from "react";
import Webcam from "react-webcam";
import './camera.css'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import * as io from 'socket.io-client';

const videoConstraints = {
    width: 720,
    height: 600,
    facingMode: "user",
  };
const Camera = () =>{ 
    const webcamRef = useRef(null);
    const [IntervalID,setIntervalID] = useState(0);
    const [imgSrc, setImgSrc] = useState(null);
    const [camSwitch,setCamSwitch] = useState(false);
    const [ws,setws] = useState(null);

    const connectws = () =>{
      setws(io('http://127.0.0.1:3002'))
    }

    const initwebsocket = () =>{
      ws.on('connect',function(){
        ws.emit('connect_event','connected to server!');
      });
      ws.on('server_response',function(msg){
        console.log(msg);
      })
      ws.on('connect_error',function(err){
        console.log("error code "+ err)
      })
      ws.on('ret_masked_img',function(pkg){
        setImgSrc(pkg.img);
      })
    }

    useEffect(()=>{
      if(ws){
        console.log(ws);
        initwebsocket()
      }// eslint-disable-next-line
    },[ws])

    const capture = useCallback((props) => {//設定捕捉鏡頭
      if(webcamRef.current==null){
        clearInterval(IntervalID);
        return;
      }
        const imageSrc = webcamRef.current.getScreenshot();
        props.emit('mask_detect',{img:imageSrc})
        
      },// eslint-disable-next-line
      [webcamRef, setImgSrc]
    );

    const handleswitchChange = (event) =>{
      if(camSwitch){
        setCamSwitch(false);
      }else{
        setCamSwitch(true);
        connectws();
      }
    }

    useEffect(() => {
      if(camSwitch){
        setIntervalID( 
          setInterval(() => {
          capture(ws)   
          }, 120)
        );
      }else{
        if(ws!=null){
            ws.emit('client_discon','disconnect request');
            setws(null);
            console.log('ws!=null')
        }
        clearInterval(IntervalID);
        setImgSrc(null);
      }
        // eslint-disable-next-line
    }, [camSwitch]);
    
    const webcamcp = () =>{
      
      if(camSwitch){
        return <>
        {imgSrc && (// eslint-disable-next-line
            <img src={imgSrc} className = "webimg" /> ) }
            
          <Webcam
            audio={false}
            width={720}
            height={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored = {true}
            className='webcam'
            screenshotQuality = {0.25}
        />
        </>
      }else{
        return <div className = "NotShow">
          <Typography
            variant="h3"
            color = "white"
            className = "tocenter"
          >請切換下方按鈕開啟相機</Typography>
        </div>
      }
    }
    return <div className = "container">
        {webcamcp()}
        <FormGroup className = "camSwitchpos">
          <FormControlLabel control={<Switch/>} label = "Camera switch" onChange = {handleswitchChange}/>
        </FormGroup>
      </div>
}
export default Camera;
