import { GeoJsonLayer } from "@deck.gl/layers/typed";
import DeckGL from "@deck.gl/react";
import React, { useEffect, useState } from "react";
import "../App.css";

const DATA_URL = process.env.PUBLIC_URL + "/data/output_file.geojson";

const USMAP = process.env.PUBLIC_URL + "/data/us_states.json";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -120.7401,
  latitude: 47.7511,
  zoom: 7,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
};

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

  const [geojsonData, setGeojsonData] = useState(DATA_URL);
  const layers = [
    new GeoJsonLayer({
      id: "base-map",
      data: USMAP,
      // Styles
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      opacity: 0.4,
      getLineColor: [60, 60, 60],
      getFillColor: [200, 200, 200],
    }),
    new GeoJsonLayer({
      id: "geojson-layer",
      data: geojsonData,
      lineWidthScale: 1,
      lineWidthMinPixels: 2,
      getLineColor: (d) => getColor(d.properties),
      getPointRadius: 2,
      getLineWidth: 3,
      visible: true,
    }),
  ];

  const [rain, setRain] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    console.log("Rain has changed:", rain);
    console.log("Temperature has changed:", temperature);
    console.log("Humidity has changed:", humidity);
  }, [rain, temperature, humidity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      rain: rain,
      temperature: temperature,
      humidity: humidity,
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
          <input type="button" value="+" className="map-zoom-text"></input>
        </div>
        <div className="map-zoom">
          <input type="button" value="-" className="map-zoom-text"></input>
        </div>
        <div className="slidecontainer">
          <form data-testid="survey" onSubmit={handleSubmit}>
            <input
              type="range"
              min="0"
              max="2"
              defaultValue="1"
              class="slider"
              id="myRange"
              step="0.1"
              onChange={(event) => setRain(event.target.value)}
            ></input>
            <div className="profile-settings-text">Rain: {rain}</div>
            <input
              type="range"
              min="-20"
              max="40"
              defaultValue="32"
              class="slider"
              id="myRange"
              step="1"
              onChange={(event) => setTemperature(event.target.value)}
            ></input>
            <div className="profile-settings-text">
              Temperature: {temperature}
            </div>
            <input
              type="range"
              min="1"
              max="100"
              defaultValue="50"
              class="slider"
              id="myRange"
              step="1"
              onChange={(event) => setHumidity(event.target.value)}
            ></input>
            <div className="profile-settings-text">Humidity: {humidity}</div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="deckgl-container">
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
        />
      </div>
    </div>
  );
}

export default MLMap;
