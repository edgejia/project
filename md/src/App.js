import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import StickyFooter from "./components/StickyFooter";
import ElevateAppBar from "./components/ElevateAppBar";
import Camera from "./components/camera";
import Mainbg from "./components/Mainbg";
import {socket, socketcontext} from "./context/socket";
import {TokenContext} from "./context/token";
import {useReducer, } from 'react';

function App() {
  function reducer(state, action){
    switch (action.type){
      case 'SET':
        return state = action.value;

      case 'REFRESH':
        return state = action.value;

      default:
        throw new Error();
    }
  }

  const [tokenState, tokenDispatch] = useReducer(reducer, null);

  return (
    <div>
      <socketcontext.Provider value={socket}>
        <TokenContext.Provider value={{
          tokenContext: tokenState,
          setTokenByDispatch: tokenDispatch
        }}>

          <ElevateAppBar/>
          {/*<Camera/>*/}
          <Mainbg/>
          <SignIn/>
          <StickyFooter/>

        </TokenContext.Provider>

        
      </socketcontext.Provider> 
    </div>
  );
}

export default App;
/***/