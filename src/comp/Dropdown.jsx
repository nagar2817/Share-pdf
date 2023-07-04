import { useState,useContext } from 'react';
import { Button } from '@material-tailwind/react';
import { ShareIcon } from "@heroicons/react/24/outline";
import { AppContext } from '../AuthContext';


const Dropdown = ({ onSharePdf }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const {otherUsers} = useContext(AppContext)

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleShareClick = () => {
    onSharePdf(selectedUsers);
  };



  return (
    <div className="relative">
      <Button
        onClick={handleToggleDropdown}
      >
        Share PDF
        <ShareIcon className="h-6 w-6 text-white-500" />

      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg">
          <div className="px-4 py-2">
            <h2 className="text-lg font-bold">Select users to share with:</h2>
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
            <Button size='sm'
              onClick={handleShareClick}
            >
              Share PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
