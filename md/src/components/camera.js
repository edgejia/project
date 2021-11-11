import React from "react";
import { useRef,useCallback,useState,useEffect} from "react";
import Webcam from "react-webcam";
import './camera.css'
const videoConstraints = {
    width: 720,
    height: 600,
    facingMode: "user"
  };
const Camera = () =>{ 
    const webcamRef = useRef(null);// eslint-disable-next-line
    {/*useCallback和useState差不多，執行完會重新render畫面，useRef和useState差不多，但是不會觸發重新render*/}
    const [imgSrc, setImgSrc] = useState(null);
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      },
      [webcamRef, setImgSrc]// eslint-disable-next-line 
    //set usestate後會重新執行render畫面更新
    );
    
    
    // eslint-disable-next-line
    {/*重複執行useEffect，會一直執行capture,500為延遲*/}
    useEffect(() => {
      setInterval(() => {
        capture()   
      }, 500);// eslint-disable-next-line 
    }, []);
    
    return (// eslint-disable-next-line 
        <>{/*height=0用來確認webcam狀況 */}
        {imgSrc && (// eslint-disable-next-line
            <img src={imgSrc} className = "webimg" /> ) }
          <Webcam
            audio={false}
            height={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={720}
            videoConstraints={videoConstraints}
            mirrored = {true}
            className='webcam'
        />
        </>
      );
}
export default Camera;
