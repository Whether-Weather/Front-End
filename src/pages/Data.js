import React from "react";
import background from "../assets/data-background.png";
import BusyStreet from "../assets/BusyStreet.jpg";
import CrashInTheSun from "../assets/CrashInTheSun.jpg";
import DrivingThroughPuddle from "../assets/DrivingThroughPuddle.jpg";
import FoggyDrive from "../assets/FoggyDrive.jpg";
import rushHour from "../assets/rushHour.jpg";
import dataFindingsImage from "../assets/dataFindingsImage.png";


const Data = () => {
  return (
    <div>    
      
      <div className="background-image-container">
        <img src={background} className="background-image" alt="logo" />
        <div className="background-text">Data Findings</div>
      </div>

      <div className="data-findings-section-container">
        <div className="data-findings-title-over-text"> 
          <div className="data-findings-title">Welcome to our Data Findings page!</div>
          <div className="data-findings-text"> Explore traffic patterns and driving behavior in Seattle and other cities based on data analysis using ML or regression models from INRIX traffic company.</div>  
        </div>
        <img src={dataFindingsImage} className="data-findings-image-container" alt="Data Findings" />
      </div>  
      
      <div className="data-findings-section-container">
        <img src={DrivingThroughPuddle} className="data-findings-image-container" alt="Driving Through A Puddle" /> 
        <div className="data-findings-title-over-text">
          <div className="data-findings-title">Seattle Drivers</div>
          <div className="data-findings-text">Seattle drivers are well-equipped to handle bad weather, as evidenced by the minimal impact of weather conditions on traffic speed.</div>
        </div>
      </div>

      <div className="data-findings-section-container">
        <div className="data-findings-title-over-text">
          <div className="data-findings-title">Santa Clara Drivers</div>
          <div className="data-findings-text">Weather conditions can significantly impact traffic speed in different cities, such as Santa Clara, where drivers may be less experienced in driving in bad weather.</div>
        </div>
        <img src={CrashInTheSun} className="data-findings-image-container" alt="Crash In The Sun" /> 
      </div>
      
      <div className="data-findings-section-container">
        <img src={BusyStreet} className="data-findings-image-container" alt="Rush Hour" /> 
        <div className="data-findings-title-over-text">
          <div className="data-findings-title">What Increases Traffic?</div>
          <div className="data-findings-text">Traffic speed slowdowns are influenced by a complex interplay of factors, including weather conditions and driving culture.</div>
        </div>
      </div>

      <div className="data-findings-section-container">
        <div className="data-findings-title-over-text">
          <div className="data-findings-title">Time Of Day</div>
          <div className="data-findings-text">Time of day has one of the strongest correlations with traffic speed, with the highest slowdowns occurring during rush hour.</div>
        </div>
        <img src={rushHour} className="data-findings-image-container" alt="Crash In The Sun" /> 
      </div>
      
      <div className="data-findings-section-container-bottom">
        <img src={FoggyDrive} className="data-findings-image-container" alt="Driving Through A Puddle" /> 
        <div className="data-findings-title-over-text">
          <div className="data-findings-title">Humidity and Percipitation</div>
          <div className="data-findings-text">Relative humidity has a higher correlation with traffic speed than precipitation, indicating that high humidity can lead to reduced visibility and more cautious driving.</div>
        </div>
      </div>

    </div>
  );
};

export default Data;
