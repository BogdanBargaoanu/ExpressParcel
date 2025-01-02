import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import AwbTrack from './Components/AwbTrack/AwbTrack';
import Track from './Components/Track/Track';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/awbtrack" element={<AwbTrack />} />
          <Route path="/track" element={<Track />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
