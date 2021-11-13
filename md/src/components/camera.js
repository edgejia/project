import React from "react";
import { useRef,useCallback,useState,useEffect} from "react";
import Webcam from "react-webcam";
import './camera.css'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const videoConstraints = {
    width: 720,
    height: 600,
    facingMode: "user"
  };
const Camera = () =>{ 
    const webcamRef = useRef(null);
    const [IntervalID,setIntervalID] = useState(0);
    const [imgSrc, setImgSrc] = useState(null);
    const [camSwitch,setCamSwitch] = useState(false);

    const capture = useCallback(() => {
      if(webcamRef.current==null){
        clearInterval(IntervalID);
        return;
      }
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
      },// eslint-disable-next-line
      [webcamRef, setImgSrc]
    );

    const handleswitchChange = (event) =>{
      if(camSwitch){
        setCamSwitch(false);
      }else{
        setCamSwitch(true);
      }
    }
    // eslint-disable-next-line
    {/*重複執行useEffect，會一直執行capture,500為延遲*/}

    useEffect(() => {
      if(camSwitch){
        setIntervalID( 
          setInterval(() => {
          capture()   
          }, 50)
        );
      }else{
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
        />
        </>
      }else{
        return <div className = "NotShow">

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
