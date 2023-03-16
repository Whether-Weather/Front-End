import React from "react";
import ImageWithText from '../components/LandingClickable';
import RainyImage from '../assets/RainyWindowAboutUs.png';

const Landing = () => {
  return (
    <div className="body-content-area">
        <ImageWithText
        imageUrl={RainyImage}
        altText="NOT OK"
        caption="About Us"
        linkUrl="/about"
        />
        <div className="body-container">
        </div>
        <div className="body-container">
        </div>
        <div className="body-container">
        </div>
    </div>
  );
};
  
export default Landing;