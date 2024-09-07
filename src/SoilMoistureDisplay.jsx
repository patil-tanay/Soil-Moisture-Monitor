// src/SoilMoistureDisplay.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const SoilMoistureDisplay = () => {
  const [soilMoisture, setSoilMoisture] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const THINGSPEAK_CHANNEL_ID = "2649081"; // Replace with your ThingSpeak Channel ID
  const THINGSPEAK_READ_API_KEY = "481XJ8O6APIDAP9M"; // Replace with your ThingSpeak Read API Key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/fields/1.json?api_key=${THINGSPEAK_READ_API_KEY}&results=10`
        );
        setSoilMoisture(response.data.feeds);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data from ThingSpeak", error);
        setIsLoading(false);
      }
    };

    fetchData();

    // Set an interval to fetch new data every 20 seconds
    const interval = setInterval(fetchData, 20000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Soil Moisture Levels</h1>
      <ul>
        {soilMoisture.map((entry) => (
          <li key={entry.entry_id}>
            Time: {new Date(entry.created_at).toLocaleString()}, Value: {entry.field1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SoilMoistureDisplay;
