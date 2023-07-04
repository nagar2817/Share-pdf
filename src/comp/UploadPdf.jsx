import React, { useContext } from 'react';
import { useState } from "react";
import { storage ,db} from "../firebase-config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Button, Input } from "@material-tailwind/react";
import { CloudArrowUpIcon} from '@heroicons/react/24/outline'
import { AppContext } from '../AuthContext';
import { doc, setDoc ,Timestamp} from "firebase/firestore"; 

const UploadPdf = ()=>{
    const {currentUser}  = useContext(AppContext);
    const [file, setFile] = useState("");
       
    // Handle file upload event and update state 
    function handleChange(event) {
        setFile(event.target.files[0]);
    } 

    
    const handleUpload =  async () => {
        if (!file) {
            alert("Please upload an Pdf first!");
        }

        try{

            const userId  = currentUser.uid;
            // console.log(`users/${uid}/${file.name}`);
            const fileRef = ref(storage, `users/${userId}/${file.name}`);
            await uploadBytes(fileRef, file);
            console.log(`Uploaded ${file.name} on file Storage successfully`);

            const DownloadUrl = await getDownloadURL(fileRef);
            uploadFirestore(DownloadUrl);
            setFile("");

        }catch(error){
            console.log("Erro while uploading file to storage:", error);
        }
    };

    const uploadFirestore = async (url) => {

    const userId = currentUser.uid;
     const nameValue = file.name;
     await setDoc(doc(db, "datas",userId,'pdfs', nameValue), {
        downloadUrl:url,
       title: file.name,
       createdAt: Timestamp.fromDate(new Date()),
        owner: userId,
        sharedWith:[] 
      });

     console.log('PDF uploaded on Firestore & document created successfully!');

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
            <Input type="text"  placeholder='Enter file Name' />
            <Button color="red" onClick={handleUpload}>Upload </Button>

        </div>
    
    );

}
export default UploadPdf;





