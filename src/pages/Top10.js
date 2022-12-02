import background from '../assets/top-10-background.jpeg';
import React from "react";
  
const About = () => {
  return (
    <div>
        <div className="background-image-container">
            <img src={background} className="background-image" alt="logo" />
            <div className="background-text">Top 10 Dangerous Roads</div>
        </div>
        <div className="body-content-area">
        </div>
    </div>
  );
};
  
export default About;