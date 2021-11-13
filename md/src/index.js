import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>    {/*react-router-dom v6改用這個 */}
      <Route path="/signin" element ={<SignIn/>}/>
      <Route path="/signup" element ={<SignUp/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
