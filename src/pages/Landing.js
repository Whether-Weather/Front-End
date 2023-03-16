import React from "react";
import ImageWithText from '../components/LandingClickable';
import RainyImage from '../assets/RainyWindowAboutUs.png';
import FunnyTrafic from '../assets/FunnyTrafic.png';
import DarkWorld from '../assets/DarkWorld.png';
import LiveGraph from '../assets/LineGraph.png';
import DarkMap from '../assets/DarkMapWithColoredRoads.png'

const Landing = () => {
  return (
    <div className="body-content-area">
        <ImageWithText
        imageUrl={RainyImage}
        altText="about us"
        caption="About Us"
        linkUrl="/about"
        />
        <ImageWithText
        imageUrl={LiveGraph}
        altText="findings"
        caption="Data Findings"
        linkUrl="/dataFindings"
        />
        <ImageWithText
        imageUrl={FunnyTrafic}
        altText="top 10"
        caption="Top 10 Most Dangerous Roads"
        linkUrl="/top10"
        />
        <ImageWithText
        imageUrl={DarkMap}
        altText="live map"
        caption="Live Map"
        linkUrl="/liveMap"
        />
        <ImageWithText
        imageUrl={DarkWorld}
        altText="mlm"
        caption="Machine Learning Maps"
        linkUrl="/mlMap"
        />
    </div>
  );
};
  
export default Landing;