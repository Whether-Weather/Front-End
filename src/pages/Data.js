import React from "react";
import background from "../assets/data-background.png";

const About = () => {
  return (
    <div>
      <div className="background-image-container">
        <img src={background} className="background-image" alt="logo" />
        <div className="background-text">Data Findings</div>
      </div>
      <div className="body-content-area">
        <p className="body-block-text">
          Welcome to the Data Findings section of our website! Here, we present
          the latest information and insights related to weather and traffic
          data. Our team of experts regularly analyze and interpret vast amounts
          of data to provide you with valuable insights that can help you make
          informed decisions.{" "}
        </p>
        <p className="body-block-text">
          Stay tuned for updates on:
          <ul>
            <li>Weather patterns and their impact on traffic flow</li>
            <li>Traffic congestion trends in different regions</li>
            <li>Analysis of traffic accidents and their causes</li>
            <li>
              The effectiveness of different traffic management strategies
            </li>
            <li>Real-time traffic updates and predictions</li>
          </ul>
        </p>
        <p className="body-block-text">
          We want to create a website/platform to analyze the relationship
          between harsh weather and transportation safety. Specifically, our
          platform will aim to analyze how a variety of weather conditions
          impact the statistical safety of every segment of road within certain
          geographical regions.
        </p>
        <p className="body-block-text">
          Our goal is to provide you with accurate and up-to-date information
          that can help you navigate the complex world of traffic and weather
          conditions. Whether you're a commuter, a transportation professional,
          or just interested in learning more about this topic, we've got you
          covered. So, bookmark this page and come back often for the latest
          data findings!
        </p>
      </div>
    </div>
  );
};

export default About;
