import {
    ListItem,
    ListItemSuffix,
    IconButton,
    Button
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {db} from '../firebase-config'
import { doc,deleteDoc ,collection,updateDoc,getDocs,query,getDoc} from "firebase/firestore";
import { ref, getStorage, getDownloadURL,deleteObject } from "firebase/storage";
import { storage } from "../firebase-config";
import { useContext,useState } from "react";
import { AppContext } from "../AuthContext";
import Dropdown from "./Dropdown";


const ListComponent = ({file})=>{
    const {currentUser,setPdfFiles,pdfFiles,usersIds,setActiveFile,userProfile,otherUsers}= useContext(AppContext);
    let navigate = useNavigate();
    const handleDelete= async ()=>{
        const storage = getStorage();
        const userId = currentUser.uid;
        const fileRef = ref(storage,`users/${userId}/${file.name}`);
        // Delete the file
        deleteObject(fileRef).then(() => {
        // File deleted successfully
        console.log('delte succefully');
        }).catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error);
        });

        await deleteDoc(doc(db,"datas",userId,"pdfs",file.name))
        const new_files = pdfFiles.filter(res => res.name !== file.name);
        setPdfFiles(new_files);

    }

    const viewhandler = ()=>{
        // console.log(file);
        setActiveFile(file);
        navigate(`/${file.name}`); 
    }

    const handleSharePdf = async (selectedusers) => {
        const userId = userProfile.id;
        try {
          const pdfRef = doc(db, "datas",userId,'pdfs',file.name);
  
          const pdfSnapshot = await getDoc(pdfRef);
          const pdfData = pdfSnapshot.data();
          const sharedWith = pdfData && pdfData.sharedWith ? pdfData.sharedWith : [];
      
          selectedusers.forEach((user) => {
            if (!sharedWith.includes(user)) {
              sharedWith.push(user);
            }
          });
      
          await updateDoc(pdfRef, { sharedWith });
  
          console.log('PDF shared successfully!');
        } catch (error) {
          console.error('Error sharing PDF:', error);
        }
      };

    return (   
    <div className="mx-auto mt-10 mb-10 pt-5 flex">
        <ListItem ripple={false} className="py-1 mr-10 pr-1 pl-4 w-80">
         {file.name} 
        </ListItem> 
        <div className="flex gap-4 justify-between">
          <Dropdown onSharePdf={handleSharePdf} />

          <Button color="red" onClick={handleDelete}  className="flex items-center gap-2" > 
          Delete
          <TrashIcon className="h-6 w-6 text-white-500" /> 
          </Button>
          
          <Button color="green" className="flex items-center gap-2" >
          <span> <a href={file.url}> Download</a></span>
          <ArrowDownTrayIcon className="h-6 w-6 text-white-500" />
          </Button>

          <Button onClick={viewhandler}>
          View Pdf 
          </Button>

          {/* <Button  onClick={retrieveComments}>
           get comments
     </Button> */}

          
        </div>

    </div>
    )
}

export default ListComponent;