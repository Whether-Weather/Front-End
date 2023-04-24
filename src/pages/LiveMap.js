import React from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers/typed'
import '../App.css';


const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson' //eslint-disable-line
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson'

const DATA_URL = '/data/output_file.geojson';

const USMAP = '/data/us_states.json'

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.7401,
  latitude: 37.7511,
  zoom: 7,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
// const data = [
//   {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
// ];

// DeckGL react component
function Livemap() {
   
  function colorToRGBArray(speed) {
    if (speed[0] < 30) {
        return [255,0,0];
    }
    else if (speed[0] >= 30 && speed[0] < 50) {
        return [255,128,0];
    }
    else if (speed[0] >= 50 && speed[0] < 70) {
        return [255,255,0];
    }
    else if (speed[0] >= 70 && speed[0] < 80) {
        return [128,255,0];
    }
    else if (speed[0] >= 80) {
        return [0,255,0];
    }
}

  const layers = [
    new GeoJsonLayer({
      id: 'base-map',
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
      id: 'geojson-layer',
      data: DATA_URL,
      lineWidthScale: 1,
      lineWidthMinPixels: 2,
      getLineColor: [250,0,0],//d => colorToRGBArray(d.properties.speed),
      getPointRadius: 2,
      getLineWidth: 3,
      visible: true,
  })
  ];

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
        layers={layers} />
      </div>
    </div>
  );
}


export default Livemap;

