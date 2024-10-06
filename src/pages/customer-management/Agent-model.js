import React, { useEffect, useState } from "react";

import { Button, Input, Model } from "../../components";
import { Close } from "../../svg";
import { toast } from "react-toastify";
import axios from "axios";


const AgentForm = ({ modal, setModal, location_loading, edit_value, get_Orders }) => {
    let agent_token = localStorage.getItem("admin_access_token")


    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        business_name: "",
        // business_type: "",
        locationRef: "",
        verified_email: false,
        is_available: false,
        // is_deactivated: false,
        // availability_otp: "",
        // availability_otp_expiry: "",
        personal_info: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;


        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const saveHandler = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/customers/${edit_value._id}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${agent_token}`
                    }
                }

            );

            console.log("Agent updated successfully:", response.data);

            get_Orders()
            setModal(false);
            toast.success("Customer details has been updated");

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                console.log(error.response.data.message)
            }

            else if (error.message) {
                toast.error(error.message);
            }
            else {
                toast.error("Internal server error");
            }
        }
    };




    useEffect(() => {

        setFormData((prevData) => ({
            ...prevData,
            full_name: edit_value?.full_name || "",
            email: edit_value?.email || "",
            business_name: edit_value?.business_name || "",
            business_type: edit_value?.business_type || "",
            locationRef: edit_value?.locationRef || "",
            verified_email: edit_value?.verified_email || false,
            is_available: edit_value?.is_available || false,
            personal_info: edit_value?.personal_info || "",
        }));
    }, [edit_value]);



    return (
        <Model open={modal} onClose={() => setModal(false)} maxWidth="xs">
            <div className="modal-header">
                <p>Edit Customer Information</p>
                <img src={Close} onClick={() => setModal(false)} alt="close" />
            </div>
            <p className="modal-sub-heading">Customer Details</p>

            {/* Controlled Inputs */}
            <Input
                title="Full Name"
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
            />

            <Input
                title="Email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            {/* <Input
                title="Business Name"
                type="text"
                name="business_name"
                placeholder="Business Name"
                value={formData.business_name}
                onChange={handleChange}
            /> */}

            {/* <Input
                title="Business Type"
                type="text"
                name="business_type"
                placeholder="Business Type"
                value={formData.business_type}
                onChange={handleChange}
            /> */}

            {/* <Input
                title="Cards"
                type="text"
                name="locationRef"
                placeholder="locaton_Ref"
                value={formData.locationRef}
                onChange={handleChange}
            /> */}

            {/* <Input
        title="Availability OTP"
        type="text"
        name="availability_otp"
        placeholder="OTP"
        value={formData.availability_otp}
        onChange={handleChange}
      /> */}

            {/* <Input
        title="Availability OTP Expiry"
        type="datetime-local"
        name="availability_otp_expiry"
        value={formData.availability_otp_expiry}
        onChange={handleChange}
      /> */}

            {/* <Input
                title="Personal Info"
                type="text"
                name="personal_info"
                placeholder="Personal Info"
                value={formData.personal_info}
                onChange={handleChange}
            /> */}

            {/* Checkbox Inputs */}
            {/* <label>
        <input
          type="checkbox"
          name="verified_email"
          checked={formData.verified_email}
          onChange={handleChange}
        />
        Verified Email
      </label>
*/}
            <label>

                <input
                    type="checkbox"
                    name="verified_email"
                    checked={formData.verified_email}
                    onChange={handleChange}
                />


                Verified Email


            </label>



            {/* Save Button */}
            <Button
                disabled={location_loading}
                onClick={saveHandler}
                className="manage-agents-save-btn"
                title="Save"
            >

            </Button>
        </Model>
    );
};

export default AgentForm;
