import React from "react";
import ImageWithText from '../components/LandingClickable';
import RainyImage from '../assets/RainyWindowAboutUs.png';
import FunnyTrafic from '../assets/FunnyTrafic.png';
import DarkWorld from '../assets/DarkWorld.png';
import LiveGraph from '../assets/LineGraph.png';
import DarkMap from '../assets/DarkMapWithColoredRoads.png';
import SunriseTraffic from '../assets/SunriseTraffic.png';



const pages = [
  {
      name: 'About Us',
      link: '/#/about',
  },
  {
      name: 'Data Findings',
      link: '/#/dataFindings',
  },
  {
      name: 'Top 10 Roads',
      link: '/#/top10',
  },
  {
      name: 'Live Map',
      link: '/#/liveMap',
  },
  {
      name: 'Machine Learning Map',
      link: '/#/mlMap',
  },
]



const Landing = () => {
  return (
    <div className="landing-content-area">
      <div className="landing-top-container">
        <div className="landing-left">
          <div className="landing-left-container">
            <div className="landing-top-content">
              <div className="landing-top-title">The Problem</div>
              <div className="landing-top-text">Harsh weather conditions pose a threat to transportation safety and human lives.</div>
            </div>
            <div className="landing-middle-content">
              <div className="landing-top-title">Why It Matters</div>
              <div className="landing-top-text">Global climate change will cause an increase in extreme weather events and in turn, put more people at risk of danger.</div>
            </div>
            <div className="landing-bottom-content">
              <div className="landing-top-title">Our Solution</div>
              <div className="landing-top-text">We want to create a website/platform to analyze the relationship between harsh weather and transportation safety. The data our platform will be based on can be leveraged to make actionable recommendations during extreme weather events. Worsening weather conditions will likely lead to more traffic related injuries and deaths. By compiling and analyzing data on weather and traffic events, we will identify problematic areas of traffic infrastructure under extreme weather. Our website will help to lessen the negative impacts of climate change on transportation safety.</div>
            </div>
          </div>
        </div>
        <div className="landing-right">
          <img src={SunriseTraffic} className="landing-top-image-container" alt="Sunrise Traffic" />
        </div>
      </div>
      <div className="landing-tiles-container">
        <ImageWithText
        imageUrl={RainyImage}
        altText="about us"
        caption="About Us"
        linkUrl="/#/about"
        />
        <ImageWithText
        imageUrl={LiveGraph}
        altText="findings"
        caption="Data Findings"
        linkUrl="/#/dataFindings"
        />
        <ImageWithText
        imageUrl={FunnyTrafic}
        altText="top 10"
        caption="Top 10 Most Dangerous Roads"
        linkUrl="/#/top10"
        />
        <ImageWithText
        imageUrl={DarkMap}
        altText="live map"
        caption="Live Map"
        linkUrl="/#/liveMap"
        />
        <ImageWithText
        imageUrl={DarkWorld}
        altText="mlm"
        caption="Machine Learning Map"
        linkUrl="/#/mlMap"
        />
      </div>
      <div className="landing-top-container">
        <div className="landing-top-content">
          <div className="landing-bottom-text">If you would like to learn more about whether weather and keep up to date with our findings feel free to contact us directly or continue to check in on our live map.</div>
        </div>
      </div>
    </div>
  );
};
  
export default Landing;