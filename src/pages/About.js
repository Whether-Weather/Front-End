import background from '../assets/home-background.png';
import React from "react";
  
const About = () => {
  return (
    <div>
        <div className="background-image-container">
            <img src={background} className="background-image" alt="logo" />
            <div className="background-text">About Us</div>
        </div>
        <div className="body-content-area">
          <p className="body-block-text"> 
          Harsh weather conditions pose a threat to transportation safety and human lives. While there are many transportation based institutions, products, and policies for safe driving in general, we believe that there is still work to be done on the front of driving safety in bad weather conditions. A few examples of a lack of weather based safety measures include, speed limits that are only made for optimal driving conditions but give little guidance when conditions are non-optimal, and the fact that individuals rarely factor rainfall into their trip planning time.
          </p>
          <p className="body-block-text"> 
          On average, <b>nearly 5,000 people are killed</b> and over 418,000 people are injured in weather-related crashes each year. These numbers are likely to increase over time when one considers increases in erratic weather behavior due to climate change.
          </p>
          <p className="body-block-text">
          We want to create a website/platform to analyze the relationship between harsh weather and transportation safety. Specifically, our platform will aim to analyze how a variety of weather conditions impact the statistical safety of every segment of road within certain geographical regions. 
          </p>
          <p className="body-block-text">
          Worsening weather conditions will likely lead to more traffic related injuries and deaths. By compiling and analyzing data on weather and traffic events, we will identify problematic areas of traffic infrastructure under extreme weather. This website will aim help to mitigate the negative impacts of climate change on transportation safety.
          </p>


       </div>
    </div>
  );
};
  
export default About;