import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import StickyFooter from "./components/StickyFooter";
import ElevateAppBar from "./components/ElevateAppBar";
import Camera from "./components/camera";
import Mainbg from "./components/Mainbg";
import {socket, socketcontext} from "./context/socket";

function App() {
  return (
    <div>
      <socketcontext.Provider value={socket}>
        <ElevateAppBar/>
        <Camera/>
        <Mainbg/>
        <SignIn/>
        <SignUp/>
        <StickyFooter/>
      </socketcontext.Provider> 
    </div>
  );
}

export default App;
/***/