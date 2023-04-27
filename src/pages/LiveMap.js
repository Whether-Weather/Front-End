import React from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers/typed'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import '../App.css';


const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson' //eslint-disable-line
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson'

const DATA_URL = process.env.PUBLIC_URL + '/data/harriscounty.geojson';

const USMAP = process.env.PUBLIC_URL + '/data/us_states.json';

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
   
  const layers = [
    
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
      <MapContainer
          center={[INITIAL_VIEW_STATE.latitude, INITIAL_VIEW_STATE.longitude]}
          zoom={INITIAL_VIEW_STATE.zoom}
          style={{ width: '100%', height: '100%', zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
        <DeckGL
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
          viewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={layers}
        />
      </div>
    </div>
  );
}


export default Livemap;

