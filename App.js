import React, { useState } from 'react';
import './HomePage.css';

const products = [
  { id: 1, name: 'Smartphone', price: 299, image: 'mobile.jpg' },
  { id: 2, name: 'Laptop', price: 899, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'shoes', price: 99, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'notes', price: 80, image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Books', price: 89, image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'watches', price: 8919, image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Bags', price: 8199, image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Iphone', price: 80099, image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Eggs', price: 90, image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Bottles', price: 99, image: 'https://via.placeholder.com/150' },
  { id: 11, name: 'pen', price: 50, image: 'https://via.placeholder.com/150' },
  { id: 12, name: 'Pencil', price: 60, image: 'https://via.placeholder.com/150' },
  { id: 13, name: 'Ravi Balls', price: 199, image: 'https://via.placeholder.com/150' },
];

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    alert(`Payment successful using ${paymentMethod}`);
    setCart([]);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>WELCOME TO Flipkart Clone</h1>
        <nav className="nav-bar">
          <button onClick={() => setActiveTab('home')}>Home</button>
          <button onClick={() => setActiveTab('services')}>Services</button>
          <button onClick={() => setActiveTab('contact')}>Contact</button>
          <button onClick={() => setActiveTab('cart')}>Cart ({cart.length})</button>
          <button onClick={() => setActiveTab('profile')}>Profile</button>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </nav>
      </header>

      <div className="content-container">
        {activeTab === 'home' && (
          <>
            <input
              type="text"
              placeholder="Search for products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>${product.price}</p>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'cart' && (
          <div className="tab-content">
            <h2>Shopping Cart</h2>
            {cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <p>{item.name} - ${item.price}</p>
                  </div>
                ))}
                <h3>Select Payment Method</h3>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
                <button onClick={handlePayment}>Proceed to Pay</button>
              </>
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        )}

        {activeTab === 'services' && (
          <div className="tab-content">
            <h2>Our Services</h2>
            <p>We offer fast delivery, customer support, and premium memberships.</p>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="tab-content">
            <h2>Contact Us</h2>
            <p>Email: support@flipkartclone.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="tab-content">
            <h2>Profile</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={() => setIsLoggedIn(false)} />
      )}
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    if (!email || !username || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onLogin({ email, username });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default HomePage;