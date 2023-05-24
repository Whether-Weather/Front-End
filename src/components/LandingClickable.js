import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ImageWithText = ({imageUrl, altText, caption, linkUrl}) => {
  return (
      <div className="landing-tile">
        <Link to={linkUrl}>
          <div className="landing-tile-text-container">
            <div className="landing-tile-text">{caption}</div>
          </div>
          <div>
            <img src={imageUrl} className="landing-tiles-image-container" alt={altText} />
          </div>
        </Link>
    </div>
  );
};

export default ImageWithText;
