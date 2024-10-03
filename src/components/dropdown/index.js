import React from "react";
import Dropdown from "react-dropdown";
import "./index.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const DropdownCom = ({title, data, placeholder, value, onChange }) => {
    return (
        <div className="dropdown-main">
               <p className="input-title">{title}</p>
            <Dropdown
                controlClassName="dropdown"
                options={data}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                arrowClosed={<IoIosArrowDown />
                }
                arrowOpen={<IoIosArrowUp />
                }
            />
        </div>
    );
};
export default DropdownCom;