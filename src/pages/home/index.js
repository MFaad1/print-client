/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Footer,
  Model,
  Input,
  Button,
  SocialButton,
  Dropdown,
} from "../../components";
import Grid from "@mui/material/Grid";
import "./index.css";
import { MdChevronRight } from "react-icons/md";
import FileUpload from "./upload";
import Switch from "react-switch";
import {
  Upload,
  Close,
  SecurityUser,
  Verify,
  ArrowLeft,
  Pdf,
  Download,
  Search2,
  Map,
  // LocationWave,
  // Copy,
  Location3,
  Success,
  File,
  LocationList,
  Printing,
} from "./../../svg";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import OtpInput from "react-otp-input";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import axios from "axios";
import FileRenderer from "../../components/Docs_rendered/FileRenderer";
import PaymentModal from "../../components/PaymentModal";
import PaymentForm from "../../components/PaymentForm";
import IncrementDecrement from "../../components/IncrementDecrement/IncrementDecrement";
import Btnloader from "../../components/Loader/Btnloader";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const emailRjx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Home = () => {
  const navigate = useNavigate();
  // print form
  const [printName, setPrintName] = useState("");
  const [printEmail, setPrintEmail] = useState("");
  const [printFile, setPrintFile] = useState("");
  const [printText, setPrintText] = useState("");
  const [files, setfiles] = useState([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const nav = useNavigate();
  let agent_token = localStorage.getItem("use_access_token");
  let user = localStorage.getItem("loggedIn_user");
  let loggedIn_use;
  if (user) {
    loggedIn_use = JSON.parse(user);
  }

  // log in
  const [loginModal, setLoginModal] = useState(false);
  const [loginType, setLoginType] = useState("Customer");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [forgotPassword, setforgotPassword] = useState("");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // sign up
  const [signUpModal, setSignUpModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [businessname, setbusinessname] = useState("");
  const [business_type, setbusiness_type] = useState("");
  const [zip_code, setzip_code] = useState("");

  const [signupEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showSignUpPassowrd, setShowSignUpPassowrd] = useState(false);
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [showSignUpComfirmPassowrd, setShowSignUpComfirmPassowrd] =
    useState(false);
  const [forgetEmail, setforgetEmail] = useState("");
  const [searchVal, setsearchVal] = useState("");

  // Confirm your email
  const [confirmEmailModal, setConfirmEmailModal] = useState(false);

  // verify your email address
  const [verifyModal, setVerifyModal] = useState(false);
  {
    /* Verification Code */
  }
  const [verificationModal, setVerificationModal] = useState(false);
  const [otp, setOtp] = useState("");
  {
    /* Print Job 001 */
  }
  const [printJonModal, setPrintJobModal] = useState(false);
  {
    /* Payment / Add New Card */
  }
  const [paymentModal, setPaymentModal] = useState(false);
  {
    /* Code Sent Successfully! */
  }
  const [codeSendSuccessfyllyModal, setCodeSendSuccessfyllyModal] =
    useState(false);
  // Searching Print Agents in your area
  const [searchingModal, setSearchingModal] = useState(false);
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const [selectedCurrentLocation, setSelectedCurrentLocaiton] = useState();

  {
    /* Receipt from Print to Point, LLC */
  }
  const [receiptModal, setReceiptModal] = useState(false);
  {
    /* Forgot Password */
  }
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [newPasswordModal, setnewPasswordModal] = useState(false);
  // {
  //   created_at: "2024-10-04T19:30:32.662Z",
  //   customer_id: "66e0a7a5eb12ada0047ecd23",
  //   file_path: "https://res.cloudinary.com/dkgvo62xy/image/upload/v1728070231/print_jobs/7660daf17dbb0030bcc4995b81621755_e1omha.pdf",
  //   pages: 2,
  //   payment_status: "pending",
  //   print_job_description: "dsafasdfasdf",
  //   print_job_title: "sdaafasd",
  //   total_cost: 20,
  //   updated_at: "2024-10-04T19:30:32.662Z",
  //   __v: 0,
  //   _id: "670042582ba2672d1d058ad8",
  // }

  {
    /* password otp */
  }
  const [passwordOtpMoadal, setPasswrodOtpModal] = useState(false);
  //  Password update Successful
  const [passwordUpdateSuccModal, setPasswordUpdateSuccModal] = useState(false);
  // Link your bank account
  const [linkBankAccountModal, setLinkBankAccountModal] = useState(false);
  // Send Money
  const [sendMoneyType, setSendMoneyType] = useState("To Yourself");
  const [sendMoneyModal, setSendMoneyModal] = useState(false);
  const [currentLocationList, setcurrentLocationList] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [modal, setModal] = useState(false);

  const [cityName, setCityName] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setcountry] = useState("");
  const [location_loading, setlocation_loading] = useState(false);
  const [job_loading, setjob_loading] = useState(false);
  const [otp_loading, setotp_loading] = useState(false);
  const [forgot_loading, setforgot_loading] = useState(false);
  const [newpassowrd_loading, setnewpassowrd_loading] = useState(false);
  const [login_loading, setlogin_loading] = useState(false);
  const [signup_loading, setsignup_loading] = useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [Printed_file, setPrinted_file] = useState();

  const [totalCost, setTotalCost] = useState(Printed_file?.total_cost || 0);
  const [count, setCount] = useState(1);
  const [isColor, setIsColor] = useState(false);
  const [Counter, setCounter] = useState(false);

  const [originalLocationList, setOriginalLocationList] = useState([]);

  const pricingTable = [
    { range: [1, 5], blackAndWhitePrice: 5.53, colorPrice: 6.64 },
    { range: [6, 10], blackAndWhitePrice: 8.31, colorPrice: 9.42 },
    { range: [11, 15], blackAndWhitePrice: 11.08, colorPrice: 12.19 },
    { range: [16, 20], blackAndWhitePrice: 13.86, colorPrice: 14.97 },
    { range: [21, 25], blackAndWhitePrice: 16.63, colorPrice: 17.74 },
    { range: [26, Infinity], pricePerPageBW: 0.65, pricePerPageColor: 0.75 },
  ];

  const [numPages, setNumPages] = useState(null);

  const otp_verifyHandler = async () => {
    try {
      let signup_user = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/customer/verify-otp`,
        { email: signupEmail, otp: otp },
      );
      setLoginModal(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  const signUpHandler = async () => {
    if (fullName === "") {
      toast.error("Full name is required!");
    } else if (signupEmail === "") {
      toast.error("Email is required!");
    } else if (!signupEmail.match(emailRjx)) {
      toast.error("Please enter valid email address");
    } else if (signUpPassword === "") {
      toast.error("Password is required!");
    } else if (signUpConfirmPassword === "") {
      toast.error("Confirm password is required!");
    } else if (signUpConfirmPassword !== signUpPassword) {
      toast.error("Confirm password doesn't match!");
    } else {
      try {
        setsignup_loading(true);

        let CustomerFlag = loginType === "Customer";

        let url = CustomerFlag
          ? "/auth/customer/signup"
          : "/auth/print-agent/signup";
        let CustomerDetails = {};
        if (CustomerFlag) {
          CustomerDetails = {
            full_name: fullName,
            email: signupEmail,
            password: signUpPassword,
          };
        } else {
          if (!businessname) return toast.error("Business name is required");
          if (!business_type) return toast.error("Business Type is required");
          if (!zip_code) return toast.error("Zip code is required");
          CustomerDetails = {
            full_name: fullName,
            email: signupEmail,
            password: signUpPassword,
            business_name: businessname,
            business_type,
            zip_code,
          };
        }

        let signup_user = await axios.post(
          `${process.env.REACT_APP_API_URL + url}`,
          CustomerDetails,
        );

        toast.success("Successfully created new account");
        setFullName("");
        // setSignUpEmail("");
        setSignUpPassword("");
        setSignUpConfirmPassword("");
        setSignUpModal(false);
        setConfirmEmailModal(true);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
        } else {
          toast.error("Internal server error");
        }
      } finally {
        setsignup_loading(false);
      }
    }
  };

  // const calculateTotalCost = (count, isColor) => {

  //   for (let i = 0; i < pricingTable.length; i++) {
  //     const { range, blackAndWhitePrice, colorPrice, pricePerPageBW, pricePerPageColor } = pricingTable[i];

  //     if (count >= range[0] && count <= range[1]) {
  //       return isColor ? colorPrice : blackAndWhitePrice;
  //     }
  //   }
  //   return isColor? pricingTable[pricingTable.length - 1].pricePerPageColor * count : pricingTable[pricingTable.length - 1].pricePerPageBW * count;
  // };

  const calculateTotalCost = (count, isColor) => {
    const totalPages = count * (Printed_file?.pages || 1);

    for (let i = 0; i < pricingTable.length; i++) {
      const {
        range,
        blackAndWhitePrice,
        colorPrice,
        pricePerPageBW,
        pricePerPageColor,
      } = pricingTable[i];

      if (totalPages >= range[0] && totalPages <= range[1]) {
        return isColor ? colorPrice : blackAndWhitePrice;
      }
    }

    return isColor
      ? pricingTable[pricingTable.length - 1].pricePerPageColor * totalPages
      : pricingTable[pricingTable.length - 1].pricePerPageBW * totalPages;
  };

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // login handler
  const loginHandler = async () => {
    if (loginEmail === "") {
      toast.error("Email is required!");
    } else if (!loginEmail.match(emailRjx)) {
      toast.error("Please enter valid email address");
    } else if (loginPassword === "") {
      toast.error("Password is required!");
    } else {
      setlogin_loading(true);
      let AgentFlag = loginType === "Agent";

      let URL = AgentFlag ? "/auth/print-agent/login" : "/auth/customer/login";

      try {
        let signup_user = await axios.post(`${process.env.REACT_APP_API_URL + URL}`,
          { email: loginEmail, password: loginPassword },
        );
        let token = signup_user.data.token;

        localStorage.setItem(
          AgentFlag ? "Agent_access_token" : "use_access_token",
          token,
        );

        let agentType = AgentFlag ? "printAgent" : "customer"

        localStorage.setItem(
          AgentFlag ? "agent_loggedIn_user" : "loggedIn_user",JSON.stringify(signup_user.data[agentType]),
        );
        toast.success("Successfully Logged");
        setLoginEmail("");
        setLoginPassword("");
        setLoginModal(false);
        if (loginType === "Agent") {
          navigate("/dashboard"); }
        window.dispatchEvent(new Event("logged_user"));
        if (loginType !== "Agent" && !signup_user.data.customer.location) {
          setModal(true);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Internal server error");
        }
      } finally {
        setlogin_loading(false);
      }
    }
  };

  const agent_otp = async () => {
    try {
      let signup_user = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/print-agent/verify-otp`,
        { email: signupEmail, otp: otp },
      );
      setLinkBankAccountModal(true);
      localStorage.setItem("Agent_access_token", signup_user.data.token);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  const printSubmitHandler = async () => {
    try {
      if (!loggedIn_use) return setLoginModal(true);

      let parsedLoggedInUser =
        typeof loggedIn_use === "string"
          ? JSON.parse(loggedIn_use)
          : loggedIn_use;

      if (!agent_token)
        return toast.error("Please login your account and then try");

      if (parsedLoggedInUser && !parsedLoggedInUser.location) {
        toast.error("Please add the location");
        setModal(true);
        return;
      }

      if (printName === "") {
        return toast.error("Print Job Title is required!");
      } else if (printEmail === "") {
        return toast.error("Print Email is required!");
      } else if (!files.length > 0) {
        return toast.error("Please select the relevant files.");
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file);
      });
      formData.append("print_job_title", printName);
      if (printText) {
        formData.append("print_job_description", printText);
      }
      formData.append("is_color", isColor);
      formData.append("no_of_copies", count);

      setjob_loading(true);

      let orders = await axios.post(
        `${process.env.REACT_APP_API_URL}/printjob/create-print-job`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${agent_token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setPrinted_file(orders.data.printJob);
      setPrintJobModal(true);
      toast.success("Successfully submitted");

      setPrintName("");
      setPrintEmail("");
      setPrintFile("");
      setPrintText("");
      // setSignUpModal(true);
      setCounter(false);
    } catch (error) {
      // Handle errors and provide feedback
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setjob_loading(false); // Change to false after the request is done
    }
  };

  const Add_card = async () => {
    try {
      if (!agent_token) throw new Error("Please re-login and try again");

      let orders = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/create-card`,
        { card: card },
        {
          headers: {
            Authorization: `Bearer ${agent_token}`,
          },
        },
      );
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  const get_nearby_location = async () => {
    let loggedIn_use = localStorage.getItem("loggedIn_user");

    try {
      if (!agent_token || !loggedIn_use) {
        return setLoginModal(true);
      }


      let parsedLoggedInUser = JSON.parse(loggedIn_use);

      if (parsedLoggedInUser && !parsedLoggedInUser.location) {
        return setModal(true);
      }

      let orders = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/available-print-agents`,
        {
          headers: {
            Authorization: `Bearer ${agent_token}`,
          },
        },
      );

      let availableAgents = (orders.data.availablePrintAgents || []).flat();

      console.log(orders.data, "availableAgents")
      if (!Array.isArray(availableAgents) || availableAgents.length === 0) {
        toast.error("No available agents found.");
        return;
      }

      let filteredAgents = availableAgents.filter((agent) => {
        return (
          agent?.location?.zip_code === parsedLoggedInUser.location?.zip_code
        );
      });

      setcurrentLocationList(filteredAgents);
      setOriginalLocationList(filteredAgents);
      console.log(filteredAgents, "filteredAgents");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  useEffect(() => {
    if (searchVal.trim() === "") {
      setcurrentLocationList(originalLocationList);
    } else {
      setcurrentLocationList(
        originalLocationList.filter((item) => {
          const itemString = JSON.stringify(item).toLowerCase();
          return itemString.includes(searchVal.toLowerCase());
        }),
      );
    }
  }, [searchVal, originalLocationList]);

  console.log(currentLocationList, "current lisst");

  useEffect(() => {
    get_nearby_location();
  }, [searchingModal]);

  const selectPrintAgent = async () => {
    let loggedIn_use = localStorage.getItem("loggedIn_user");

    try {
      // Validation Checkpoints
      if (!selectedAgent) throw new Error("No agent selected");
      if (!agent_token)
        throw new Error("User is not authenticated. Please login again.");
      if (!Printed_file)
        throw new Error("Print Job not found, Please re-create.");
      // let parsedLoggedInUser = JSON.parse(loggedIn_use);

      let orders = await axios.get(
        `${process.env.REACT_APP_API_URL}/customer/available-print-agents`,
        {
          headers: {
            Authorization: `Bearer ${agent_token}`,
          },
        },
      );
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/printjob/select-print-agent/${Printed_file?._id}`,
        {
          print_agent_id: selectedAgent._id,
        },
        {
          headers: {
            Authorization: `Bearer ${agent_token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setSearchingModal(false);
      setPaymentModal(true);

      toast.success("Print agent selected successfully!");
      console.log(response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    }
  };

  const handleSave = async () => {
    const cityDetails = { city: cityName, state, zip_code: zipCode, country };

    console.log(cityDetails, "city details");

    if (!cityName || !state || !zipCode || !country) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    try {
      setlocation_loading(true);
      let orders = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/add-location`,
        { location: cityDetails },
        {
          headers: {
            Authorization: `Bearer ${agent_token}`,
          },
        },
      );

      console.log(orders, "orders");
      toast.success("location has been added");
      setModal(false);
      setLoginModal(true);
      toast.success("location has been added, Please login again");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setlocation_loading(false);
    }
  };

  const foreget_passowrd = async () => {
    try {
      setforgot_loading(true);
      let AgentFlag = loginType === "Agent";

      let URL = AgentFlag
        ? "/print-agent/forgot-password"
        : "/auth/customer/forgot-password";

      let signup_user = await axios.post(
        `${process.env.REACT_APP_API_URL + URL}`,
        { email: forgetEmail },
      );

      setForgotPasswordModal(false);
      setPasswrodOtpModal(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setforgot_loading(false);
    }
  };

  const otp_Verify = async () => {
    try {
      setotp_loading(true);
      let AgentFlag = loginType === "Agent";

      let URL = AgentFlag
        ? "/print-agent/forgot-password"
        : "/auth/customer/verify-otp";

      let signup_user = await axios.post(
        `${process.env.REACT_APP_API_URL + URL}`,
        { email: forgetEmail, otp },
      );

      setPasswrodOtpModal(false);
      // setPasswordUpdateSuccModal(true);
      setnewPasswordModal(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setotp_loading(false);
    }
  };

  const new_passord_handler = async () => {
    try {
      setnewpassowrd_loading(true);
      let AgentFlag = loginType === "Agent";

      let URL = AgentFlag
        ? "/print-agent/forgot-password"
        : "/auth/customer/reset-password";

      let signup_user = await axios.post(
        `${process.env.REACT_APP_API_URL + URL}`,
        { email: forgetEmail, password: forgotPassword, otp },
      );

      setnewPasswordModal(false);
      setPasswordUpdateSuccModal(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setnewpassowrd_loading(false);
    }
  };

  useEffect(() => {
    const cost = calculateTotalCost(count, isColor);
    console.log(cost, "cost");
    setTotalCost(cost);
  }, [count, isColor]);

  const handleToggle = (checked) => {
    setIsColor(checked);
  };

  const [card, setCard] = useState({
    bank_name: "",
    card_number: "",
    expiry_date: "",
    phone_number: "",
    cvv: "",
  });

  const handleCardCreate = async () => {
    try {
      // setLinkBankAccountModal(false);
      // setSendMoneyModal(true);

      console.log("Current Card State: ", card); // Check state values here
      const url = `${process.env.REACT_APP_API_URL}/print-agent/create-card`;

      const token = localStorage.getItem("Agent_access_token");
      const data = {
        card: {
          bank_name: card.bank_name,
          card_number: card.card_number,
          expiry_date: card.expiry_date,
          phone_number: card.phone_number,
          cvv: card.cvv,
        },
      };

      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setLinkBankAccountModal(false);
      setSendMoneyModal(true);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.err
      ) {
        toast.error(error.response.data.err.message);
        console.log(error.response);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        // toast.error("Internal server error");
      }
    }
  };




  return (
    <div>
      <Navbar
        onClickSignIn={() => setLoginModal(true)}
        onClickSignUp={() => setSignUpModal(true)}
      />
      <Grid container spacing={0}>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          <div className="home-box">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="home-box-left">
                  <p className="home-box-left-title">
                    Your printing solution...
                  </p>
                  <p
                    className="home-box-left-title"
                    id="home-box-left-title"
                    style={{ marginBottom: "30px" }}
                  >
                    when you need it most
                  </p>
                  {/* <p className="home-box-left-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    gestas egestas viverra turpis habitant eu sociis ferm.
                  </p> */}
                  <div className="home-list">
                    {/* <p className="home-list-type">1. </p> */}
                    <img src={File} />
                    <p className="home-list-text">Upload your file.</p>
                  </div>
                  <div className="home-list">
                    {/* <p className="home-list-type">2. </p> */}
                    <img src={LocationList} />
                    <p className="home-list-text">Choose your Print Agent.</p>
                  </div>
                  <div className="home-list">
                    {/* <p className="home-list-type">3. </p> */}
                    <img src={Printing} />
                    <p className="home-list-text">
                      Use your secure confirmation code to print your documents.
                    </p>
                  </div>
                  <button
                    className="get-started-btn"
                    onClick={() => setSignUpModal(true)}
                  >
                    Get Started
                  </button>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="home-form-main">
                  <p className="home-input-title">Print Job Title</p>
                  <div className="home-input-main">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      value={printName}
                      required
                      onChange={(val) => setPrintName(val.target.value)}
                    />
                  </div>
                  <p className="home-input-title">Email</p>
                  <div className="home-input-main">
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={printEmail}
                      required
                      onChange={(val) => setPrintEmail(val.target.value)}
                    />
                  </div>
                  <p className="home-input-title">Upload Files</p>
                  {files && files.length > 0
                    ? files.map((file) => (
                        <p
                          className=""
                          style={{
                            marginTop: "5px",
                            marginBottom: "5px",
                            marginRight: "20px",
                            whiteSpace: "break-spaces",
                          }}
                        >
                          {file.name}
                        </p>
                      ))
                    : null}

                  <FileUpload setfiles={setfiles} files={files} />
                  {/* <label className="upload-button">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => setPrintFile(e.target.files[0].name)}
                    />
                    <img src={Upload} />
                    <p className="upload-button-title">
                      Drag and drop or <span>choose file</span> to upload
                    </p>
                    <p className="upload-button-format">
                      Format Supports: Jpeg, PNG, Word and pdf
                    </p>
                  </label> */}
                  <p className="home-input-title">Copy and Paste Text Below</p>
                  <div className="home-textarea-main">
                    <textarea
                      placeholder="Enter text"
                      value={printText}
                      onChange={(val) => setPrintText(val.target.value)}
                    ></textarea>
                  </div>

                  {/* <div className="color_container">
                    <p>Color Print</p>
            <Checkbox
                {...label}
                checked={isChecked}
                onChange={handleChange}
            />
        </div> */}

                  <div className="home-form-submit-btn">
                    <button onClick={() => setCounter(true)}>Submit</button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      </Grid>
      <div className="home-empty-box" />
      <Footer />
      {/* login modal */}
      <Model
        open={loginModal}
        onClose={() => setLoginModal(false)}
        maxWidth="xs"
      >
        <p className="modal-from-heading">Welcome👋 </p>
        <p className="modal-from-title">Please login here.</p>
        <div style={{ display: "flex" }}>
          <div className="modal-type-main">
            <button
              onClick={() => setLoginType("Customer")}
              className={
                loginType === "Customer"
                  ? "modal-type-selected-btn"
                  : "modal-type-btn"
              }
            >
              Customer
            </button>
            <button
              onClick={() => setLoginType("Agent")}
              className={
                loginType === "Agent"
                  ? "modal-type-selected-btn"
                  : "modal-type-btn"
              }
            >
              Agent
            </button>
          </div>
        </div>
        <Input
          password={false}
          title="Email"
          type="email"
          placeholder="john@example.com"
          value={loginEmail}
          onChange={(val) => setLoginEmail(val.target.value)}
        />
        <Input
          password={true}
          title="Password"
          show={showLoginPassword}
          type={!showLoginPassword ? "password" : "text"}
          placeholder="••••••••••••••••"
          value={loginPassword}
          onChange={(val) => setLoginPassword(val.target.value)}
          passwordHideShowHandler={() =>
            setShowLoginPassword(!showLoginPassword)
          }
        />
        <div className="remember-main">
          <button onClick={() => setRemember(!remember)}>
            <div style={{ backgroundColor: remember ? "#F7801A" : "#fff" }}>
              {remember && <FaCheck style={{ color: "#fff" }} />}
            </div>
            <p>Remember me</p>
          </button>

          <Link
            className="forget-password-link"
            onClick={() => {
              setLoginModal(false);
              setForgotPasswordModal(true);
            }}
          >
            Forget Password?
          </Link>
        </div>
        <Button
          disabled={login_loading}
          title={login_loading ? <Btnloader /> : "Login"}
          onClick={loginHandler}
        />
        <SocialButton />
        <p className="modal-form-footer">
          Don’t have an account?{" "}
          <Link
            className="modal-form-footer-link"
            onClick={() => {
              setLoginModal(false);
              setSignUpModal(true);
            }}
          >
            Sign up
          </Link>
        </p>
      </Model>
      {/* sign up modal */}
      <Model
        open={signUpModal}
        onClose={() => setSignUpModal(false)}
        maxWidth="xs"
      >
        <p className="modal-from-heading">Registration👋 </p>
        <p className="modal-from-title">Sign up here.</p>
        <div style={{ display: "flex" }}>
          <div className="modal-type-main">
            <button
              onClick={() => setLoginType("Customer")}
              className={
                loginType === "Customer"
                  ? "modal-type-selected-btn"
                  : "modal-type-btn"
              }
            >
              Customer
            </button>
            <button
              onClick={() => setLoginType("Agent")}
              className={
                loginType === "Agent"
                  ? "modal-type-selected-btn"
                  : "modal-type-btn"
              }
            >
              Agent
            </button>
          </div>
        </div>
        <Input
          password={false}
          title="Full Name"
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(val) => setFullName(val.target.value)}
        />
        <Input
          password={false}
          title="Email"
          type="email"
          placeholder="john@example.com"
          value={signupEmail}
          onChange={(val) => setSignUpEmail(val.target.value)}
        />
        {loginType === "Agent" && (
          <div>
            <Input
              password={false}
              title="Zip Code"
              type="text"
              placeholder="Zip Code"
              value={zip_code}
              onChange={(val) => setzip_code(val.target.value)}
            />

            <Input
              password={false}
              title="Business Name"
              type="text"
              placeholder="Business Name"
              value={businessname}
              onChange={(val) => setbusinessname(val.target.value)}
            />
            <Dropdown
              title="Business Type"
              placeholder="Select BusinessType"
              data={[
                "Restaurant",
                "Grocery (fresh products, penshacies, shelf stable foods, dairy goods, pre- packaged meals)",
                "Alcohol",
                "Convenience (everyday products, shell-stable products, hat food / ready to eat)",
                "Flower Shop",
                "Pet Store",
                "Retail",
              ]}
              value={business_type}
              onChange={(text) => setbusiness_type(text.value)}
            />
          </div>
        )}
        <Input
          password={true}
          title="Password"
          show={showSignUpPassowrd}
          type={!showSignUpPassowrd ? "password" : "text"}
          placeholder="••••••••••••••••"
          value={signUpPassword}
          onChange={(val) => setSignUpPassword(val.target.value)}
          passwordHideShowHandler={() =>
            setShowSignUpPassowrd(!showSignUpPassowrd)
          }
        />
        <Input
          password={true}
          title="Confirm Password"
          show={showSignUpComfirmPassowrd}
          type={!showSignUpComfirmPassowrd ? "password" : "text"}
          placeholder="••••••••••••••••"
          value={signUpConfirmPassword}
          onChange={(val) => setSignUpConfirmPassword(val.target.value)}
          passwordHideShowHandler={() =>
            setShowSignUpComfirmPassowrd(!showSignUpComfirmPassowrd)
          }
        />
        <Button
          disabled={signup_loading}
          title={signup_loading ? <Btnloader /> : "Sign up"}
          onClick={signUpHandler}
        />

        <SocialButton />
        <p className="modal-form-footer">
          Already have an account?
          <Link
            className="modal-form-footer-link"
            onClick={() => {
              setSignUpModal(false);
              setLoginModal(true);
            }}
          >
            Log in
          </Link>
        </p>
      </Model>
      {/* Confirm your email */}
      <Model
        open={confirmEmailModal}
        onClose={() => setConfirmEmailModal(false)}
        maxWidth="sm"
      >
        <div className="confirm-email-modal-header">
          <img src={Close} onClick={() => setConfirmEmailModal(false)} />
        </div>
        <div className="modal-icon">
          <img src={SecurityUser} />
        </div>
        <p className="confirm-email-modal-heading">Confirm your email</p>
        <p className="confirm-email-modal-text">
          Just one quick check to make sure you’re really you.
        </p>
        <p className="confirm-email-modal-text">
          We’ve sent a verification link to <span>{signupEmail}</span>.If you
          can’t find it then check your spam.
        </p>
        <div className="modal-icon">
          <button
            className="its-me-btn"
            onClick={() => {
              setConfirmEmailModal(false);
              setVerifyModal(true);
            }}
          >
            Confirm
          </button>
        </div>
      </Model>
      {/* verify email */}
      <Model
        open={verifyModal}
        onClose={() => setVerifyModal(false)}
        maxWidth="sm"
      >
        <div className="confirm-email-modal-header">
          <img src={Close} onClick={() => setVerifyModal(false)} />
        </div>
        <div className="modal-icon">
          <img src={Verify} height={100} />
        </div>
        <p className="confirm-email-modal-heading">Verify your email address</p>
        <p className="confirm-email-modal-text">
          You've entered <span>{signupEmail}</span> as the email address for
          your account. Please verify this email address by clicking button
          below.
        </p>
        <div className="modal-icon">
          <button
            className="its-me-btn"
            onClick={() => {
              setVerifyModal(false);
              setVerificationModal(true);
            }}
          >
            Yes, It's me
          </button>
        </div>
      </Model>
      {/* Verification Code */}
      <Model
        open={verificationModal}
        onClose={() => setVerificationModal(false)}
        maxWidth="sm"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setVerificationModal(false);
              setVerifyModal(true);
              window.location.reload(false);
            }}
          >
            <img src={ArrowLeft} />
            <p>Close</p>
          </button>
        </div>

        <p
          className="confirm-email-modal-heading"
          style={{ textAlign: "left" }}
        >
          Verification Code
        </p>
        <p className="verification-text">
          We have shared a 6 digits code of your registered email address{" "}
          {signupEmail}
        </p>
        <div className="otp-div">
          <OtpInput
            value={otp}
            onChange={setOtp}
            placeholder="0"
            numInputs={6}
            renderInput={(props) => <input {...props} placeholder="0" />}
            isInputNum={true}
            shouldAutoFocus={true}
            containerStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            inputStyle="otp-input"
            focusStyle={{
              border: "1px solid #CFD3DB",
              outline: "none",
            }}
          />
        </div>
        <Button
          title="Verify"
          onClick={() => {
            setVerificationModal(false);
            if (loginType === "Customer") {
              otp_verifyHandler();
            } else {
              // setLinkBankAccountModal(true);
              agent_otp();
            }
          }}
        />
      </Model>
      {/* Print Job 001 */}
      <Model
        open={printJonModal}
        onClose={() => setPrintJobModal(false)}
        maxWidth="sm"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setPrintJobModal(false);
              // setVerificationModal(true);
              window.location.reload(false);
            }}
          >
            <img src={ArrowLeft} />
            <p>Close</p>
          </button>
        </div>

        <div className="modal-header">
          <p className="modal-header-heading">
            {Printed_file?.print_job_title}
          </p>
          <p className="modal-header-page">Pages: {Printed_file?.pages}</p>
        </div>
        {/* <img src={Invoice} width={"100%"} style={{ marginTop: "20px" }} /> */}
        {Printed_file ? (
          <FileRenderer
            file={Printed_file}
            numPages={numPages}
            setNumPages={setNumPages}
          />
        ) : null}

        <label className="download-btn">
          <input type="file" hidden />
          <div>
            <img src={Pdf} />
            <div className="file_name">
              <p className="file_name">{Printed_file?.file_path} </p>
              <p className="download-size">
                File Size: {Number(files[0]?.size) / (1024 * 1024).toFixed(2)}
              </p>
            </div>
          </div>
          {/* <img src={Download} /> */}
        </label>

        <p className="input-title">Title</p>
        <div className="modal-textarea">
          <textarea value={Printed_file?.print_job_title}></textarea>
        </div>
        {/* <p className="input-title">Message</p>
        <div className="modal-textarea">
          <textarea value={Printed_file?.print_job_description}></textarea>
        </div> */}
        <div className="modal-footer-btn">
          <button
            className="modal-footer-start-btn"
            onClick={() => {
              setPrintJobModal(false);
            }}
          >
            Start Over
          </button>
          <button
            className="modal-footer-next-btn"
            onClick={() => {
              setPrintJobModal(false);
              setSearchingModal(true);
            }}
          >
            Next
          </button>
        </div>
      </Model>
      {/* Counter ui */}
      <Model open={Counter} onClose={() => setCounter(false)} maxWidth="sm">
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setCounter(false);
              window.location.reload(false);
              nav("/");
            }}
          >
            <img src={ArrowLeft} alt="Back" />
            <p>Close</p>
          </button>
        </div>

        <div className="modal-header">
          <p className="modal-header-heading">Title: {printName}</p>
        </div>

        <button className="download-btn" style={{ width: "100%" }}>
          <div className="file_info">
            <img src={Pdf} alt="PDF" />
            <div className="file_name">
              <p>{files[0]?.name}</p>
              {files && files.length > 0 ? (
                <p className="download-size">
                  File Size:{" "}
                  {(Number(files[0]?.size) / (1024 * 1024)).toFixed(2)} MB
                </p>
              ) : null}
            </div>
          </div>
        </button>
        <div className="count_heading">
          <div className="para">
            <p>No. of copies:</p>
          </div>

          <div>
            <IncrementDecrement count={count} setCount={setCount} />
          </div>
        </div>

        <div className="print-type-container">
          <label
            htmlFor="printTypeSwitch"
            className="print-type-label"
            style={{ marginRight: "15px" }}
          >
            Print Type:
          </label>
          <Switch
            checked={isColor}
            onChange={handleToggle}
            onColor="#f7801a"
            offColor="#ccc"
            onHandleColor="#fff"
            offHandleColor="#fff"
            handleDiameter={20}
            width={90}
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  fontSize: 12,
                  paddingRight: 2,
                  color: "#000",
                }}
              >
                B&W
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  fontSize: 12,
                  paddingLeft: 6,
                  color: "#fff",
                }}
              >
                Color
              </div>
            }
            id="printTypeSwitch"
          />
        </div>

        <div className="home-form-submit-btn btn-count">
          <button
            onClick={printSubmitHandler}
            disabled={job_loading}
            style={{ width: "100%" }}
          >
            {job_loading ? <Btnloader /> : "Save"}
          </button>
        </div>
      </Model>
      {/* Search Model */}
      <Model
        open={searchingModal}
        onClose={() => setSearchingModal(false)}
        maxWidth="sm"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setSearchingModal(false);
              setPrintJobModal(true);
              window.location.reload(false);
            }}
          >
            <img src={ArrowLeft} />
            <p>Close</p>
          </button>
        </div>
        <p className="searching-heading">Searching Print Agents in your area</p>
        {/*<div className="searching-main">
          <img src={Search2} />
          <input
            placeholder="Enter zip code, city or state"
            value={searchVal}
            onChange={(e) => setsearchVal(e.target.value)}
          />
          <img src={Map} />
        </div> */}

        <div className="modal-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28823.460374453345!2d-80.48738101619446!3d25.44051856350412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9e0cb35a8cf39%3A0xf7bdead0fe918320!2sFlorida%20City%2C%20FL%2C%20USA!5e0!3m2!1sen!2s!4v1730069520065!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div>
          <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "700" }}>
            Available Agents:
          </p>
        </div>
        {/* <div className="current-location">
          <p>Use my current location</p>
          <button>Use Location</button>
        </div> */}
        {currentLocationList.map((val, index) => {
          console.log(val.full_name);
          return (
            <button
              key={index}
              className="current-location-box"
              onClick={() => {
                setSelectedCurrentLocaiton(index);
                setSelectedAgent(val);
              }}
            >
              <div className="current-location-box-left">
                {selectedCurrentLocation === index ? (
                  <MdOutlineRadioButtonChecked
                    color="#F7801A"
                    style={{ height: "16px", width: "16px", marginTop: "5px" }}
                  />
                ) : (
                  <MdOutlineRadioButtonUnchecked
                    color="#F7801A"
                    style={{ height: "16px", width: "16px", marginTop: "5px" }}
                  />
                )}

                <div>
                  <p className="current-location-heading">
                    {index + 1} - {val.business_name}
                  </p>
                  <div className="current-location-time">
                    <img src={Location3} />
                    <p>{val.location.zip_code}</p>
                    <p>{val?.location?.state}</p>
                  </div>
                </div>
              </div>
              <div className="current-location-box-right">
                {/* <img src={LocationWave} /> */}
                {/* <img src={Copy} style={{ marginTop: "10px" }} /> */}
              </div>
            </button>
          );
        })}

        <Button
          title="Save"
          onClick={() => {
            selectPrintAgent();
          }}
        />
      </Model>
      {/* Payment / Add New Card */}
      <Model
        open={paymentModal}
        onClose={() => setPaymentModal(false)}
        maxWidth="sm"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setPaymentModal(false);
              setPrintJobModal(true);
              window.location.reload(false);
            }}
          >
            <img src={ArrowLeft} alt="Back" />
            <p>Close</p>
          </button>
        </div>

        <div className="modal-header">
          <p className="modal-header-heading">
            {Printed_file?.print_job_title}
          </p>
        </div>

        <button className="download-btn">
          <div className="file_info">
            <img src={Pdf} alt="PDF" />
            <div className="file_name">
              <p>{Printed_file?.file_path}</p>
              {files && files.length > 0 ? (
                <p className="download-size">
                  File Size:{" "}
                  {(Number(files[0]?.size) / (1024 * 1024)).toFixed(2)} MB
                </p>
              ) : null}
            </div>
          </div>
          {/* <img src={Download} alt="Download" /> */}
        </button>

        <div className="modal-price-list">
          <p className="modal-price-title">1-{Printed_file?.pages} Pages</p>
          <p className="modal-price-price">
            ${(Printed_file?.total_cost * 0.9).toFixed(2)}
          </p>
        </div>
        <div className="modal-price-list-2">
          <p className="modal-price-title">No. of Copies</p>
          <p className="modal-price-price">{Printed_file?.no_of_copies}</p>
        </div>
        <div className="modal-price-list-2">
          <p className="modal-price-title">Color Print</p>
          <p className="modal-price-price">
            {Printed_file?.is_color ? "Yes" : "No"}
          </p>
        </div>
        <div className="modal-price-list-2">
          <p className="modal-price-title">Service Fee</p>
          <p className="modal-price-price">
            $
            {Printed_file?.total_cost
              ? (Printed_file.total_cost * 0.1).toFixed(2)
              : "0.00"}
          </p>
        </div>

        <div className="modal-price-list-3">
          <p className="modal-price-title">Total</p>
          <p className="modal-price-price">${Printed_file?.total_cost}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <PaymentForm
            id={Printed_file?._id}
            setPaymentModal={setPaymentModal}
            setCodeSendSuccessfullyModal={setCodeSendSuccessfyllyModal}
          />
        </div>
      </Model>
      {/* Code Sent Successfully! */}
      <Model
        open={codeSendSuccessfyllyModal}
        onClose={() => setCodeSendSuccessfyllyModal(false)}
        maxWidth="sm"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setCodeSendSuccessfyllyModal(false);
              // setPaymentModal(true);
              window.location.reload(false);
            }}
          >
            <img src={ArrowLeft} />
            <p>Close</p>
          </button>
        </div>

        <div className="modal-header">
          <p className="modal-header-heading">
            {Printed_file?.print_job_title}
          </p>
          <p className="modal-header-page">{Printed_file?.page}</p>
        </div>
        <button className="download-btn">
          <div className="file_name">
            <img src={Pdf} />
            <div>
              <p className="file_name">{Printed_file?.file_path}</p>
              {files && files.length > 0 ? (
                <p className="download-size">
                  File Size: {Number(files[0]?.size) / (1024 * 1024).toFixed(2)}
                </p>
              ) : null}
            </div>
          </div>
          {/* <img src={Download} /> */}
        </button>
        <div className="modal-price-list">
          <p className="modal-price-title">1-{Printed_file?.pages} Pages</p>
          <p className="modal-price-price">
            ${(Printed_file?.total_cost * 0.9).toFixed(2)}
          </p>
        </div>
        <div className="modal-price-list-2">
          <p className="modal-price-title">No. of Copies</p>
          <p className="modal-price-price">{Printed_file?.no_of_copies}</p>
        </div>
        <div className="modal-price-list-2">
          <p className="modal-price-title">Color Print</p>
          <p className="modal-price-price">
            {Printed_file?.is_color ? "Yes" : "No"}
          </p>
        </div>
        <div className="modal-price-list-2">
          <p className="modal-price-title">Service Fee</p>
          <p className="modal-price-price">
            $
            {Printed_file?.total_cost
              ? (Printed_file.total_cost * 0.1).toFixed(2)
              : "0.00"}
          </p>
        </div>

        <div className="modal-price-list-3">
          <p className="modal-price-title">Total</p>
          <p className="modal-price-price">${Printed_file?.total_cost}</p>
        </div>

        <h1 className="successfully-send-heading">Code Sent Successfully!</h1>
        <p className="successfully-send-text">
          A confirmation code has been sent to your email on file ending in
          ********{" "}
          {loggedIn_use?.email &&
            loggedIn_use.email.split("@")[0].slice(-4) +
              "@" +
              loggedIn_use.email.split("@")[1]}
        </p>
        {/* <Button
          title=""
          onClick={() => {
            setCodeSendSuccessfyllyModal(false);
            setReceiptModal(true);
          }}
        /> */}
      </Model>
      {loggedIn_use && !loggedIn_use.location ? (
        <Model open={modal} onClose={() => setModal(false)} maxWidth="xs">
          <div className="modal-header">
            <p>Location Details</p>
            <img src={Close} onClick={() => setModal(false)} alt="close" />
          </div>
          {/* <p className="modal-sub-heading">City Details</p> */}

          {/* Controlled Input for City Name */}
          <Input
            title="City Name"
            type="text"
            placeholder="City Name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />

          {/* Controlled Input for State */}
          <Input
            title="State"
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          {/* Controlled Input for Zip Code */}
          <Input
            title="Zip Code"
            type="number"
            placeholder="Zip Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />

          <Input
            title="Country"
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
          />

          {/* Save Button */}

          <Button
            disabled={location_loading}
            onClick={handleSave}
            title="Save"
          />
        </Model>
      ) : null}
      {/* Searching Print Agents in your area */}
      {/* Receipt from Print to Point, LLC */}
      <Model
        open={receiptModal}
        onClose={() => setReceiptModal(false)}
        maxWidth="sm"
      >
        <div className="confirm-email-modal-header">
          <img src={Close} onClick={() => setReceiptModal(false)} />
        </div>
        <p className="receipt-heading">Receipt from Print to Point, LLC</p>
        <p className="receipt-id">Receipt# 2145-5423</p>
        <p className="receipt-date">29 July, 2024, 8:50 PM</p>
        <p className="receipt-summary">Summary</p>
        <div className="modal-price-list">
          <p className="modal-price-title">Payment</p>
          <p className="modal-price-price">Paid</p>
        </div>
        <div className="modal-price-list" style={{ marginTop: "0px" }}>
          <p className="modal-price-title">Card Type</p>
          <p className="modal-price-price">Visa</p>
        </div>
        <div className="modal-price-list-3" style={{ marginTop: "0px" }}>
          <p className="modal-price-title">Card Number</p>
          <p className="modal-price-price">**** 5678</p>
        </div>
        <div className="modal-price-list" style={{ marginTop: "0px" }}>
          <p className="modal-price-title">Pages</p>
          <p className="modal-price-price">2</p>
        </div>
        <div className="modal-price-list" style={{ marginTop: "0px" }}>
          <p className="modal-price-title">Amount Charged</p>
          <p className="modal-price-price">$6.14</p>
        </div>
        <p className="successfully-send-text" style={{ marginTop: "30px" }}>
          If you have any questions, contact us at support@printtopoint.com or
          call us at +1 561-234-5912.
        </p>
      </Model>
      {/* Forgot Password */}
      <Model
        open={forgotPasswordModal}
        onClose={() => setForgotPasswordModal(false)}
        maxWidth="sm"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button className="back-button" onClick={() => {}}>
            <img src={ArrowLeft} />
            <p>Back</p>
          </button>
        </div>

        <p
          className="confirm-email-modal-heading"
          style={{ textAlign: "left" }}
        >
          Forgot Password
        </p>
        <p className="verification-text">
          Enter your registered email address. we will send you a code to reset
          your password.
        </p>
        <Input
          title="Email"
          value={forgetEmail}
          onChange={(e) => setforgetEmail(e.target.value)}
          placeholder="john@example.com"
        />

        <Button
          title={forgot_loading ? <Btnloader /> : "Send OTP"}
          disabled={forgot_loading}
          onClick={() => {
            foreget_passowrd();
          }}
        />
      </Model>
      {/* password otp */}
      <Model
        open={passwordOtpMoadal}
        onClose={() => setPasswrodOtpModal(false)}
        maxWidth="sm"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setPasswrodOtpModal(false);
              setForgotPasswordModal(true);
            }}
          >
            <img src={ArrowLeft} />
            <p>Back</p>
          </button>
        </div>

        <p
          className="confirm-email-modal-heading"
          style={{ textAlign: "left" }}
        >
          Enter the OTP
        </p>
        <p className="verification-text">
          We have shared a code of your registered email address {forgetEmail}
        </p>
        <div className="otp-div">
          <OtpInput
            value={otp}
            onChange={setOtp}
            placeholder="0"
            numInputs={6}
            renderInput={(props) => <input {...props} placeholder="0" />}
            isInputNum={true}
            shouldAutoFocus={true}
            containerStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            inputStyle="otp-input"
            focusStyle={{
              border: "1px solid #CFD3DB",
              outline: "none",
            }}
          />
        </div>
        <Button
          disabled={otp_loading}
          title={otp_loading ? <Btnloader /> : "Verify"}
          onClick={() => {
            otp_Verify();
          }}
        />
      </Model>
      {/* New passowrd */}
      <Model
        open={newPasswordModal}
        onClose={() => setnewPasswordModal(false)}
        maxWidth="sm"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setPasswrodOtpModal(true);
              setnewPasswordModal(false);
            }}
          >
            <img src={ArrowLeft} />
            <p>Back</p>
          </button>
        </div>

        <p
          className="confirm-email-modal-heading"
          style={{ textAlign: "left" }}
        >
          Forgot Password
        </p>
        <p className="verification-text">Enter your New passowrd.</p>
        {/* <Input password={true} title="Passowrd" value={forgetEmail} onChange={(e) => setforgetEmail(e.target.value)} placeholder="john@example.com" /> */}

        <Input
          password={true}
          title="Password"
          show={showLoginPassword}
          type={!showLoginPassword ? "password" : "text"}
          placeholder="••••••••••••••••"
          value={forgotPassword}
          onChange={(val) => setforgotPassword(val.target.value)}
          passwordHideShowHandler={() =>
            setShowLoginPassword(!showLoginPassword)
          }
        />

        <Button
          title={newpassowrd_loading ? <Btnloader /> : "SUBMIT"}
          disabled={newpassowrd_loading}
          onClick={() => {
            new_passord_handler();
          }}
        />
      </Model>
      {/* Password update Successful */}
      <Model
        open={passwordUpdateSuccModal}
        onClose={() => setPasswordUpdateSuccModal(false)}
        maxWidth="xs"
      >
        <div className="modal-icon">
          <img src={Success} height={100} />
        </div>
        <p className="password-update-successful">Password update Successful</p>
        <p className="verification-text" style={{ textAlign: "center" }}>
          Your password has been successfully updated
        </p>

        <Button
          title="Return to login"
          onClick={() => {
            setPasswordUpdateSuccModal(false);
            setLoginModal(true);
          }}
        />
      </Model>
      {/* Link your bank account */}
      <Model
        open={linkBankAccountModal}
        onClose={() => setLinkBankAccountModal(false)}
        maxWidth="sm"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setLinkBankAccountModal(false);
              setVerificationModal(true);
            }}
          >
            <img src={ArrowLeft} />
            <p>Back</p>
          </button>
        </div>
        <h1 className="link-bank-account-heading">Link your bank account</h1>
        <p className="link-bank-account-title">Transfer Details</p>
        <Input
          type="text"
          title="Bank Name"
          placeholder="Bank Name"
          value={card.bank_name}
          onChange={(e) => setCard({ ...card, bank_name: e.target.value })}
        />
        <Input
          type="number"
          title="Card Number"
          placeholder="Card Number"
          value={card.card_number}
          onChange={(e) => setCard({ ...card, card_number: e.target.value })}
        />
        <Input
          type="text"
          title="Expiry Date"
          placeholder="MM/YY"
          value={card.expiry_date}
          onChange={(e) => setCard({ ...card, expiry_date: e.target.value })}
        />
        <Input
          type="number"
          title="CVV"
          placeholder="CVV"
          value={card.cvv}
          onChange={(e) => setCard({ ...card, cvv: e.target.value })}
        />
        <Input
          type="Text"
          title="Phone"
          placeholder="+923184111999"
          value={card.phone_number}
          onChange={(e) => setCard({ ...card, phone_number: e.target.value })}
        />
        <Button title="Link Bank Account" onClick={handleCardCreate} />
      </Model>
      {/* Send Money */}
      {/* <Model
        open={sendMoneyModal}
        onClose={() => setSendMoneyModal(false)}
        maxWidth="xs"
      >
        <div
          className="confirm-email-modal-header"
          style={{ justifyContent: "flex-start" }}
        >
          <button
            className="back-button"
            onClick={() => {
              setSendMoneyModal(false);
              setLinkBankAccountModal(true);
            }}
          >
            <img src={ArrowLeft} />
            <p>Back</p>
          </button>
        </div>
        {/* <h1 className="link-bank-account-heading">Send Money</h1>
        <div style={{ display: "flex" }}>
          <div className="modal-type-main">
            <button
              onClick={() => setSendMoneyType("To Yourself")}
              className={
                sendMoneyType === "To Yourself"
                  ? "modal-type-selected-btn"
                  : "modal-type-btn"
              }
            >
              To Yourself
            </button>
            <button
              onClick={() => setSendMoneyType("To Someone Else")}
              className={
                sendMoneyType === "To Someone Else"
                  ? "modal-type-selected-btn"
                  : "modal-type-btn"
              }
            >
              To Someone Else
            </button>
          </div>
        </div>
        <div
          className="send-money-card"
          onClick={() => {
            setSendMoneyModal(false);
            setLoginModal(true);
          }}
        >
          <div>
            <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" />
            <div>
              <p className="send-money-card-name">
                John Doe <span>(**** 5678)</span>
              </p>
              <p className="send-money-card-time">Within 5 working days</p>
            </div>
          </div>
          <MdChevronRight style={{ height: "24px", width: "24px" }} />
        </div>
        <p className="link-bank-account-title">Add an account </p>
        <div
          className="send-money-card"
          id="add-account-card"
          onClick={() => {
            setSendMoneyModal(false);
            navigate("/dashboard");
          }}
        >
          <div style={{ alignItems: "flex-start" }}>
            <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" />
            <div>
              <p className="send-money-card-name">Bank Account</p>
              <p className="send-money-card-time">
                Free transfers up to $2,000,
              </p>
              <p className="send-money-card-time">
                Arrives within 5 business days.
              </p>
            </div>
          </div>
          <MdChevronRight style={{ height: "24px", width: "24px" }} />
        </div> 
      </Model> */}
    </div>
  );
};
export default Home;
