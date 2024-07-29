import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

// Helper function to parse price
const parsePrice = (price) => {
  if (typeof price === 'number') {
    return price;
  }
  
  if (typeof price === 'string') {
    // Remove the dollar sign and parse as float
    const cleanedPrice = price.replace('$', '').trim();
    const parsedPrice = parseFloat(cleanedPrice);
    if (isNaN(parsedPrice)) {
      console.error('Failed to parse price:', price);
      return 0;
    }
    return parsedPrice;
  }

  console.error('Unexpected price format:', price);
  return 0;
};

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + parsePrice(item.price), 0);

  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to the checkout page
  };

  return (
    <div className="my-28 px-4 lg:px-24">
      <h2 className="text-3xl font-bold mb-8">Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-8">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between items-center mb-4">
                <div>
                  <h5 className="text-2xl font-bold">{item.bookTitle}</h5>
                  <p>${parsePrice(item.price).toFixed(2)}</p> {/* Ensure price is a number */}
                </div>
                <button onClick={() => removeFromCart(item._id)} className="px-4 py-2 bg-red-600 text-white rounded">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-2xl font-bold">Total</h5>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <button onClick={clearCart} className="px-4 py-2 bg-red-600 text-white rounded mr-2">Clear Cart</button>
          <button onClick={handleCheckout} className="px-4 py-2 bg-blue-600 text-white rounded">Checkout</button>
        </>
      )}
    </div>
  );
}
