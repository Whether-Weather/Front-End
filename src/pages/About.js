import background from '../assets/home-background.png';
import snowyCrash from '../assets/SnowyCrash.jpg';

const About = () => {
  return (
    <div>
      <div className="background-image-container">
        <img src={background} className="background-image" alt="logo" />
        <div className="background-text">About Us</div>
      </div>
      <div className="about-us-content-area">
        <div className="about-us-content">
          <div className="about-us-title">Enhancing Transportation Safety in Harsh Weather Conditions</div>
          <div className="about-us-text">
            <div className="about-us-paragraph"> 
              On average, nearly 5,000 people are killed and over 418,000 people are injured in weather-related crashes each year. These numbers are likely to increase over time when one considers increases in erratic weather behavior due to climate change.
            </div>
            <div className="about-us-paragraph"> 
              We want to create a website/platform to analyze the relationship between harsh weather and transportation safety. Specifically, our platform will aim to analyze how a variety of weather conditions impact the statistical safety of every segment of road within certain geographical regions.
            </div>
          </div>
        </div>
      </div>
      <div className="about-us-bottom">
          <img src={snowyCrash} className="about-us-image-container" alt="Snowy Crash" />
        </div>
    </div>
  );
};

export default About;
