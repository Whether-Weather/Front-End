import background from '../assets/data-background.png';
import React from "react";
  
const About = () => {
  return (
    <div>
        <div className="background-image-container">
            <img src={background} className="background-image" alt="logo" />
            <div className="background-text">Data Findings</div>
        </div>
        <div className="body-content-area">
        </div>
    </div>
  );
};
  
export default About;