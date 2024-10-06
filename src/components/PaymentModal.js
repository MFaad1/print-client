import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import Input from './input';

const PaymentModal = ({ setPaymentModal, setPrintJobModal, setCodeSendSuccessfullyModal,setCard,card,Add_card }) => {


  const [remember, setRemember] = useState(false);
console.log(card, "card")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value
    }));
  };

  return (
    <div>
      <h1 className="modal-payment-heading">Payment / Add New Card</h1>
      <Input type="text" title="Phone Number" placeholder="Phone Number" name="phone_number" value={card.phone_number}
        onChange={handleChange} />

      <Input
        type="text"
        title="Bank Name"
        placeholder="Bank"
        name="bank_name"
        value={card.bank_name}
        onChange={handleChange}
      />
      <Input
        type="text"
        title="Credit Card Number"
        placeholder="XXXX   XXXX   XXXX   XXXX"
        name="card_number"
        value={card.card_number}
        onChange={handleChange}
      />
      <div className="modal-card-input-main">
        <div>
          <Input
            type="text"
            title="Expiry Date"
            placeholder="MM / YY"
            name="expiry_date"
            value={card.expiry_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            type="text"
            title="CVV"
            placeholder="XXX"
            name="cvv"
            value={card.cvv}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="remember-main">
        <button onClick={() => setRemember(!remember)}>
          <div style={{ backgroundColor: remember ? "#F7801A" : "#fff" }}>
            {remember && <FaCheck style={{ color: "#fff" }} />}
          </div>
          <p>Remember me</p>
        </button>
      </div>
      <div className="modal-footer-btn">
        <button
          className="modal-footer-start-btn"
          onClick={() => {
            setPaymentModal(false);
            setPrintJobModal(true);
          }}
        >
          Back
        </button>
        
        <button
          className="modal-footer-next-btn"
          onClick={() => {
            Add_card()
            setPaymentModal(false);
            setCodeSendSuccessfullyModal(true);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
