import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../Styles/payment.css"; // External CSS for better readability

const PaymentSuccess = ({ amount = 100, transactionId = "6343265r" }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/orders");
  };

  return (
    <div className="payment-success-container">
      <FaCheckCircle className="payment-success-icon" />
      <h1 className="payment-success-title">Payment Successful!</h1>
      <p className="payment-success-message">
        Thank you for your payment. Your transaction was successful.
      </p>
    
      <button onClick={handleHomeClick} className="payment-success-button">
        Go To My Order
      </button>
    </div>
  );
};

export default PaymentSuccess;
