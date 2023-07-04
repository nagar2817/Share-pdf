import { useContext, useState } from "react";
import { AppContext } from "../AuthContext";
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { auth ,createUserProfileDocument} from "../firebase-config";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    const {setCurrentUser} = useContext(AppContext);
    const [displayname,setDisplayname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    let navigate = useNavigate();

    const formSubmit = async (e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            alert("password does not match");
            return;
        }

        try{
            const {user} = await createUserWithEmailAndPassword(auth,email,password);
            setCurrentUser(user);
      console.log(user);
            
            sessionStorage.setItem('Auth Token', user.accessToken)
            await createUserProfileDocument(user,displayname);
            navigate('/')
            setConfirmPassword('');
            setDisplayname('');
            setPassword('');
            setEmail('');

          

        } catch(error){
            console.error(error);
        }
    }

    return (
        <div className="w-80 mx-auto mt-10 pt-5">
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography> 

      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg">
        <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Username" value={displayname} onChange={(e)=>setDisplayname(e.target.value)}  />
            <Input size="lg" label="Email" value={email}  onChange={(e)=>setEmail(e.target.value)}  />
            <Input type="password" size="lg" value={password} label="Password"  onChange={(e)=>setPassword(e.target.value)}  />
            <Input type="password" size="lg" value={confirmPassword} label="Confirm Password"  onChange={(e)=>setConfirmPassword(e.target.value)}  />
        </div>        
        <Button className="mt-6" fullWidth onClick={formSubmit}>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
    </div>
    )
}
export default Register;