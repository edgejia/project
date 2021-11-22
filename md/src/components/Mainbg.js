import './Mainbg.css';
import Camera from './camera';
import Intro from './Intro';
import UStateContex from './UStateContext';
import * as React from 'react';

const Mainbg = () => {
    const USX = React.useContext(UStateContex);
    const tkstat = ()=>{
        if(USX.token){
            return<>
                <Camera/>
            </>
        }else{
            return<>
                <Intro/>
            </>
        }
    }
    return <div className = "masthead">
        {tkstat()}
    </div>
}
export default Mainbg;