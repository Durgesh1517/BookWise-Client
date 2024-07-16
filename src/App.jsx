import { useContext } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './contexts/AuthProvider';
import { CartProvider } from './contexts/CartContext'; // Import the CartProvider
import Navbar from './pages/shared/Navbar';
import FooterMain from './pages/shared/FooterMain';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <CartProvider> {/* Wrap the app with CartProvider */}
      <Navbar />
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <FooterMain />
    </CartProvider>
  );
}

export default App;
