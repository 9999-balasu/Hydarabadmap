"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });

const L = typeof window !== "undefined" ? require("leaflet") : null; // Load Leaflet only on client-side

export default function VehicleMap() {
  const [position, setPosition] = useState({ lat: 17.3850, lng: 78.4867 }); // Hyderabad
  const [route, setRoute] = useState([]);
  const [roadConditions, setRoadConditions] = useState([]);
  const [pedestrians, setPedestrians] = useState([]);
  const [laneWarnings, setLaneWarnings] = useState([]);

  useEffect(() => {
    async function fetchGPSData() {
      try {
        const response = await fetch("/api/mockGPS");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setPosition(data[0]);
        setRoute((prevRoute) => [...prevRoute, data[0]]);
      } catch (error) {
        console.error("Error fetching GPS data:", error.message);
      }
    }

    async function fetchRoadConditions() {
      try {
        const response = await fetch(`/api/road-conditions?lat=${position.lat}&lng=${position.lng}`);
        const data = await response.json();
        setRoadConditions(data);
        if (data.potholes?.length > 0) {
          alert("⚠️ Potholes ahead! Drive carefully.");
        }
      } catch (error) {
        console.error("Error fetching road conditions:", error.message);
      }
    }

    async function fetchPedestrianData() {
      try {
        const response = await fetch(`/api/pedestrian-detection?lat=${position.lat}&lng=${position.lng}`);
        const data = await response.json();
        setPedestrians(data);
        if (data.length > 0) {
          alert("🚶 Pedestrians detected! Slow down.");
        }
      } catch (error) {
        console.error("Error fetching pedestrian data:", error.message);
      }
    }

    async function fetchLaneWarnings() {
      try {
        const response = await fetch(`/api/lane-detection?lat=${position.lat}&lng=${position.lng}`);
        const data = await response.json();
        setLaneWarnings(data);
        if (data.warning) {
          alert("⚠️ Lane drift detected! Stay in your lane.");
        }
      } catch (error) {
        console.error("Error fetching lane warnings:", error.message);
      }
    }

    fetchGPSData();
    fetchRoadConditions();
    fetchPedestrianData();
    fetchLaneWarnings();

    const interval = setInterval(fetchGPSData, 2000);
    return () => clearInterval(interval);
  }, [position]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {roadConditions.map((condition, index) => (
          <Marker
            key={index}
            position={condition.location}
            icon={L ? L.icon({ iconUrl: "/pothole-icon.png", iconSize: [40, 40] }) : undefined}
          >
            <Popup>⚠️ Road Condition Alert: {condition.type}</Popup>
          </Marker>
        ))}

        {pedestrians.map((ped, index) => (
          <Marker
            key={index}
            position={ped.location}
            icon={L ? L.icon({ iconUrl: "/pedestrian-icon.png", iconSize: [30, 30] }) : undefined}
          >
            <Popup>🚶 Pedestrian Alert! Slow Down</Popup>
          </Marker>
        ))}

        {laneWarnings.length > 0 && (
          <Popup position={position}>
            ⚠️ **Lane Violation Alert!** Stay in your lane.
          </Popup>
        )}

        <Polyline positions={route} color="blue" />

        <Marker
          position={position}
          icon={L ? L.icon({ iconUrl: "/car-animated.gif", iconSize: [60, 60] }) : undefined}
        >
          <Popup>🚗 Vehicle Tracking</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
