import '../App.css';
import React from "react";

const ImageWithText = ({imageUrl, altText, caption, linkUrl}) => {
  return (
    <div className="landing-background-image-container">
      <a href={linkUrl}>
        <img src={imageUrl} className="body-container" alt={altText} />
        <div className="background-text">{caption}</div>
      </a>
    </div>
  );
};

export default ImageWithText;