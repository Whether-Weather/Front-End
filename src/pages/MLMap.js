import { GeoJsonLayer, PathLayer } from "@deck.gl/layers/typed";
import DeckGL from "@deck.gl/react";
import React, { useEffect, useState } from "react";

import "../App.css";

import { Map } from "react-map-gl";

import mapboxgl from 'mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const DATA_URL = process.env.PUBLIC_URL + "/data/output_file.geojson";
const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";
// Viewport settings

// Data to be used by the LineLayer
// const data = [
//   {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
// ];

var Current_County = "San Jose, CA"
const counties = ["San Jose, CA", "Harris County, Texas"];

// DeckGL react component
function MLMap() {
  function getColor(properties) {
    if (typeof properties.color !== "undefined") {
      return properties.color;
    }
    return [96, 96, 96];
  }

  const [clickedObject, setClickedObject] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hoveredObject, setHoveredObject] = useState(null);

  const closePopup = () => {
    setClickedObject(null);
    setHoveredObject(null);
  };

  const [viewport, setViewport] = useState({
    latitude: 37.3387,
    longitude: -121.8853,
    zoom: 11,
    maxZoom: 16,
    pitch: 0,
    bearing: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      console.log(searchQuery)
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      const center = data.features[0].center;

      var desired_county ={
        county: searchQuery,
        map: "MLMAP"
      };

      setViewport({
        ...viewport,
        latitude: center[1],
        longitude: center[0],
        zoom: 11,
      });
      if (desired_county.county === "Harris County, Texas" || desired_county.county === "San Jose, CA") {
            Current_County = desired_county.county
            fetch("https://www.api.whetherweather.org/get-new-model", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(desired_county),
          })
            .then((response) => response.json())
            .then((data) => {
              
              setGeojsonData(data.geojson);
            })
            .catch((error) => {
              console.error("Error fetching geojson data: ", error);
            }); 
          }
    } catch (error) {
      console.log(error);
    }
  };

  const [suggestions, setSuggestions] = useState([]);
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    if(event.target.value) {
      const newSuggestions = counties.filter(county => 
        county.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions(counties);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.matches('.map-search-text, .suggestions div')) {
        setSuggestions([]);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
  const handleViewState = ({ viewState }) => {
    setViewport(viewState);
  };

  const [geojsonData, setGeojsonData] = useState(DATA_URL);
  const layers = [
    new GeoJsonLayer({
      id: "geojson-layer",
      data: geojsonData,
      lineWidthScale: 1,
      lineWidthMinPixels: 2,
      getLineWidth: (d) =>
        d === hoveredObject || d === clickedObject ? 20 : 3,
      getLineColor: (d) =>
        d === hoveredObject || d === clickedObject
          ? [128, 128, 128]
          : getColor(d.properties),
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
      id: "path-hover-layer",
      data: DATA_URL,
      getPath: (d) => d.geometry.coordinates,
      getWidth: (d) => (d === hoveredObject || d === clickedObject ? 20 : 0),
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
    return isHovering ? "pointer" : isDragging ? "grabbing" : "pointer";
  };

  const [rain, setRain] = useState(0.0);
  const [temperature, setTemperature] = useState(10);
  const [humidity, setHumidity] = useState(50);
  const [time, setTime] = useState(12);
  const [dew, setDew] = useState(44);
  const [direction, setDirection] = useState(180);
  const [speed, setSpeed] = useState(0);
  const [pressure, setPressure] = useState(1013);

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
      county: Current_County

    };
    fetch("https://www.api.whetherweather.org/get-model", {
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

  useEffect(() => {
    console.log("Rain has changed:", rain);
    console.log("Temperature has changed:", temperature);
    console.log("Humidity has changed:", humidity);
    console.log("Time has changed:", time);
    console.log("Dew Point has changed:", dew);
    console.log("Wind Direction has changed:", direction);
    console.log("Wind Speed has changed:", speed);
    console.log("Air Pressure has changed:", speed);

    // handleSubmit();
    // console.log("that has been called");
  }, [rain, temperature, humidity, time, dew, direction, speed, pressure]);

  return (
    <div>
      <div className="map-search">
        <input
          type="text"
          placeholder="San Jose, CA"
          className="map-search-text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onFocus={() => setSuggestions(counties)}
        ></input>
        <div>
          <button onClick={handleSearch} className="map-search-button">
            Search
          </button>
        </div>
        { suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              onClick={() => {
                setSearchQuery(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      </div>
      <div className="map-zoom-container">
        <div className="map-zoom">
          <input
            type="button"
            value="+"
            className="map-zoom-text"
            onClick={() =>
              setViewport({ ...viewport, zoom: viewport.zoom + 1 })
            }
          />
        </div>
        <div className="map-zoom">
          <input
            type="button"
            value="-"
            className="map-zoom-text"
            onClick={() =>
              setViewport({ ...viewport, zoom: viewport.zoom - 1 })
            }
          />
        </div>
      </div>
      <div className="slide-form-container">
        <form data-testid="survey" onSubmit={handleSubmit}>
          <div className="slidecontainer">
            <input
              type="range"
              min="0"
              max="1"
              defaultValue="0.0"
              className="slider"
              id="myRange"
              step="0.1"
              onChange={(event) => setRain(event.target.value)}
            ></input>
            <div className="slider-settings-text">Rain (in): {rain}</div>
          </div>
          <div className="slidecontainer">
            <input
              type="range"
              min="0"
              max="24"
              defaultValue="12"
              className="slider"
              id="myRange"
              step="1"
              onChange={(event) => setTime(event.target.value)}
            ></input>
            <div className="slider-settings-text">Time of Day (UTC): {time}</div>
          </div>
          <div className="slidecontainer">
            <input
              type="range"
              min="-20"
              max="40"
              defaultValue="10"
              className="slider"
              id="myRange"
              step="1"
              onChange={(event) => setTemperature(event.target.value)}
            ></input>
            <div className="slider-settings-text">
              Temperature (°C): {temperature}
            </div>
          </div>
          <div className="slidecontainer">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="slider"
              id="myRange"
              step="1"
              onChange={(event) => setHumidity(event.target.value)}
            ></input>
            <div className="slider-settings-text">Humidity (%): {humidity}</div>
          </div>
          <div className="slidecontainer">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="44"
              className="slider"
              id="myRange"
              step="1"
              onChange={(event) => setDew(event.target.value)}
            ></input>
            <div className="slider-settings-text">Dew Point (°C): {dew}</div>
          </div>
          <div className="slidecontainer">
            <input
              type="range"
              min="1"
              max="360"
              defaultValue="180"
              className="slider"
              id="myRange"
              step="1"
              onChange={(event) => setDirection(event.target.value)}
            ></input>
            <div className="slider-settings-text">
              Wind Direction (°): {direction}
            </div>
          </div>
          <div className="slidecontainer">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              className="slider"
              id="myRange"
              step="1"
              onChange={(event) => setSpeed(event.target.value)}
            ></input>
            <div className="slider-settings-text">Wind Speed (km/hr): {speed}</div>
          </div>
          <div className="slidecontainer">
            <input
              type="range"
              min="900"
              max="1100"
              defaultValue="1013"
              className="slider"
              id="myRange"
              step="1"
              onChange={(event) => setPressure(event.target.value)}
            ></input>
            <div className="slider-settings-text">Air Pressure (hPa): {pressure}</div>
          </div>
          <button type="submit" className="slider-submission">
            Submit
          </button>
        </form>
      </div>
      <div className="deckgl-container">
        <DeckGL
          initialViewState={viewport}
          controller={true}
          layers={layers}
          getCursor={getCursor}
          onViewStateChange={handleViewState}
        >
          <Map
            reuseMaps
            mapStyle={MAP_STYLE}
            preventStyleDiffing={false}
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            {...viewport}
          />
        </DeckGL>
      </div>
      {clickedObject && showPopup && (
        <div
          className="map-popup"
          style={{
            position: "fixed",
            top: popupPosition.y,
            left: popupPosition.x,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <button
            onClick={closePopup}
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "none",
              border: "none",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
          <div className="pop-up-text">Speed:</div>
          <pre>{JSON.stringify(clickedObject.properties.Speed, null, 2)}</pre>
          <div className="pop-up-text">Reference Speed:</div>
          <pre>
            {JSON.stringify(clickedObject.properties.Reference_Speed, null, 2)}
          </pre>
          <div className="pop-up-text">Percent Difference:</div>
          <pre>
            {JSON.stringify(
              clickedObject.properties.Percent_Difference,
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}

export default MLMap;
