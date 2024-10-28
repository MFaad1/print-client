import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from 'axios';


const stripePromise = loadStripe("pk_test_51H31ubHTxsLPmt2xl1NOkurilkbgWSguMRHYP0N2VqVVyLEVOxnFWsF9ZAHGMeAJxBgvhpkpWF0DsniBHzrVPDen008Rr3pFGT");

const PaymentForm = ({ id, setPaymentModal, setCodeSendSuccessfullyModal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let agent_token = localStorage.getItem("use_access_token");

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   setLoading(true);

  //   const { error, paymentMethod } = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: elements.getElement(CardElement),
  //   });

  //   if (error) {
  //     setError(error.message);
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     if (!agent_token) return toast.error("Please login to your account and try again");

  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/printjob/initiate-payment/`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${agent_token}`,
  //       },
  //       body: JSON.stringify({
  //         payment_method_id: paymentMethod.id,
  //         job_id: id,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const text = await response.text();
  //       console.error(text);
  //     }

  //     const result = await response.json();

  //     if (result) {
  //       toast.success("Payment successful! Confirmation Code");
  //       setPaymentModal(false);
  //       setCodeSendSuccessfullyModal(true);
  //     } else {
  //       toast.error("Payment failed: " + result.message);
  //     }
  //   } catch (err) {
  //     if (error.response && error.response.data && error.response.data.message) {
  //       toast.error(error.response.data.message);
  //       console.log(error.response.data.message);
  //     } else if (error.message) {
  //       toast.error(error.message);
  //     } else {
  //       toast.error("Internal server error");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };



const handleSubmit = async (event) => {
  event.preventDefault();
  if (!stripe || !elements) {
    return;
  }

  setLoading(true);

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: "card",
    card: elements.getElement(CardElement),
  });

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  try {
    if (!agent_token) {
      toast.error("Please login to your account and try again");
      return;
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/printjob/initiate-payment/`,
      {
        payment_method_id: paymentMethod.id,
        job_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${agent_token}`,
        },
      }
    );

    const result = response.data;

    if (result) {
      toast.success("Payment successful! Confirmation Code");
      setPaymentModal(false);
      setCodeSendSuccessfullyModal(true);
    } else {
      toast.error("Payment failed: " + result.message);
    }

  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message);
      console.log(err.response.data.message);
    } else if (err.message) {
      toast.error(err.message);
    } else {
      toast.error("Internal server error");
    }
  } finally {
    setLoading(false);
  }
};


  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSmoothing: "antialiased",
        width: "100%",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{marginBottom:'10px', textTransform:'uppercase', color:'#606060'}}>Payment:</h2>
      <div style={{marginBottom:'10px'}}>
        <CardElement options={cardElementOptions} />
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        type="submit"
        className="modal-footer-next-btn"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Next"}
      </button>
    </form>
  );
};

// Parent Component wrapping PaymentForm with <Elements>
const App = ({ id, setPaymentModal, setCodeSendSuccessfullyModal }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        id={id}
        setPaymentModal={setPaymentModal}
        setCodeSendSuccessfullyModal={setCodeSendSuccessfullyModal}
      />
    </Elements>
  );
};

export default App;
