import '../App.css';
import React from "react";

const ImageWithText = ({imageUrl, altText, caption, linkUrl}) => {
  return (
      <div className="landing-tile">
        {/* <a href={linkUrl}> */}
          <div className="landing-tile-text-container">
            <a href={linkUrl}>
              <div className="landing-tile-text">{caption}</div>
            </a>
          </div>
          <div>
            <a href={linkUrl}>
              <img src={imageUrl} className="landing-tiles-image-container" alt={altText} />
            </a>
          </div>
        {/* </a> */}
    </div>
  );
};

export default ImageWithText;