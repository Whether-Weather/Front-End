import background from '../assets/top-10-background.jpeg';
import React from "react";
  
const About = () => {
  const rows = [
    {num: 1},
    {num: 2},
    {num: 3},
    {num: 4},
    {num: 5},
    {num: 6},
    {num: 7},
    {num: 8},
    {num: 9},
    {num: 10},
  ];
  return (
    <div>
        <div className="background-image-container">
            <img src={background} className="background-image" alt="logo" />
            <div className="background-text">Top 10 Dangerous Roads</div>
        </div>
        <div className="body-content-area">
          <table className="top-10-table">
            <thead className="table-head">
              <tr>
                <td>
                  No.
                </td>
                <td>
                  Name
                </td>
              </tr>
            </thead>
            {rows.map(row => (
              <tr key={row.num} className="table-td">
                <td className="table-td">
                  {row.num}
                </td>
                <td className="table-td">
                  {row.num}
                </td>
              </tr>
            ))}
          </table>
        </div>
    </div>
  );
};
  
export default About;