import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import FooterMain from "../shared/FooterMain";
import "./checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const [billingInfo, setBillingInfo] = useState({
    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingZip: "",
  });

  const [shippingInfo, setShippingInfo] = useState({
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingZip: "",
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleBillingChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSameAsBillingChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsBilling(isChecked);
    if (isChecked) {
      setShippingInfo({
        shippingName: billingInfo.billingName,
        shippingAddress: billingInfo.billingAddress,
        shippingCity: billingInfo.billingCity,
        shippingZip: billingInfo.billingZip,
      });
    } else {
      setShippingInfo({
        shippingName: "",
        shippingAddress: "",
        shippingCity: "",
        shippingZip: "",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Your order has been placed successfully!");

    // Clear the form fields
    setBillingInfo({
      billingName: "",
      billingAddress: "",
      billingCity: "",
      billingZip: "",
    });
    setShippingInfo({
      shippingName: "",
      shippingAddress: "",
      shippingCity: "",
      shippingZip: "",
    });
    setSameAsBilling(false);

    // Redirect to the shop page after 1 second
    setTimeout(() => {
      navigate("/shop");
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="billing-info mb-8">
            <h2 className="text-2xl font-semibold">Billing Information</h2>
            <div className="form-group">
              <label htmlFor="billing-name">Name</label>
              <input
                type="text"
                id="billing-name"
                name="billingName"
                value={billingInfo.billingName}
                onChange={handleBillingChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="billing-address">Address</label>
              <input
                type="text"
                id="billing-address"
                name="billingAddress"
                value={billingInfo.billingAddress}
                onChange={handleBillingChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="billing-city">City</label>
              <input
                type="text"
                id="billing-city"
                name="billingCity"
                value={billingInfo.billingCity}
                onChange={handleBillingChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="billing-zip">ZIP Code</label>
              <input
                type="text"
                id="billing-zip"
                name="billingZip"
                value={billingInfo.billingZip}
                onChange={handleBillingChange}
                required
                className="form-input"
              />
            </div>
          </section>

          <section className="shipping-info mb-8">
            <h2 className="text-2xl font-semibold">Shipping Information</h2>
            <div className="form-group mb-4">
              <input
                type="checkbox"
                id="same-as-billing"
                checked={sameAsBilling}
                onChange={handleSameAsBillingChange}
                className="form-checkbox"
              />
              <label htmlFor="same-as-billing" className="ml-2">Same as Billing Information</label>
            </div>
            <div className={`form-group ${sameAsBilling ? 'hidden' : ''}`}>
              <label htmlFor="shipping-name">Name</label>
              <input
                type="text"
                id="shipping-name"
                name="shippingName"
                value={shippingInfo.shippingName}
                onChange={handleShippingChange}
                required
                className="form-input"
              />
            </div>
            <div className={`form-group ${sameAsBilling ? 'hidden' : ''}`}>
              <label htmlFor="shipping-address">Address</label>
              <input
                type="text"
                id="shipping-address"
                name="shippingAddress"
                value={shippingInfo.shippingAddress}
                onChange={handleShippingChange}
                required
                className="form-input"
              />
            </div>
            <div className={`form-group ${sameAsBilling ? 'hidden' : ''}`}>
              <label htmlFor="shipping-city">City</label>
              <input
                type="text"
                id="shipping-city"
                name="shippingCity"
                value={shippingInfo.shippingCity}
                onChange={handleShippingChange}
                required
                className="form-input"
              />
            </div>
            <div className={`form-group ${sameAsBilling ? 'hidden' : ''}`}>
              <label htmlFor="shipping-zip">ZIP Code</label>
              <input
                type="text"
                id="shipping-zip"
                name="shippingZip"
                value={shippingInfo.shippingZip}
                onChange={handleShippingChange}
                required
                className="form-input"
              />
            </div>
          </section>

          <section className="payment-info mb-8">
            <h2 className="text-2xl font-semibold">Payment Information</h2>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input
                type="text"
                id="card-number"
                name="cardNumber"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="card-expiry">Expiry Date</label>
              <input
                type="text"
                id="card-expiry"
                name="cardExpiry"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="card-cvc">CVC</label>
              <input
                type="text"
                id="card-cvc"
                name="cardCvc"
                required
                className="form-input"
              />
            </div>
          </section>

          <button type="submit" className="checkout-btn">Place Order</button>
        </form>

        {/* Order Overview Section */}
        {book && (
          <section className="order-overview mt-8">
            <h2 className="text-2xl font-semibold mb-4">Order Overview</h2>
            <div className="p-4 border rounded shadow-lg bg-white">
              <h3 className="text-xl font-bold mb-2">{book.bookTitle}</h3>
              <p className="text-lg">Price: {book.price}</p>
            </div>
          </section>
        )}
      </div>
      
    </>
  );
};

export default Checkout;
