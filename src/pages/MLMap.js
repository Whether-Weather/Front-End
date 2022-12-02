import background from '../assets/home-background.png';
import React from "react";
  
const About = () => {
  return (
    <div>
        <div className="background-image-container">
            <img src={background} className="background-image" alt="logo" />
            <div className="background-text">Machine Learning Map</div>
        </div>
        <div className="body-content-area">
        </div>
    </div>
  );
};
  
export default About;