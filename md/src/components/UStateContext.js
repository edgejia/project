import {useState,useEffect , createContext} from "react";
import * as io from 'socket.io-client';
const UStateContex = createContext({
    ws:null,
    token:null,
    login:(em,pwd)=>{},
    logout:()=>{},
    signup:(em,un,pwd)=>{},
});
export const UStateContexProvider = (props)=>{
    const [ws,setws] = useState(null);
    const [token,settoken] = useState(null);
    const [email,setemail] = useState(null);
    const [password,setpassword] = useState(null);
    const [uname,setuname] = useState(null);
    const [ud,setud] = useState(false);//true代表signin,false代表signup

    const loginhandler = (em,pwd) =>{
        setemail(em);
        setpassword(pwd);
        if(ws==null){
            setud(true)
            setws(io('http://127.0.0.1:3002'));
        }else{
            ws.emit('signin_event',{email:em,password:pwd})
        }
    }
    function sessionsave (){
        sessionStorage.setItem('token',token);
    }
    const signuphandler = (em,un,pwd)=>{
        setemail(em);
        setuname(un);
        setpassword(pwd);
        if(ws==null){
            setud(false)
            setws(io('http://127.0.0.1:3002'));
        }else{
            ws.emit('signup_event',{email:em,username:un,password:pwd})
        }
    }

    const logouthandler = () =>{
        setws(null);
        settoken(null);
        sessionStorage.removeItem('token');
        alert('已登出');
        window.location.href = '/';
    }

    const initwebsocket = () => {
        ws.on('connect',function(){
            ws.emit('connect_event',"connect to server")
        })
        ws.on('server_response',function(msg){
            console.log('Server say',msg)
        })
        ws.on('getToken',function(msg){
            settoken(msg.token);
        })
        ws.on('signevent',function(msg){
            if(msg==='此email已被註冊'){
                alert('此email已被註冊，請更換email登入');
            }else if(msg==='此使用者名稱已被使用'){
                alert('此使用者名稱已被使用，請更換使用者名稱');
            }else if(msg==='註冊成功'){
                alert('註冊成功，請重新登入');
                window.location.href = '/';
            }
        })
    }

    useEffect(()=>{
        if(ws){
            console.log(ws);
            if(ud){
                loginhandler(email,password);
            }else{
                signuphandler(email,uname,password);
            }
            initwebsocket();
        }// eslint-disable-next-line
    },[ws])
    useEffect(()=>{
        if(token){
            sessionsave();
            window.location.href = '/';
        }// eslint-disable-next-line
    },[token])

    return(
        <UStateContex.Provider
            value = {{
                ws:ws,
                token:token,
                login:loginhandler,
                logout:logouthandler,
                signup:signuphandler
            }}
            >
                {props.children}
        </UStateContex.Provider>
    );
};
export default UStateContex; 