// import React from 'react';
import { GeoJsonLayer, PathLayer } from "@deck.gl/layers";
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



//'mapbox://styles/mapbox/dark-v10';
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
//"https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

var Current_County = "San Jose, CA"

const counties = ["San Jose, CA", "Harris County, Texas"];

function Livemap() {
  function getColor(properties) {
    if (typeof properties.color !== "undefined") {
      return properties.color;
    }
    return [255, 0, 0];
  }
  const [geojsonData, setGeojsonData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    var data = {county: Current_County};
    setIsLoading(true);
    console.log("https://www.api.whetherweather.org/get-model")
    fetch("https://www.api.whetherweather.org/get-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      
      .then((response) => response.json())
      .then((data) => {
        
        console.log(data)
        setGeojsonData(data.geojson);
        setWeatherData(data.weather)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching geojson data: ", error);
        setIsLoading(false);
      });
  }, []); // empty dependency array to ensure the effect runs only once

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
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      const center = data.features[0].center;

      var desired_county = {
        county: searchQuery,
        map: "LIVEMAP"
      };

      setViewport({
        ...viewport,
        latitude: center[1],
        longitude: center[0],
        zoom: 11,
      });
      console.log(center)
      if (desired_county.county === "Harris County, Texas" || desired_county.county === "San Jose, CA") {
        Current_County = desired_county.county
        setIsLoading(true);
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
          setWeatherData(data.weather);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching geojson data: ", error);
          setIsLoading(false);
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
      id: "geojson-layer",
      data: geojsonData,
      lineWidthScale: 1,
      lineWidthMinPixels: 2,
      //getLineColor: [250, 0, 0],
      getFillColor: [255, 255, 255, 0],
      getPointRadius: 2,
      getLineWidth: (d) =>
        d === hoveredObject || d === clickedObject ? 20 : 3,
      getLineColor: (d) =>
        d === hoveredObject || d === clickedObject
          ? [128, 128, 128]
          : getColor(d.properties),
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
        <div className="weather-container">
          <div className="weather-content">
            <div className="weather-display-text">Current Weather: {}</div>
            {weatherData && Object.entries(weatherData).map(([key, value]) => (
              <div key={key}>
                <div>{key}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
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
          ></Map>
        </DeckGL>
        {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        >
          <div className="spinner"></div> 
        </div>
      )}
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

export default Livemap;
