import '../App.css';
import logo from '../assets/logo.svg';
import {Link} from "react-router-dom";

const pages = [
    {
        name: 'About Us',
        link: '/#/about',
    },
    {
        name: 'Data Findings',
        link: '/#/dataFindings',
    },
    {
        name: 'Top 10 Roads',
        link: '/#/top10',
    },
    {
        name: 'Live Map',
        link: '/#/liveMap',
    },
    {
        name: 'Machine Learning Map',
        link: '/#/mlMap',
    },
]

function Navbar() {
  return (
    <div className="navbar-content-area">
        <div className="navbar-containers">
            <div className="navbar-page-titles-container">
                {/* <img src={logo} className="company-logo" alt="logo" /> */}
                <Link to='/'> <img src={logo} className="company-logo" alt="logo"/> </Link>
                <Link to='/' className="navbar-company-logo-text">Whether Weather</Link>
            </div>
            <div className="navbar-page-titles-container">
                {pages.map((item, index)=>{
                    return <Link to={item.link} key={index} className="navbar-page-titles">{item.name}</Link>
                })}
            </div>
        </div>

    </div>
  );
}

export default Navbar;