import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginRegister from './components/Login/LoginRegister';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Packages from './components/Packages/Packages';
import Couriers from './components/Couriers/Couriers';
import PrivateRoute from './PrivateRoute';
import logo from './components/Assets/logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { ToastProvider } from './components/Context/Toast/ToastContext';

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </div>
  );
}

function AppContent() {
  const location = window.location;

  return (
    <>
      {location.pathname !== '/login' && (
        <>
          <Navbar />
          <img className="logo" src={logo} alt="" />
        </>
      )}
      <Routes>
        <Route path="/" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
        <Route path="/packages" element={<PrivateRoute component={Packages} />} />
        <Route path="/couriers" element={<PrivateRoute component={Couriers} />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
