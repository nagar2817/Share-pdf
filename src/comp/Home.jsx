import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import ListComponent from './List';
import SearchBox from './SearchBox';
import UploadPdf from './UploadPdf';

import {
    List,
    Card,
    Typography
  } from "@material-tailwind/react";

const Home = ()=>{
    const {currentUser,pdfFiles} = useContext(AppContext);
    let navigate = useNavigate();

    useEffect(()=>{
        const authToken = sessionStorage.getItem('Auth Token');
        console.log("authtoken in home",authToken)
        authToken ? navigate('/') : navigate('/login');
    },[])
    return (
        <div>
     <div className='flex flex-col items-center'> 
      <Typography
        variant="h1"
          as="a"
          href="/"
          className="mx-auto cursor-pointer py-1.5 font-medium"
        >
          Welcome to the Share Meta App
        </Typography>
      <UploadPdf />
      <SearchBox />
      <div>
    
        <List>
          {pdfFiles.map(file => {
            return( 
            <ListComponent key={Math.random()} file={file} />
            
            )
})}
        </List>
      </div> 
</div>
    </div>
    )
}

export default Home;