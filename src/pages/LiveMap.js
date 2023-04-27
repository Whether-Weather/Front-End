import React from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';



import '../App.css';


// main key = "sk.eyJ1IjoibWVsbG9qZWxsb2ZlbGxvIiwiYSI6ImNsZ3lpaGppMzA5bXYzaXFxNmZyMGl3ajkifQ.RUd8qDlsz8gsgW6bEUEGyg"

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWVsbG9qZWxsb2ZlbGxvIiwiYSI6ImNsZ3loNDZ3YTA5ZTMzZ3A0bnJtYWtucDQifQ.rwhQ-AcBCdf0q-ouG_5kCA';
const DATA_URL = process.env.PUBLIC_URL + '/data/output_file.geojson';


const MAP_STYLE = 'mapbox://styles/mapbox/streets-v12';
//'mapbox://styles/mapbox/dark-v10';
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
//"https://tiles.basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
//'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';




const INITIAL_VIEW_STATE = {
  longitude: -122.7401,
  latitude: 37.7511,
  zoom: 7,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

function Livemap() {
  
  const layers = [
    new GeoJsonLayer({
      id: 'geojson-layer',
      data: DATA_URL,
      lineWidthScale: 1,
      lineWidthMinPixels: 2,
      getLineColor: [250, 0, 0],
      getPointRadius: 2,
      getLineWidth: 3,
      visible: true,
    }),
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
          layers={layers}
        >
          <Map 
            reuseMaps mapStyle={MAP_STYLE} 
            preventStyleDiffing={false} 
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
    </div>
  );
}

export default Livemap;
