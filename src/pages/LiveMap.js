import React, { useEffect } from 'react';
import L from 'leaflet';
import axios from 'axios';

import '../App.css';

const DATA_URL = process.env.PUBLIC_URL + '/data/harriscounty.geojson';

function Livemap() {
  useEffect(() => {
    const map = L.map('map').setView([37.7511, -122.7401], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Fetch and add GeoJSON data to the map
    axios.get(DATA_URL).then((response) => {
      const geoJsonData = response.data;

      L.geoJSON(geoJsonData, {
        style: () => {
          return {
            color: '#f00',
            weight: 3,
          };
        },
      }).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div className="map-search">
        <input type="text" placeholder="Search" className="map-search-text"></input>
      </div>
      <div id="map" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export default Livemap;

