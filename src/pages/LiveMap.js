import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, PathLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';




import '../App.css';


// main key = "sk.eyJ1IjoibWVsbG9qZWxsb2ZlbGxvIiwiYSI6ImNsZ3lpaGppMzA5bXYzaXFxNmZyMGl3ajkifQ.RUd8qDlsz8gsgW6bEUEGyg"

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWVsbG9qZWxsb2ZlbGxvIiwiYSI6ImNsZ3loNDZ3YTA5ZTMzZ3A0bnJtYWtucDQifQ.rwhQ-AcBCdf0q-ouG_5kCA';
const DATA_URL = process.env.PUBLIC_URL + '/data/harriscounty.geojson';


const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
//'mapbox://styles/mapbox/dark-v10';
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
//"https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';




const INITIAL_VIEW_STATE = {
  longitude: -95.7401,
  latitude: 29.7511,
  zoom: 7,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

function Livemap() {
  
  const [clickedObject, setClickedObject] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredObject, setHoveredObject] = useState(null);

  const closePopup = () => {
    setClickedObject(null);
    setHoveredObject(null);
  };


  const layers = [
    new GeoJsonLayer({
      id: 'geojson-layer',
      data: DATA_URL,
      lineWidthScale: 1,
      lineWidthMinPixels: 2,
      //getLineColor: [250, 0, 0],
      getFillColor: [255, 255, 255, 0],
      getPointRadius: 2,
      getLineWidth: (d) => d === hoveredObject || d === clickedObject ? 20 : 3, 
      getLineColor: (d) => d === hoveredObject || d === clickedObject ? [250, 0, 0] : [0, 250, 0],
      visible: true,
      pickable: true,
      
      
      onClick: ({ object, x, y }) => {
        if (object) {
          const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
          const offsetX = x > windowWidth / 2 ? -200 : 0;
          const offsetY = y > windowHeight / 2 ? -100 : 0;
          setClickedObject(object);
          setPopupPosition({ x: x + offsetX, y: y + offsetY });
          setShowPopup(true); // Add this line
        } else {
          setClickedObject(null);
        }
      },
      onHover: ({ object }) => {
        setIsHovering(!!object);
        setHoveredObject(object);
      },
      updateTriggers: {
        getLineColor: [hoveredObject],
        getLineWidth: [hoveredObject],
      },
    }),
    new PathLayer({
      id: 'path-hover-layer',
      data: DATA_URL,
      getPath: (d) => d.geometry.coordinates,
      getWidth: (d) => d === hoveredObject || d === clickedObject ? 20 : 0,
      getColor: [0, 0, 0, 0], // Transparent color
      pickable: true,
      onHover: ({ object }) => {
        setIsHovering(!!object);
        setHoveredObject(object);
      },
      updateTriggers: {
        getWidth: [hoveredObject],
      },
    }),
  ];

  const getCursor = ({ isDragging }) => {
    return isHovering ? 'pointer' : (isDragging ? 'grabbing' : 'pointer');
  };

  return (
    <div>
      <div className="map-search">
        <input type="text" placeholder="Search" className="map-search-text"></input>
      </div>
      <div className="map-zoom-container">
        <div className='map-zoom'>
          <input type="button" value="+" className="map-zoom-text"></input>
        </div>
        <div className='map-zoom'>
          <input type="button" value="-" className="map-zoom-text"></input>
        </div>
      </div>
      <div className="deckgl-container">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
          getCursor={getCursor}
        >
          <Map 
            reuseMaps mapStyle={MAP_STYLE} 
            preventStyleDiffing={false} 
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            
          />
        </DeckGL>
      </div>
      {clickedObject && showPopup && 
  <div className="map-popup" style={{
    position: 'fixed',
    top: popupPosition.y,
    left: popupPosition.x,
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
  }}>
    <button 
      onClick={closePopup}
      style={{
        position: 'absolute',
        top: '5px',
        right: '5px',
        background: 'none',
        border: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      &times;
    </button>
    <pre>{JSON.stringify(clickedObject.properties, null, 2)}</pre>
  </div>
}

    </div>
  );
}

export default Livemap;
