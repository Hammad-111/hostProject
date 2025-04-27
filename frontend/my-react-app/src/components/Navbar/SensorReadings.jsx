import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./Home.css";

 const Readings= ()=>{

    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const interval = setInterval(async () => {
          try {
            const res = await axios.get("https://saviotserver.vercel.app/cRead?id=0&roomId=2&homeId=0&username=ammar");
    
            if (res.data.error) {
              console.error("Sensor Error:", res.data.error);
              return; // Stop further execution for this cycle
            }
    
            const reading = res.data.reading;
            const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
            setSensorData((prevData) => [
              ...prevData.slice(-9),
              { time: currentTime, value: reading },
            ]);
          } catch (error) {
            console.error("Error fetching sensor data:", error);
          }
        }, 5000);
    
        return () => clearInterval(interval);
      }, []);
 return (
 <div className="sensor-reading-section">
            <h2>Live Sensor Readings</h2>
            <p>Data updates every 5 seconds</p>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sensorData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" />
                <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>

            <ul>
              {sensorData.map((reading, index) => (
                <li key={index}>
                  Time: {reading.time} | Value: {reading.value.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
)
}
export default Readings;