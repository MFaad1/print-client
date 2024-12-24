import React, { useState } from "react";
import { SideMenu } from "../../components";
import { toast } from "react-toastify";
import axios from "axios";
import { Input, Button } from "../../components";
import Btnloader from "../../components/Loader/Btnloader";
import './setting.css'

const Location = () => {
  const initialData = {
    location: {
      city: "",
      state: "",
      zip_code: "",
      country: "",
      coordinates: {
        longitude: "",
        latitude: "",
      },
    },
  };

  const [formData, setformData] = useState(initialData);
  const [loading, setloading] = useState(false);
  let agent_token = localStorage.getItem("Agent_access_token");


  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name.includes("coordinates")) {
      const field = name.split(".")[1]; 
      setformData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          coordinates: {
            ...prev.location.coordinates,
            [field]: value,
          },
        },
      }));
    } else {
      setformData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/print-agent/add-location`,
        formData, {
          headers: {
            Authorization: `Bearer ${agent_token}`,
          },
        }
      );
      toast.success("Information has been saved");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setloading(false);
    }
  };

  console.log(formData, "formData");

  return (
    <SideMenu>
      <div className="page-header">
        <div />
        <p>Setting</p>
      </div>
      <form  onSubmit={handlesubmit}>
        <div className="Setting_Container">
          <Input
            password={false}
            title="City"
            type="text"
            placeholder="City"
            name="city"
            value={formData.location.city}
            onChange={onChangeHandler}
          />
          <Input
            password={false}
            title="State"
            type="text"
            placeholder="State"
            name="state"
            value={formData.location.state}
            onChange={onChangeHandler}
          />
          <Input
            password={false}
            title="Zip Code"
            type="text"
            placeholder="Zip Code"
            name="zip_code"
            value={formData.location.zip_code}
            onChange={onChangeHandler}
          />
          <Input
            password={false}
            title="Country"
            type="text"
            placeholder="Country"
            name="country"
            value={formData.location.country}
            onChange={onChangeHandler}
          />
          <Input
            password={false}
            title="Longitude"
            type="number"
            placeholder="Longitude"
            name="coordinates.longitude"
            value={formData.location.coordinates.longitude}
            onChange={onChangeHandler}
          />
          <Input
            password={false}
            title="Latitude"
            type="number"
            placeholder="Latitude"
            name="coordinates.latitude"
            value={formData.location.coordinates.latitude}
            onChange={onChangeHandler}
          />
          <Button
            type="submit"
            disabled={loading}
            title={loading ? <Btnloader /> : "Save"}
          />
        </div>
      </form>
    </SideMenu>
  );
};

export default Location;
