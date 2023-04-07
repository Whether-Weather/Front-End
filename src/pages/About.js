import background from '../assets/home-background.png';
import React from "react";
  
const About = () => {
  return (
    <div>
        <div className="background-image-container">
            <img src={background} className="background-image" alt="logo" />
            <div className="background-text">About Us</div>
        </div>
        <div className="grid">
          <header>
            <h2 className="about-us-title">
              <b>Enhancing Transportation Safety in Harsh Weather Conditions</b>
            </h2>
          </header>
          <div className="about-us-content">
            <p> 
            On average, nearly 5,000 people are killed and over 418,000 people are injured in weather-related crashes each year. These numbers are likely to increase over time when one considers increases in erratic weather behavior due to climate change.
            </p>
            <p>
            We want to create a website/platform to analyze the relationship between harsh weather and transportation safety. Specifically, our platform will aim to analyze how a variety of weather conditions impact the statistical safety of every segment of road within certain geographical regions. 
            </p>
            
          </div>
          
          

       </div>
    </div>

);
};
  
export default About;