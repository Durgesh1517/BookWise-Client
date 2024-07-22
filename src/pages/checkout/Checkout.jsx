import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import FooterMain from "../shared/FooterMain";
import "./checkout.css";

const Checkout = () => {
  const location = useLocation();
  const { book } = location.state || {};

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Your order has been placed successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h1>Checkout</h1>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="billing-info">
            <h2>Billing Information</h2>
            <div className="form-group">
              <label htmlFor="billing-name">Name</label>
              <input type="text" id="billing-name" name="billingName" required />
            </div>
            <div className="form-group">
              <label htmlFor="billing-address">Address</label>
              <input type="text" id="billing-address" name="billingAddress" required />
            </div>
            <div className="form-group">
              <label htmlFor="billing-city">City</label>
              <input type="text" id="billing-city" name="billingCity" required />
            </div>
            <div className="form-group">
              <label htmlFor="billing-zip">ZIP Code</label>
              <input type="text" id="billing-zip" name="billingZip" required />
            </div>
          </section>
          <section className="shipping-info">
            <h2>Shipping Information</h2>
            <div className="form-group">
              <label htmlFor="shipping-name">Name</label>
              <input type="text" id="shipping-name" name="shippingName" required />
            </div>
            <div className="form-group">
              <label htmlFor="shipping-address">Address</label>
              <input type="text" id="shipping-address" name="shippingAddress" required />
            </div>
            <div className="form-group">
              <label htmlFor="shipping-city">City</label>
              <input type="text" id="shipping-city" name="shippingCity" required />
            </div>
            <div className="form-group">
              <label htmlFor="shipping-zip">ZIP Code</label>
              <input type="text" id="shipping-zip" name="shippingZip" required />
            </div>
          </section>
          <section className="payment-info">
            <h2>Payment Information</h2>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input type="text" id="card-number" name="cardNumber" required />
            </div>
            <div className="form-group">
              <label htmlFor="card-expiry">Expiry Date</label>
              <input type="text" id="card-expiry" name="cardExpiry" required />
            </div>
            <div className="form-group">
              <label htmlFor="card-cvc">CVC</label>
              <input type="text" id="card-cvc" name="cardCvc" required />
            </div>
          </section>
          <button type="submit" className="checkout-btn">Place Order</button>
        </form>

        {/* Order Overview Section */}
        {book && (
          <section className="order-overview">
            <h2><b>Order Overview</b></h2>
            <div>
              <h3>{book.bookTitle}</h3>
              <p>Price: {book.price}</p>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Checkout;
