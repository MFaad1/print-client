import React from "react";
import "./index.css";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const Input = ({
  password,
  placeholder,
  title,
  type,
  value,
  onChange,
  show,
  passwordHideShowHandler,
  name
}) => {
  return (
    <div>
      <p className="input-title">{title}</p>
      <div className="input-main">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
        {password && (
          <button onClick={passwordHideShowHandler}>
            {!show ? (
              <FaRegEye className="input-password-icon" />
            ) : (
              <FaRegEyeSlash className="input-password-icon" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
export default Input;
