import React, { useState, useEffect, useRef } from "react";
import './AvatarDemo.css';
import { IoIosArrowDown } from "react-icons/io";

const AvatarDemo = ({ name }) => {
  const [avatarEl, setAvatarEl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const avatarRef = useRef(null);

  const handleAvatarClick = () => {
    setAvatarEl(!avatarEl);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      let id = event.target.id;

      if (id !== "avatar") {
        setAvatarEl(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [avatarEl]);

  const logout_handler = () => {
    setIsLoading(true); // Show the loader
    localStorage.removeItem("loggedIn_user");
    localStorage.removeItem("use_access_token");
    window.dispatchEvent(new Event("logged_user"));

    setTimeout(() => {
      window.location.href = "/"; // Redirect to home page
    });
  };

  return (
    <div>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "5px solid rgba(0, 0, 0, 0.1)",
              borderTop: "5px solid #000",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
      )}
      <div className="stack" id="avatar" onClick={handleAvatarClick}>
        <button
          className="avatar-button"
          id="avatar"
          ref={avatarRef}
          onClick={handleAvatarClick}
        >
          <div className="avatar" id="avatar">
            {name.toUpperCase()}
          </div>
          <span className="avatar-arrow" id="avatar">
            <IoIosArrowDown />
          </span>
        </button>
      </div>

      {avatarEl && (
        <div
          className="popover"
          id="avatar"
          style={{
            top: "75px",
          }}
        >
          <ul className="popover-list" id="avatar">
            <li className="popover-item" id="avatar" onClick={logout_handler}>
              Log out
            </li>
          </ul>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AvatarDemo;
