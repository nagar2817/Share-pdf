import {  createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { collection, query, where, getDocs,getDoc,doc,addDoc } from 'firebase/firestore';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import {storage,db} from './firebase-config';
import { ToastContainer,toast } from "react-toastify";

export const AppContext = createContext();

const ContextProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState(null);
    const [pdfFiles,setPdfFiles] = useState([]);
    const [usersIds,setUsersIds] = useState([]);
    const [userProfile,setUserProfile ] = useState({});
    const [activeFile,setActiveFile] = useState('');
    const [otherUsers,setOtherUsers] = useState([]);
    const [shareActive,setShareActive] = useState('');

    useEffect( ()=> {
        const fecthAuth = async ()=>{
            try{
                const user = await new Promise((resolve, reject) => {
                    onAuthStateChanged(auth, (user) => {
                      if (user) {
                        console.log("user in AuthContext",user);
                        setCurrentUser(user);
                        resolve(user);
                      } else {
                        // toast.error("User not authenticate");
                        reject(new Error('User not authenticated.'));
                      }
                    });
                  });
            
                  console.log(user.uid);
                  const userId = user.uid;
                  const storageRef = ref(storage, `users/${userId}`);
                  const files = await listAll(storageRef); 
                  const Storedfiles = await Promise.all(
                    files.items.map(async (file) => {
                      const downloadUrl = await getDownloadURL(file); 
                      const working_URL = `https://storage.googleapis.com/sharemeta-fc6c7.appspot.com/users/${userId}/${file.name}`; 
                      return { name: file.name, url: downloadUrl, working_URL:working_URL };
                    })
                  );
  
                  const q = query(collection(db, 'users'), where('id', '!=', userId));  
                  const querySnapshot = await getDocs(q);  

                  // console.log(querySnapshot.docs);  
                  const otherUsers = querySnapshot.docs.map((doc) => {
                    return(
                      doc.data().username
                    )
                  });
                    // console.log("otherids",otherUserIds);

                  const userRef = doc(db, `users/${userId}`);
  
                  const userSnapshot = await getDoc(userRef);
                  const userProfile = userSnapshot.data();
                  if(userSnapshot.exists()){
                    console.log('data',userSnapshot.data())
                  }else{
                    console.log('no data');
                  }
                  // console.log(userProfile);
                    setUserProfile(userProfile);
                  // console.log(otherUserIds);
                  // setUsersIds(otherUserIds
                  console.log(otherUsers);
                  setOtherUsers(otherUsers);
                  
                  setPdfFiles(Storedfiles);

                  
            }catch(error){
                console.error(error);
            }
     }

     
     fecthAuth();
    
            
    },[]) 


    return(
        <AppContext.Provider value={{
            currentUser,
            setCurrentUser,
            pdfFiles,
            usersIds,
            setUsersIds,
            setPdfFiles,
            userProfile,
            activeFile,
            setActiveFile,
            otherUsers,
            shareActive,
            setShareActive
        }}>
            {children}
            <ToastContainer/>
        </AppContext.Provider>
    )
}

export default ContextProvider;