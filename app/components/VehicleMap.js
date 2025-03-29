
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });

export default function VehicleMap() {
  const [L, setL] = useState(null);
  const [position, setPosition] = useState({ lat: 17.3850, lng: 78.4867 });
  const [route, setRoute] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => setL(leaflet));
    }
  }, []);

  // Simulated GPS Movement (If No API is Available)
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        const newLat = prev.lat + 0.0005; // Slight shift in latitude
        const newLng = prev.lng + 0.0005; // Slight shift in longitude
        setRoute((prevRoute) => [...prevRoute, { lat: newLat, lng: newLng }]); // Store route history
        return { lat: newLat, lng: newLng };
      });
    }, 2000); // Updates every 2 seconds

    return () => clearInterval(interval);
  }, []);

  if (!L) return <p>Loading Map...</p>;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Route History Polyline */}
        <Polyline positions={route} color="blue" />

        {/* Moving Vehicle Marker */}
        <Marker position={position} icon={L.icon({ iconUrl: "/car-animated.gif", iconSize: [60, 60] })}>
          <Popup>🚗 Vehicle Tracking</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}







/*"use client";

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
}*/


/*"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });

export default function VehicleMap() {
  const [L, setL] = useState(null);
  const [position, setPosition] = useState({ lat: 17.3850, lng: 78.4867 });
  const [route, setRoute] = useState([]);
  const [roadConditions, setRoadConditions] = useState([]);
  const [pedestrians, setPedestrians] = useState([]);
  const [laneWarnings, setLaneWarnings] = useState([]);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  useEffect(() => {
    async function fetchGPSData() {
      try {
        const response = await fetch("/api/mockgps"); // Ensure API route is lowercase
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setPosition(data[0]); // Set latest GPS position
        setRoute(prevRoute => [...prevRoute, data[0]]); // Store route history
      } catch (error) {
        console.error("Error fetching GPS data:", error.message);
      }
    }

    async function fetchRoadConditions() {
      try {
        const response = await fetch(`/api/road-conditions?lat=${position.lat}&lng=${position.lng}`);
        if (!response.ok) throw new Error("Failed to fetch road conditions");
        const data = await response.json();
        setRoadConditions(data);
      } catch (error) {
        console.error("Error fetching road conditions:", error.message);
      }
    }

    async function fetchPedestrianData() {
      try {
        const response = await fetch(`/api/pedestrian-detection?lat=${position.lat}&lng=${position.lng}`);
        if (!response.ok) throw new Error("Failed to fetch pedestrian data");
        const data = await response.json();
        setPedestrians(data);
      } catch (error) {
        console.error("Error fetching pedestrian data:", error.message);
      }
    }

    async function fetchLaneWarnings() {
      try {
        const response = await fetch(`/api/lane-detection?lat=${position.lat}&lng=${position.lng}`);
        if (!response.ok) throw new Error("Failed to fetch lane warnings");
        const data = await response.json();
        setLaneWarnings(data);
      } catch (error) {
        console.error("Error fetching lane warnings:", error.message);
      }
    }

    fetchGPSData();
    fetchRoadConditions();
    fetchPedestrianData();
    fetchLaneWarnings();

    const interval = setInterval(fetchGPSData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (!L) return <p>Loading Map...</p>;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Road Conditions */
       /* {roadConditions.map((condition, index) => (
          <Marker key={index} position={condition.location} icon={L.icon({ iconUrl: "/pothole-icon.png", iconSize: [40, 40] })}>
            <Popup>⚠️ Road Condition Alert: {condition.type}</Popup>
          </Marker>
        ))}

        {/* Pedestrians */
       /* {pedestrians.map((ped, index) => (
          <Marker key={index} position={ped.location} icon={L.icon({ iconUrl: "/pedestrian-icon.png", iconSize: [30, 30] })}>
            <Popup>🚶 Pedestrian Alert! Slow Down</Popup>
          </Marker>
        ))}

        {/* Lane Warning Popup */
      /*  {laneWarnings.length > 0 && (
          <Popup position={position}>
            ⚠️ **Lane Violation Alert!** Stay in your lane.
          </Popup>
        )}

        {/* Route Path */
       /* <Polyline positions={route} color="blue" />

        {/* Vehicle Marker */
       /* <Marker position={position} icon={L.icon({ iconUrl: "/car-animated.gif", iconSize: [60, 60] })}>
          <Popup>🚗 Vehicle Tracking</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
*/
/*"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });

export default function VehicleMap() {
  const [L, setL] = useState(null);
  const [position, setPosition] = useState({ lat: 17.3850, lng: 78.4867 });
  const [route, setRoute] = useState([]);
  const [roadConditions, setRoadConditions] = useState([]);
  const [pedestrians, setPedestrians] = useState([]);
  const [laneWarnings, setLaneWarnings] = useState([]);

  // Dynamically import Leaflet on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setL(leaflet);
      });
    }
  }, []);

  // Fetch API data once on mount
  useEffect(() => {
    async function fetchGPSData() {
      try {
        const response = await fetch("/api/mockgps"); // API route in lowercase
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setPosition(data[0]); // Update position with the first coordinate from API
        setRoute((prevRoute) => [...prevRoute, data[0]]);
      } catch (error) {
        console.error("Error fetching GPS data:", error.message);
      }
    }

    async function fetchRoadConditions() {
      try {
        const response = await fetch(`/api/road-conditions?lat=${position.lat}&lng=${position.lng}`);
        if (!response.ok) throw new Error("Failed to fetch road conditions");
        const data = await response.json();
        setRoadConditions(data.roads || []); // Assuming API returns { roads: [...] }
      } catch (error) {
        console.error("Error fetching road conditions:", error.message);
      }
    }

    async function fetchPedestrianData() {
      try {
        const response = await fetch(`/api/pedestrian-detection?lat=${position.lat}&lng=${position.lng}`);
        if (!response.ok) throw new Error("Failed to fetch pedestrian data");
        const data = await response.json();
        setPedestrians(data || []); // Assuming API returns an array of pedestrian objects
      } catch (error) {
        console.error("Error fetching pedestrian data:", error.message);
      }
    }

    async function fetchLaneWarnings() {
      try {
        const response = await fetch(`/api/lane-detection?lat=${position.lat}&lng=${position.lng}`);
        if (!response.ok) throw new Error("Failed to fetch lane warnings");
        const data = await response.json();
        setLaneWarnings(data.warning ? [data] : []); // Assuming API returns { warning: "..." }
      } catch (error) {
        console.error("Error fetching lane warnings:", error.message);
      }
    }

    fetchGPSData();
    fetchRoadConditions();
    fetchPedestrianData();
    fetchLaneWarnings();

    const interval = setInterval(fetchGPSData, 5000); // Update GPS data every 5 seconds
    return () => clearInterval(interval);
  }, [position.lat, position.lng]);

  if (!L) return <p>Loading Map...</p>;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Road Conditions Markers */
       /* {roadConditions.map((condition, index) => (
          <Marker
            key={index}
            position={[condition.lat, condition.lng]}
            icon={L.icon({ iconUrl: "/pothole-icon.png", iconSize: [40, 40] })}
          >
            <Popup>⚠️ Road Condition Alert: {condition.condition}</Popup>
          </Marker>
        ))}

        {/* Pedestrian Markers */
      {/* Pedestrian Markers */}
/*{Array.isArray(pedestrians) &&
  pedestrians.map((ped, index) => (
    <Marker
      key={index}
      position={[ped.lat, ped.lng]}
      icon={L.icon({ iconUrl: "/pedestrian-icon.png", iconSize: [30, 30] })}
    >
      <Popup>🚶 Pedestrian Alert! Slow Down</Popup>
    </Marker>
  ))
}


        {/* Lane Warning Popup (if any lane warning exists) */
       /* {laneWarnings.length > 0 && (
          <Popup position={position}>
            ⚠️ Lane Violation Alert! Stay in your lane.
          </Popup>
        )}

        {/* Route Polyline */
       /* <Polyline positions={route} color="blue" />

        {/* Vehicle Marker */
        /*<Marker
          position={position}
          icon={L.icon({ iconUrl: "/car-animated.gif", iconSize: [60, 60] })}
        >
          <Popup>🚗 Vehicle Tracking</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}*/


