import React from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, ArcLayer } from '@deck.gl/layers/typed'
import '../App.css';


const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson' //eslint-disable-line
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson'

// Viewport settings
const INITIAL_VIEW_STATE = {
    latitude: 51.47,
    longitude: 0.45,
    zoom: 4,
    bearing: 0,
    pitch: 30,
  }

// Data to be used by the LineLayer
// const data = [
//   {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
// ];

// DeckGL react component
function Livemap() {
  // Get the height of the navbar
  const navbar = document.querySelector('.navbar-content-area');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  console.log(navbarHeight);

  // Calculate the height of the DeckGL component
  const windowHeight = window.innerHeight;
  const deckglHeight = windowHeight - navbarHeight;

 
  const layers = [
    new GeoJsonLayer({
              id: 'base-map',
              data: COUNTRIES,
              // Styles
              stroked: true,
              filled: true,
              lineWidthMinPixels: 2,
              opacity: 0.4,
              getLineColor: [60, 60, 60],
              getFillColor: [200, 200, 200],
            }),
            new GeoJsonLayer({
              id: 'airports',
              data: AIR_PORTS,
              // Styles
              filled: true,
              pointRadiusMinPixels: 2,
              pointRadiusScale: 2000,
              getFillColor: [200, 0, 80, 180],
              // Interactive props
              pickable: true,
              autoHighlight: true,
              onClick: info =>
                // eslint-disable-next-line
                info.object &&
                alert(
                  `${info.object.properties.name} (${info.object.properties.abbrev})`
                ),
            }),
            new ArcLayer({
              id: 'arcs',
              data: AIR_PORTS,
              dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
              // Styles
              getSourcePosition: () => [-0.4531566, 51.4709959], // London
              getTargetPosition: f => f.geometry.coordinates,
              getSourceColor: [0, 128, 200],
              getTargetColor: [200, 0, 80],
              getWidth: 1,
            }),
  ];

  return (<div className="deckgl-container">
    <DeckGL
      
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers} /></div>);
}


export default Livemap;

