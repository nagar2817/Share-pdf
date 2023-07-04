import { useContext,useState } from "react";
import { AppContext } from "../AuthContext";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";


const SearchBox = ()=>{
    const {pdfFiles,setPdfFiles}= useContext(AppContext);
    const [inputText,setInputText] = useState('');
    const handleChange = (e) => {
        setInputText(e.target.value); 
        setPdfFiles(pdfFiles.filter(file => file.name.toLowerCase().includes(inputText.toLowerCase())));
        console.log("search box");
    }
    return (
        
<div className="relative w-300" style={{
    width:"40rem",
    height:"5,em",
    backgroundColor: "white"
}}>
  <Input
    label="Search PDF..."
    value={inputText}
    onChange={handleChange}
    className="py-3 pl-12 pr-4 text-lg"
  />
  <MagnifyingGlassCircleIcon className="absolute top-1/2 right-3 transform -translate-y-1/2 h-8 w-8 text-blue-500" />
</div>
    ) 
}
export default SearchBox;

