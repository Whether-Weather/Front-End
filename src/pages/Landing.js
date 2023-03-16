import React from "react";
import ImageWithText from '../components/LandingClickable';
  
const Landing = () => {
  return (
    <div className="body-content-area">
        <div className="body-container">
          <ImageWithText
          imageUrl="../assets/RainyWindowAboutUs.png"
          altText="About Us Box"
          caption="About Us"
          linkUrl="/about"
          />
        </div>
        <div className="body-container">
        </div>
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