import React, { useContext } from 'react';
import { useState } from "react";
import { storage ,db} from "../firebase-config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Button, Input } from "@material-tailwind/react";
import { CloudArrowUpIcon} from '@heroicons/react/24/outline'
import { AppContext } from '../AuthContext';
import { doc, setDoc ,Timestamp} from "firebase/firestore"; 
import { ToastContainer, toast } from 'react-toastify';

const UploadPdf = ()=>{
    const {currentUser}  = useContext(AppContext);
    const [file, setFile] = useState("");
       
    // Handle file upload event and update state 
    function handleChange(event) {
        setFile(event.target.files[0]);
        event.target.value = null;
    } 

    
    const handleUpload =  async (e) => {
        if (!file) {
            toast.warning("Please uplaod an PDF first!");
            // alert("Please upload an Pdf first!");
            return;
        } else{
            try{

                const userId  = currentUser.uid;
                // console.log(`users/${uid}/${file.name}`);
                const fileRef = ref(storage, `users/${userId}/${file.name}`);
                await uploadBytes(fileRef, file);
                // console.log(`Uploaded ${file.name} on file Storage successfully`);
    
                const DownloadUrl = await getDownloadURL(fileRef);
                await uploadFirestore(DownloadUrl);
                setFile("");
    
            }catch(error){
                toast.error("Error while uploading file to storage:", error);
                console.log("Error while uploading file to storage:", error);
            }
        }

      

    };

    const uploadFirestore = async (url) => {

    const userId = await currentUser.uid;
     const nameValue = await file.name;
     await setDoc(doc(db, "datas",userId,'pdfs', nameValue), {
        downloadUrl:url,
       title: nameValue,
       createdAt: Timestamp.fromDate(new Date()),
        owner: userId,
        sharedWith:[] 
      });

     toast.success("PDF uploaded on Firestore & document created successfully!")

    } 
 
    return (

        <div className='flex items-center gap-4 mt-10 mb-10'> 
            <Button >
                <label className="bg-blue text-white flex justify-center gap-5 cursor-pointer">
                    <CloudArrowUpIcon className="w-6 h-6" strokeWidth={2} />
                    <span className="py-1"> Choose Files </span>
                    <input type="file" onChange={handleChange} accept=".pdf" />
                </label>
            </Button> 
            <Button color="red" onClick={handleUpload}>Upload </Button>
            <ToastContainer/>


        </div>
    
    );

}
export default UploadPdf;





