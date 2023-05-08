import background from '../assets/top-10-background.jpeg';
import React from "react";
  
const About = () => {
  const rows = [
    {num: 1, name: "El Camino Real & California Ave, Palo Alto, CA 94306", score:  69.25},
    {num: 2, name: "US-101 Cloverleaf Interchange 362", score: 21.05},
    {num: 3, name: "CA-85 East Interchange 4", score: 12.75},
    {num: 4, name: "CA-85 exit 6 and Almaden Expressway intersection", score:  11.59},
    {num: 5, name: "US-101 North Exit 386 B", score: 9.91},
    {num: 6, name: "US-101 Cloverleaf Interchange 365", score: 8.88},
    {num: 7, name: "CA-85 East at Exit 8", score: 7.71},
    {num: 8, name: "US-101 Cloverleaf Interchange 366", score: 7.49},
    {num: 9, name: "CA-17 Interchange 22", score: 7.46},
    {num: 10, name: "CA-152 Casa De Fruta Parkway Interchange", score: 7.42},
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
                  Slow-Down Speed (avg speed delta)
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
                    {row.score}  meters per sec
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