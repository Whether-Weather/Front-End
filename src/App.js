import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Landing from './pages/Landing.js';
import About from './pages/About.js';
import Data from './pages/Data.js';
import Top10 from './pages/Top10.js';
import LiveMap from './pages/LiveMap.js';
import MLMap from './pages/MLMap.js';
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);


function App() {
  const location = useLocation();

  React.useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
  return (
    <Router>
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
    </Router>
  );
}

export default App;
