import { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {auth} from '../firebase-config'; 
import { AppContext } from "../AuthContext";
import { signOut ,getAuth} from "firebase/auth";

const Header = () =>{
  const {currentUser,userProfile,setCurrentUser} = useContext(AppContext);
  const [openNav, setOpenNav] = useState(false);
  let navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(1);
    });

    return () => unsubscribe();
  }, [auth]);
 

  const handleLogout = async ()=>{
    sessionStorage.removeItem('Auth Token');
    await signOut(auth);
    console.log(currentUser);
    window.location.reload(true) 
    navigate('/login');
  }

  return (
    <>
    <Navbar className="mx-auto max-w-full py-2 px-4 lg:px-8 lg:py-4">
      <div className="mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
        variant="h1"
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Share Meta 
        </Typography>
       

            { currentUser? (<Button variant="gradient" className="hidden lg:inline-block" onClick={handleLogout}>
                <span > Logout</span></Button>) :
               (<Button variant="gradient" className="hidden lg:inline-block"> 
            <span > <a href="/login"> Login</a></span> 
          </Button>) }
        
        
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {
            currentUser ? <Button variant="gradient" className="hidden lg:inline-block" size="sm" onClick={handleLogout}>
            <span > Logout</span></Button> 
          :
          <Button variant="gradient" className="hidden lg:inline-block" size="sm"> 
          <span > <a href="/login"> Login</a></span> 
        </Button> 
          } 
        </div>
      </Collapse>
    </Navbar>
    </>
  );
}

export default Header;