import '../App.css';
import React from "react";

const ImageWithText = ({imageUrl, altText, caption, linkUrl}) => {
  return (
    <div className="image-with-text-container">
      <a href={linkUrl}>
        <img src={imageUrl} alt={altText} />
        <div className="caption">{caption}</div>
      </a>
    </div>
  );
};

export default ImageWithText;