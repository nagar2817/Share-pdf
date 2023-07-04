import { useState, useEffect, useContext } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./Data";
import { AppContext } from "../../AuthContext";
import { collection,addDoc,updateDoc,doc,deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const Comments = ({  currentUserId }) => {
    const {activeFile,userProfile}  = useContext(AppContext);
   

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    const {id,username} = userProfile;

  const addComment = (text, id,username, parentId) => {
    try{
      createCommentApi(text, id,username,parentId).then(async(comment) => {
        setBackendComments([comment, ...backendComments]);
        await addDoc(collection(db,"datas",id,"pdfs",activeFile.name,"comments"),comment);
        console.log('created');
        setActiveComment(null);

    })}
    catch(error){
      console.error(error);
    }
    
    //   try {
    //     await addDoc(collection(db, 'tasks'), {
    //       title: title,
    //       description: description,
    //       completed: false,
    //       created: Timestamp.now()
    //     })
    //     onClose()
    //   } catch (err) {
    //     alert(err)
    //   }

  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then( () => {
      const updatedBackendComments = backendComments.map(async (backendComment) => {
        if (backendComment.id === commentId) {
          const commentRef = doc(db,"datas",id,"pdfs",activeFile.name,"comments",commentId);
          await updateDoc(commentRef,{
            body:text
          }) 
          console.log("updates");
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.map(async (backendComment)=>{
          if(backendComment.id === commentId) {
              await deleteDoc(doc(db,"datas",id,"pdfs",activeFile.name,"comments",commentId));
        console.log('created');
            return;
          }else{
            return backendComment;
          }
        })
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect( () => {
    const fetchData = async ()=>{
const querySnapshot = await getDocs(collection(db,"datas",id,"pdfs",activeFile.name,"comments"));
let listcomments = [];
querySnapshot.forEach((doc)=>{
  listcomments.push(doc.data());
})
setBackendComments(listcomments);
    }
    fetchData();

  }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <div className="comment-form-title">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={id}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;