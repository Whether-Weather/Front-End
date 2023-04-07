import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing.js';
import About from './pages/About.js';
import Data from './pages/Data.js';
import Top10 from './pages/Top10.js';
import LiveMap from './pages/LiveMap.js';
import MLMap from './pages/MLMap.js';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' exact element={<Landing />} />
        <Route path='/about' element={<About/>} />
        <Route path='/dataFindings' element={<Data/>} />
        <Route path='/top10' element={<Top10/>} />
        <Route path='/liveMap' element={<LiveMap/>} />
        <Route path='/mlMap' element={<MLMap/>} />
    </Routes>
    </Router>
  );
}

export default App;
