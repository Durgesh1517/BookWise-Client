import React, { useContext, useEffect, useState } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { CartContext } from '../../contexts/CartContext'; // Import the CartContext

export default function Shop() {
  const { loading } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext); // Use the CartContext
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for popup message
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message text
  const navigate = useNavigate();

  // Fetching data
  useEffect(() => {
    fetch('http://localhost:5000/all-books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data);
      });
  }, [loading]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  const handleAddToCart = (book) => {
    const parsedPrice = parseFloat(book.price); // Ensure price is a number
    addToCart({ ...book, price: isNaN(parsedPrice) ? 0 : parsedPrice });
    setPopupMessage(`${book.bookTitle} has been added to your cart.`);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Hide the popup after 3 seconds
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleBuyNow = (book) => {
    navigate('/checkout', { state: { book } });
  };

  // Loader
  if (loading) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <div className='my-28 px-4 lg:px-24'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-3xl font-bold'>All Books are Available Here</h2>
        <div className='relative'>
          <input
            type="text"
            placeholder='Search for a book'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600'
          />
          <svg className='absolute right-2 top-3 w-5 h-5 text-gray-400' fill='currentColor' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fillRule='evenodd' d='M12.9 14.32a8 8 0 111.42-1.42l4.24 4.24a1 1 0 01-1.42 1.42l-4.24-4.24zm-1.4-6.92a6 6 0 100 12 6 6 0 000-12z' clipRule='evenodd' /></svg>
        </div>
      </div>

      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
        {
          filteredBooks.map(book => (
            <Card key={book._id}>
              <img src={book.imageURL} alt={book.bookTitle} className='h-96' />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book.bookTitle}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {book.bookDescription}
              </p>
              <p className="text-gray-600 mt-2">
                Price: {book.price}
              </p>
              <div className="flex justify-between mt-4">
                <button className='px-12 py-2 bg-blue-600 text-white rounded mr-2' onClick={() => handleBuyNow(book)}>Buy Now</button>
                <button onClick={() => handleAddToCart(book)} className='px-12 py-2 bg-green-600 text-white rounded'>Add to Cart</button>
              </div>
            </Card>
          ))
        }
      </div>

      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg">
          {popupMessage}
        </div>
      )}
    </div>
  );
}
