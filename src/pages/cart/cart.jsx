import React from 'react';

const Cart = ({ location }) => {
  const { book } = location.state;

  return (
    <div className="my-28 px-4 lg:px-24">
      <h2 className="text-3xl font-bold mb-8">Cart</h2>
      <div className="flex items-center border-b py-2">
        <img src={book.imageURL} alt={book.bookTitle} className="h-16 mr-4" />
        <div>
          <p className="text-xl font-bold">{book.bookTitle}</p>
          <p className="text-gray-600">Price: {book.price}</p>
          <p className="text-gray-600">Quantity: 1</p> {/* Adjust quantity logic if needed */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
