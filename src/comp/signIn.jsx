import {useContext, useState,useEffect} from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import {auth} from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login =  ()=> {
  const {setCurrentUser,currentUser} = useContext(AppContext)
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  let navigate = useNavigate();

  useEffect(()=>{
    const authToken = sessionStorage.getItem("Auth Token");
    if(currentUser && authToken){
      navigate('/');
    }
  },[])
  

  const handleLogin = async ()=>{
    try{
      const user =  await signInWithEmailAndPassword(auth,email,password);
      setCurrentUser("currentUser",user.user);
      console.log(user.user);
      navigate('/');
      setEmail('')
      setPassword('');
      sessionStorage.setItem('Auth Token', user._tokenResponse.refreshToken)
      toast.success('Successfull Login !',{
        position: toast.POSITION.TOP_CENTER
      });
    } catch(error){
      alert("please try again"); 
      console.error(error);
    }
    
    
  }


  return (
    <div className="w-80 mx-auto mt-10 pt-5">

    <Card color="transparent" shadow={false}> 
      <Typography variant="h4" color="blue-gray">
        Login 
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to Login.
      </Typography>
      <form className="mt-8 mb-2 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          <Input type="password" size="lg" value={password} label="Password" onChange={(e)=> setPassword(e.target.value)} />
        </div>
        
        <Button className="mt-6" fullWidth onClick={handleLogin} >
              Login
        </Button>
        <Button className="mt-6" fullWidth >
              Sign with Google
        </Button>
        <ToastContainer />
        <Typography color="gray" className="mt-4 text-center font-normal">
        Not have an account?{" "}
        <a
          href="/register"
          className="font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          Register
        </a>
      </Typography>
      </form>
    </Card>
    </div>
  )
}

export default Login;
