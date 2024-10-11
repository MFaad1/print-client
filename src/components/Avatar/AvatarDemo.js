import React, { useState, useEffect, useRef } from "react";
import './AvatarDemo.css';

import { IoIosArrowDown } from "react-icons/io";


const AvatarDemo = () => {
  const [avatarEl, setAvatarEl] = useState(false);
  const [invisible, setInvisible] = useState(false);
  const [notifyEl, setNotifyEl] = useState(null);
  const avatarRef = useRef(null);
  const notifyRef = useRef(null);

  const handleAvatarClick = (e) => {
    setAvatarEl(!avatarEl);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  const handleNotifyOpen = (e) => {
    setNotifyEl(e.currentTarget);
    if (!invisible) {
      handleBadgeVisibility();
    }
  };

  const handleNotifyClose = () => {
    setNotifyEl(null);
  };



  // Close dropdown when clicking outside
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

  return (
    <div>
      <div className="stack">
        <button className="avatar-button" id ="avatar" onClick={handleAvatarClick} ref={avatarRef}>
          <div className="avatar" id ="avatar">H</div>
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
            <li className="popover-item" id ="avatar">Log out</li>
          </ul>
        </div>
      )}


    </div>
  );
};

export default AvatarDemo;
