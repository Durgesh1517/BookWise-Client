import React, { useContext, useEffect, useState } from 'react';
import { Card, Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { CartContext } from '../../contexts/CartContext';

export default function Shop() {
  const { loading } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All'); // New state for category filter
  const [priceRange, setPriceRange] = useState([0, 100]); // New state for price range filter
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
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

  // Filtering books
  useEffect(() => {
    let filtered = books.filter(book =>
      book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(book => book.category === categoryFilter);
    }

    filtered = filtered.filter(book => {
      const price = parseFloat(book.price.replace('$', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setFilteredBooks(filtered);
  }, [searchTerm, categoryFilter, priceRange, books]);

  const handleAddToCart = (book) => {
    const parsedPrice = parseFloat(book.price.replace('$', ''));
    addToCart({ ...book, price: isNaN(parsedPrice) ? 0 : parsedPrice });
    setPopupMessage(`${book.bookTitle} has been added to your cart.`);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleBuyNow = (book) => {
    navigate('/checkout', { state: { book } });
  };

  if (loading) {
    return (
      <div className="text-center mt-28">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <div className='my-28 px-4 lg:px-24'>
      <div className='flex flex-col md:flex-row justify-between items-start mb-8'>
        <h2 className='text-3xl font-bold mb-4'>All Books are Available Here</h2>
        <div className='flex flex-col md:flex-row gap-4 mb-4'>
          <input
            type="text"
            placeholder='Search for a book'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600'
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600'
          >
            <option value="All">All Categories</option>
            {/* Add your categories here */}
            <option value="Fiction">Fiction</option>
            <option value="Fantasy">Fantasy</option>
            {/* Add more options as needed */}
          </select>
          <input
            type="number"
            placeholder='Min Price'
            min="0"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
            className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600'
          />
          <input
            type="number"
            placeholder='Max Price'
            min="0"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
            className='py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600'
          />
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
