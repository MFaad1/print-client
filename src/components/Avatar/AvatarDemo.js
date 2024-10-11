import React, { useState, useEffect, useRef } from "react";
import './AvatarDemo.css';

import { IoIosArrowDown } from "react-icons/io";


const AvatarDemo = ({name}) => {
  const [avatarEl, setAvatarEl] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const [notifyEl, setNotifyEl] = useState(null);
  const avatarRef = useRef(null);
  const notifyRef = useRef(null);

  const handleAvatarClick = (e) => {
    setAvatarEl(!avatarEl);
  };
;




  useEffect(() => {
    const handleClickOutside = (event) => {
      let id = event.target.id
  
      if (id !== "avatar") {
        setAvatarEl(false);
 
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click ", handleClickOutside);
    };
  }, [avatarEl, notifyEl]);

  const logout_handler =()=>{
    console.log('working')
    localStorage.removeItem("loggedIn_user")
    localStorage.removeItem("use_access_token")
    window.dispatchEvent(new Event("logged_user"));
return 


  }

  return (
    <div>
      <div className="stack" id ="avatar"  onClick={handleAvatarClick}>
        <button className="avatar-button" id ="avatar"  ref={avatarRef} onClick={handleAvatarClick}>
          <div className="avatar" id ="avatar">{name.toUpperCase()}</div>
          <span className="avatar-arrow" id ="avatar"><IoIosArrowDown /> </span>
        </button>
      </div>

      {avatarEl && (
        <div
          className="popover"
          id ="avatar"
          style={{
            top: "75px",
          }}
        >
          <ul className="popover-list" id ="avatar">
            {/* <li className="popover-item">Avatar</li>
            <li className="popover-item">Favorites</li>
            <li className="popover-item">Setting</li> */}
            <li className="popover-item" id ="avatar" onClick={logout_handler}>Log out</li>
          </ul>
        </div>
      )}


    </div>
  );
};

export default AvatarDemo;
