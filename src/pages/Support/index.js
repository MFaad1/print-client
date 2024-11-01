import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Logo } from "../../svg";
import { Footer } from "../../components";
import { useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";

const SupportTicketsForm = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    order_number: "",
    message: "",
    bank_name: "",
    bank_number: "",
    full_name_bank: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("use_access_token");
    if (!token) {
      toast.error("Please log in first");
      nav("/");
    }
  }, [nav]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "bank_number") {
      const formattedValue = value
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("use_access_token");

    if (!token) {
      toast.error("Please log in first");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/create-ticket`,
        {
          ...formData,
          bank: {
            bank_name: formData.bank_name,
            bank_number: formData.bank_number,
            full_name_bank: formData.full_name_bank,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Form Submitted Successfully");

      // Redirect to home page after a delay
      setTimeout(() => {
        setIsSuccess(false);
        nav("/");
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Error submitting form");
    }
  };

  const handleLink = () => {
    nav("/");
  };

  if (isSuccess) {
    return (
      <div className="success-message-container">
        <div className="success-content">
          <svg
            className="success-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="64px"
            height="64px"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" />
          </svg>
          <h1 className="success-message">We have received your query. Our Team will contact you soon!</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="navbar-container-support">
        <button onClick={handleLink} className="navbar-logo-support">
          <img src={Logo} alt="" />
        </button>
      </div>
      <div className="support-tickets-container">
        <form className="support-tickets-form" onSubmit={handleSubmit}>
          <h2 className="support-tickets-heading">Create Support Ticket</h2>
          <div className="support-tickets-field">
            <label htmlFor="full_name" className="support-tickets-label">
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              className="support-tickets-input"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="support-tickets-field">
            <label htmlFor="email" className="support-tickets-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="support-tickets-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="support-tickets-field">
            <label htmlFor="order_number" className="support-tickets-label">
              Order Number
            </label>
            <input
              type="text"
              id="order_number"
              name="order_number"
              className="support-tickets-input"
              value={formData.order_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="support-tickets-field">
            <label htmlFor="message" className="support-tickets-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="support-tickets-textarea"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <h3 className="support-tickets-subheading">Bank Details</h3>
          <div className="support-tickets-field">
            <label htmlFor="bank_name" className="support-tickets-label">
              Bank Name
            </label>
            <input
              type="text"
              id="bank_name"
              name="bank_name"
              className="support-tickets-input"
              value={formData.bank_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="support-tickets-field">
            <label htmlFor="bank_number" className="support-tickets-label">
              Bank Number
            </label>
            <input
              type="text"
              id="bank_number"
              name="bank_number"
              className="support-tickets-input"
              value={formData.bank_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="support-tickets-field">
            <label htmlFor="full_name_bank" className="support-tickets-label">
              Full Name on Bank Account
            </label>
            <input
              type="text"
              id="full_name_bank"
              name="full_name_bank"
              className="support-tickets-input"
              value={formData.full_name_bank}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="support-tickets-submit-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <Circles
                height="24"
                width="24"
                color="#ffffff"
                ariaLabel="loading-indicator"
              />
            ) : (
              "Submit Ticket"
            )}
          </button>
        </form>
        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default SupportTicketsForm;
