import background from '../assets/home-background.png';
import snowyCrash from '../assets/SnowyCrashCrop.jpg';
import differentWeather from '../assets/DifferentWeather.png';
import roundaboutSnow from '../assets/roundaboutSnow.jpg';
import blurredLights from '../assets/BlurredLights.jpg';


const About = () => {
  return (
    <div>
      <div className="background-image-container">
        <img src={background} className="background-image" alt="logo" />
        <div className="background-text">About Us</div>
      </div>
      
      <div className="about-us-content-area">
        <div className="about-us-content">
          <img src={differentWeather} className="about-us-image-container" alt="Different Weather" />
          <div className="about-us-title">Analyzing The Impact of Weather on Transportation Safety</div>
        </div>
      </div>
      

      <div className="about-us-content-area">
        <div className="about-us-the-problem-container">
          <div className="about-us-title-over-text">
            <div className="about-us-title">The Problem</div>
            <div className="about-us-text">On average, nearly 5,000 people are killed and over 418,000 people are injured in weather-related crashes each year. These numbers are likely to increase over time when one considers increases in erratic weather behavior due to climate change.</div>
          </div>
          <img src={snowyCrash} className="snowy-crash-image-container" alt="Snowy Crash" /> 
        </div>
      </div>
        
      
      <div className="about-us-content-area">
        <div className="about-us-content">
          <img src={roundaboutSnow} className="about-us-image-container" alt="Roundabout Snow" />
          <div className="about-us-title-over-text">
            <div className="about-us-title">Our Solution</div>
            <div className="about-us-text"> We want to create a platform to analyze the relationship between weather conditions (such as percipitation, humidity, time of day, temperature etc.)  and transportation safety</div>
          </div>
        </div>
      </div>


      <div className="about-us-content">
        <div className="about-us-title-over-text">
          <div className="about-us-title">Future Applications</div>
          <div className="about-us-text"> The data we display can be leveraged to make actionable recommendations such as road maintenance, emergency services planning, trip planning, and car feature selection. </div>
        </div>
        <img src={blurredLights} className="about-us-image-container" alt="Blurred Lights" />
      </div>
    </div>
  );
};

export default About;

{/* <div className="about-us-text">
            <div className="about-us-paragraph"> 
              On average, nearly 5,000 people are killed and over 418,000 people are injured in weather-related crashes each year. These numbers are likely to increase over time when one considers increases in erratic weather behavior due to climate change.
            </div>
            <div className="about-us-paragraph"> 
              We want to create a website/platform to analyze the relationship between harsh weather and transportation safety. Specifically, our platform will aim to analyze how a variety of weather conditions impact the statistical safety of every segment of road within certain geographical regions.
            </div> */}