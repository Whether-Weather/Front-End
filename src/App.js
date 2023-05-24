import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import { HashRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Landing from './pages/Landing.js';
import About from './pages/About.js';
import Data from './pages/Data.js';
import Top10 from './pages/Top10.js';
import LiveMap from './pages/LiveMap.js';
import MLMap from './pages/MLMap.js';
import ReactGA from 'react-ga4';

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send('pageview', location.pathname + location.search);
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/about' element={<About/>} />
        <Route path='/dataFindings' element={<Data/>} />
        <Route path='/top10' element={<Top10/>} />
        <Route path='/liveMap' element={<LiveMap/>} />
        <Route path='/mlMap' element={<MLMap/>} />
      </Routes>
      <Footer/>
    </>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
