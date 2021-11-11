import React from "react";
import { useRef,useCallback,useState} from "react";
import Webcam from "react-webcam";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
const Camera = () =>{ 
    const webcamRef = useRef(null);// eslint-disable-next-line
    {/*useCallback和useState差不多，執行完會重新render畫面*/}
    const [imgSrc, setImgSrc] = useState(null);
    const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    },
    [webcamRef, setImgSrc]// eslint-disable-next-line 
    //set usestate後會重新執行render畫面更新
  );
      
    return (// eslint-disable-next-line 
        <>{/*height=0用來確認webcam狀況 */}
        {imgSrc && (// eslint-disable-next-line
            <img
            src={imgSrc}
            /> )}
          <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
            mirrored = {true}
        />
          <button onClick={capture}>Capture photo</button>
          
        </>
      );
}
export default Camera;
