import { useContext, useEffect } from "react";
import { AppContext } from "../AuthContext";
import PDFReader from "./PdfReader";
import Comments from './CommentSecion/Comments';

const PdfViewerComponent = ()=>{
    const {activeFile,currentUser,userProfile} = useContext(AppContext);
    console.log(activeFile);
    console.log(currentUser);

    useEffect(()=>{
      console.log(1);
      console.log(userProfile);
    },[])
    
    return (
      <div className="flex gap-4">
        <PDFReader />
        <Comments currentUserId={currentUser.uid} />
      </div>
    )
}

export default PdfViewerComponent;


