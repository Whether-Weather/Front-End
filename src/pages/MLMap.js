import { GeoJsonLayer, PathLayer } from "@deck.gl/layers/typed";
import DeckGL from "@deck.gl/react";
import { Map } from 'react-map-gl';
import React, { useEffect, useState } from "react";
import "../App.css";

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWVsbG9qZWxsb2ZlbGxvIiwiYSI6ImNsZ3loNDZ3YTA5ZTMzZ3A0bnJtYWtucDQifQ.rwhQ-AcBCdf0q-ouG_5kCA';
const DATA_URL = process.env.PUBLIC_URL + '/data/output_file.geojson';
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
// Viewport settings

// Data to be used by the LineLayer
// const data = [
//   {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
// ];

// DeckGL react component
function MLMap() {
  function getColor(properties) {
    if (typeof properties.color !== "undefined") {
      return properties.color;
    }
    return [255, 0, 0];
  }

  const [zoomLevel, setZoomLevel] = useState(11);
  const [latitude, setLatitude] = useState(37.3387);
  const [longitude, setLongitude] = useState(-121.8853); 

  const [clickedObject, setClickedObject] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredObject, setHoveredObject] = useState(null);

  const closePopup = () => {
    setClickedObject(null);
    setHoveredObject(null);
  };

  const onZoomInClick = () => {
    setZoomLevel(zoomLevel + 1);
  };

  const onZoomOutClick = () => {
    setZoomLevel(zoomLevel - 1);
  };

  const INITIAL_VIEW_STATE = {
    longitude: longitude,
    latitude: latitude,
    zoom: zoomLevel,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
  };

  const [searchText, setSearchText] = useState('');

  const [geojsonData, setGeojsonData] = useState(DATA_URL);
  const layers = [
    new GeoJsonLayer({
      id: "geojson-layer",
      data: geojsonData,
      lineWidthScale: 1,
      lineWidthMinPixels: 2,
      getLineWidth: (d) => d === hoveredObject || d === clickedObject ? 20 : 3, 
      getLineColor: (d) => d === hoveredObject || d === clickedObject ? [128, 128, 128] : getColor(d.properties),
      getPointRadius: 2,
      pickable: true,
      visible: true,
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

  const [rain, setRain] = useState(1);
  const [temperature, setTemperature] = useState(10);
  const [humidity, setHumidity] = useState(50);
  const [time, setTime] = useState(12);
  const [dew, setDew] = useState(50);
  const [direction, setDirection] = useState(180);
  const [speed, setSpeed] = useState(50);
  const [pressure, setPressure] = useState(1000);

  useEffect(() => {
    console.log("Rain has changed:", rain);
    console.log("Temperature has changed:", temperature);
    console.log("Humidity has changed:", humidity);
    console.log("Time has changed:", time);
    console.log("Dew Point has changed:", dew);
    console.log("Wind Direction has changed:", direction);
    console.log("Wind Speed has changed:", speed);
    console.log("Air Pressure has changed:", speed);
  }, [rain, temperature, humidity, time, dew, direction, speed, pressure]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      rain: rain,
      temperature: temperature,
      humidity: humidity,
      time: time,
      dew: dew,
      direction: direction,
      speed: speed,
      pressure: pressure,
    };

    fetch("http://localhost:5000/get-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        setGeojsonData(data.geojson);
      })
      .catch((error) => {
        console.error("Error fetching geojson data: ", error);
      });
  };

  return (
    <div>
      <div className="map-search">
        <input
          type="text"
          placeholder="Search"
          className="map-search-text"
        ></input>
      </div>
      <div className="map-zoom-container">
        <div className="map-zoom">
          <input type="button" value="+" className="map-zoom-text" onClick={onZoomInClick}></input>
        </div>
        <div className="map-zoom">
          <input type="button" value="-" className="map-zoom-text" onClick={onZoomOutClick}></input>
        </div>
      </div>
        <div className="slide-form-container">
          <form data-testid="survey" onSubmit={handleSubmit}>
            <div className="slidecontainer">
              <input type="range" min="0" max="2" defaultValue="1" className="slider" id="myRange" step="0.1" onChange={(event) => setRain(event.target.value)}></input>
              <div className="slider-settings-text">Rain: {rain}</div>
            </div>
            <div className="slidecontainer">
              <input type="range" min="0" max="24" defaultValue="12" className="slider" id="myRange" step="1" onChange={(event) => setTime(event.target.value)}></input>
              <div className="slider-settings-text">Time of Day: {time}</div>
            </div>
            <div className="slidecontainer">
              <input type="range" min="-20" max="40" defaultValue="10" className="slider" id="myRange" step="1" onChange={(event) => setTemperature(event.target.value)}></input>
              <div className="slider-settings-text">Temperature: {temperature}</div>
            </div>
            <div className="slidecontainer">
              <input type="range" min="1" max="100" defaultValue="50" className="slider" id="myRange" step="1" onChange={(event) => setHumidity(event.target.value)}></input>
              <div className="slider-settings-text">Humidity: {humidity}</div>
            </div>
            <div className="slidecontainer">
              <input type="range" min="1" max="100" defaultValue="50" className="slider" id="myRange" step="1" onChange={(event) => setDew(event.target.value)}></input>
              <div className="slider-settings-text">Dew Point: {dew}</div>
            </div>
            <div className="slidecontainer">
              <input type="range" min="1" max="360" defaultValue="180" className="slider" id="myRange" step="1" onChange={(event) => setDirection(event.target.value)}></input>
              <div className="slider-settings-text">Wind Direction: {direction}</div>
            </div>
            <div className="slidecontainer">
              <input type="range" min="1" max="100" defaultValue="50" className="slider" id="myRange" step="1" onChange={(event) => setSpeed(event.target.value)}></input>
              <div className="slider-settings-text">Wind Speed: {speed}</div>
            </div>
            <div className="slidecontainer">
              <input type="range" min="900" max="1100" defaultValue="1000" className="slider" id="myRange" step="1" onChange={(event) => setPressure(event.target.value)}></input>
              <div className="slider-settings-text">Air Pressure: {pressure}</div>
            </div>
            <button type="submit" className="slider-submission">Submit</button>
          </form>
        </div>
      <div className="deckgl-container">
        <DeckGL
        initialViewState = {INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getCursor={getCursor}
        // onViewStateChange={onViewStateChange}
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
    <pre>
      {JSON.stringify(clickedObject.properties, null, 2)}
    </pre>
    </div>
  }
      </div>
    );
  }

export default MLMap;
