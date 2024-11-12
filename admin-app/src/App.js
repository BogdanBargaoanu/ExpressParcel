import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginRegister from './components/Login/LoginRegister';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { ToastProvider } from './components/Context/Toast/ToastContext';

function App() {
  return (
    <div className="App">
      <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
      </Router>
      </ToastProvider>
    </div>
  );
}

export default App;
