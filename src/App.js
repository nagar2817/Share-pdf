import React from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import Header from './comp/Header';
import Login from './comp/signIn';
import Register from './comp/signUp';
import Home from './comp/Home';
import PdfViewerComponent from './comp/PDFViewer';
import Comments from './comp/CommentSecion/Comments';

const  App = ()=> {
  return (
    <div>
      <Header/>
      <Routes>
        <Route excat path='/login' element={<Login />}/>
        <Route  path='/register' element={<Register />}/>
        <Route  path='/' element={<Home />}/>
        <Route path = "/:pdfName" element={<PdfViewerComponent/>} ></Route>
        <Route/>
      </Routes>
    </div>
   
  )
}

export default App;
