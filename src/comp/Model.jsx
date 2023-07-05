import { Fragment, useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
  CardFooter,
  Typography
} from "@material-tailwind/react";
import { AppContext } from "../AuthContext";
import {doc,getDoc,updateDoc} from 'firebase/firestore'; 
import {db} from '../firebase-config';
import { ToastContainer,toast } from "react-toastify";

const ShareModel=()=> {
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {shareActive,userProfile,otherUsers} = useContext(AppContext);  
//  const nameValue = shareActive.name;
  const handleOpen = () => setOpen(!open);

  const handleCheckboxChange = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleSharePdf = async () => {
    const userId = userProfile.id
    console.log(shareActive); 
    if(selectedUsers.length()===0){
      toast.warning("please select some users");
      return;
    }
    
    try { 
      const pdfRef = doc(db, "datas",userId,"pdfs",shareActive);
      const pdfSnapshot = await getDoc(pdfRef);
      const pdfData = pdfSnapshot.data();
      const sharedWith = pdfData && pdfData.sharedWith ? pdfData.sharedWith : []; 
        
      selectedUsers.forEach((user) => {
        if (!sharedWith.includes(user)) {
          sharedWith.push(user);
        }   
      });   
  
      await updateDoc(pdfRef, { sharedWith });

      setOpen(!open)

      console.log('PDF shared successfully!');
      toast.success("PDF shared Successfully");
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  };
  return (
    <Fragment>
        <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Share pdf with Other users 
        </Typography>
        <Typography >
          {shareActive}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
      <Button onClick={handleOpen} >
        Share Pdf
      </Button>
      </CardFooter>
    </Card>

      
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Share </DialogHeader>
        <DialogBody divider>
        {otherUsers.map((user) => (
              <div key={Math.random()} className="flex items-center my-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user)}
                    onChange={() => handleCheckboxChange(user)}
                  />
                  <span>{user}</span> 
                </label>
              </div>
            ))}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>back</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSharePdf}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer/>
    </Fragment>
  );
}

export default ShareModel;