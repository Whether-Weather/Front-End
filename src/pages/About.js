import background from '../assets/home-background.png';
import snowyCrash from '../assets/SnowyCrashCrop.jpg';
import differentWeather from '../assets/DifferentWeather.png';
import roundaboutSnow from '../assets/roundaboutSnow.jpg';
import blurredLights from '../assets/BlurredLightsCropped.jpg';
import josh from '../assets/SuaveJosh.jfif';
import luca from '../assets/Lucas.jfif';
import malcolm from '../assets/Malcolm.jfif';
import graham from '../assets/Graham.jfif'

const TeamMember = ({ imageUrl, linkUrl, name, title }) => {
  return (
    <a href={linkUrl} className="team-member-link">
      <div className="team-member">
        <div className="team-member-img-wrapper">
          <img src={imageUrl} alt={name} className="team-member-img" />
          <div className="team-member-info">
            <div className="team-member-name">{name}</div>
            <div className="team-member-title">{title}</div>
          </div>
        </div>
      </div>
    </a>
  );
};

const About = () => {
  return (
    <div>
      <div className="background-image-container">
        <img src={background} className="background-image" alt="logo" />
        <div className="background-text">About Us</div>
      </div>
      <div className="about-us-section-container">
        <div className="about-us-title-big">Analyzing The Impact of Weather on Transportation Safety</div>
        <img src={differentWeather} className="about-us-image2-container" alt="Different Weather" />
      </div>
      <div className="about-us-section-container">
        <img src={snowyCrash} className="about-us-image2-container" alt="Snowy Crash" /> 
        <div className="about-us-title-over-text">
          <div className="about-us-title">The Problem</div>
          <div className="about-us-text">On average, nearly 5,000 people are killed and over 418,000 people are injured in weather-related crashes each year. These numbers are likely to increase due to climate change.</div>
        </div>
      </div>
      <div className="about-us-section-container">
        <div className="about-us-title-over-text">
          <div className="about-us-title">Our Solution</div>
          <div className="about-us-text"> We want to create a platform to analyze the relationship between weather conditions (such as percipitation, humidity, time of day, temperature etc.)  and transportation safety</div>
        </div>
        <img src={roundaboutSnow} className="about-us-image2-container" alt="Roundabout Snow" />
      </div>
      <div className="about-us-section-container">
        <img src={blurredLights} className="about-us-image2-container" alt="Blurred Lights" />
        <div className="about-us-title-over-text">
          <div className="about-us-title">Future Applications</div>
          <div className="about-us-text"> The data we display can be leveraged to make actionable recommendations such as road maintenance, emergency services planning, trip planning, and car feature selection. </div>
        </div>
      </div>
      <div className="meet-the-team-section">
        <div className="about-us-title-big">Meet the Team</div>
        
        
        <div className="team-members-all-images">
          <div className="team-members-container">
            <TeamMember
            imageUrl={josh}
            name="Josh Kelleran"
            title="Backend Developer"
            linkUrl="https://www.google.com/"/>
            <TeamMember
            imageUrl={graham}
            name="Graham Purvis"
            title="Backend Developer"
            linkUrl="https://www.linkedin.com/in/graham-purvis/"/>
          </div>
          <div className="team-members-container">
            <TeamMember
            imageUrl={luca}
            name="Lucas Voron"
            title="Frontend Developer"
            linkUrl="https://www.linkedin.com/in/lucasvoron/"/>
            <TeamMember
            imageUrl={malcolm}
            name="Malcolm Weaver"
            title="Frontend Developer"
            linkUrl="https://www.linkedin.com/in/malcolm-weaver-a71986212/"/>
          </div>
        </div>
        
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