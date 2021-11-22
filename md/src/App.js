/*import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";*/
import StickyFooter from "./components/StickyFooter";
import ElevateAppBar from "./components/ElevateAppBar";
import Mainbg from "./components/Mainbg";
import UStateContex from './components/UStateContext';
import {useContext} from 'react';
function App() {
  const USX = useContext(UStateContex);
  if(sessionStorage.getItem('token')){
    USX.token = sessionStorage.getItem('token');
  }
  return (
    <div>
        <ElevateAppBar/>
        <Mainbg/>
        <StickyFooter/>
    </div>
  );
}

export default App;
