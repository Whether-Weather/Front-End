import background from '../assets/top-10-background.jpeg';
import React from "react";
  
const About = () => {
  const rows = [
    {num: 1, name: "Pacific Coast Highway (California)", score: 100},
    {num: 2, name: "Great Ocean Road (Victoria, Australia)", score: 90},
    {num: 3, name: "Saddle Road (Hawaii)", score: 89},
    {num: 4, name: "Going-to-the-Sun Road (Montana)", score: 80},
    {num: 5, name: "Interstate 70 (Colorado)", score: 79},
    {num: 6, name: "Dalton Highway (Alaska)", score: 60},
    {num: 7, name: "Beartooth Highway (Wyoming/Montana)", score: 59},
    {num: 8, name: "Highway 1 (Iceland)", score: 50},
    {num: 9, name: "Trans-Canada Highway (British Columbia)", score: 49},
    {num: 10, name: "Amalfi Coast Road (Italy)", score: 40},
  ];
  return (
    <div>
        <div className="background-image-container">
            <img src={background} className="background-image" alt="logo" />
            <div className="background-text">Top 10 Dangerous Roads</div>
        </div>
        <div className="body-content-area">
          <table className="top-10-table">
            <thead>
              <tr>
                <th>
                  No.
                </th>
                <th>
                  Name
                </th>
                <th>
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.num}>
                  <td>
                    {row.num}
                  </td>
                  <td>
                    {row.name}
                  </td>
                  <td>
                    {row.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};
  
export default About;