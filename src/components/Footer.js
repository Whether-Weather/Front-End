import '../App.css';
import logo from '../assets/logo.svg';
import {Link} from "react-router-dom";

const pages = [
    {
        name: 'Privacy Policy',
        link: '/about',
    },
    {
        name: 'Terms of Service',
        link: '/dataFindings',
    },
    {
        name: 'Legal',
        link: '/top10',
    },
    {
        name: 'Connect with Us',
        link: '/liveMap',
    },
    {
        name: '@Copywright 2023 Whether Weather Co.',
        link: '/mlMap',
    },
]

function Footer() {
  return (
    <div className="footer-content-area">
        <div className="navbar-containers">
            <div className="navbar-page-titles-container">
                {pages.map((item, index)=>{
                    return <Link to={item.link} key={index} className="navbar-page-titles">{item.name}</Link>
                })}
            </div>
            <div className="footer-page-titles-container">
                <div className='footer-page-titles'><Link to='/'> <img src={logo} className="company-logo" alt="logo"/> </Link></div>
            </div>
        </div>
    </div>
  );
}

export default Footer;