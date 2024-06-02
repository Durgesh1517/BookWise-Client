import React from "react";
import Navbar from "../shared/Navbar"; 
import FooterMain from "../shared/FooterMain";
import "./cart.css";

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1>Your Cart</h1>
        {/* Cart content will go here */}
      </div>
      <FooterMain />
    </>
  );
};

export default Cart;
