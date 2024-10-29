import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginRegister from './components/Login/LoginRegister';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
