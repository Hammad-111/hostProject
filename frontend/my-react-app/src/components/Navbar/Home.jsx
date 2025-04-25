import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { MdOutlineAddHome, MdMeetingRoom } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { TbSunElectricity } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { MdSensors } from "react-icons/md";
import "./Home.css";
import axios from 'axios';
import Devices from "./AddNewRoom";
import SetLimits from "./Limits";
import SensorReadings from "./SensorReadings";
import Statistics from "./Statistics"; 
const Home = () => {
  const [activeRoom, setActiveRoom] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomDevices, setRoomDevices] = useState({}); // State to track devices for each room
  const [deviceStatuses, setDeviceStatuses] = useState({}); // State to track device statuses

  const addDeviceToRoom = (room, device) => {
    setRoomDevices((prevDevices) => ({
      ...prevDevices,
      [room]: [...(prevDevices[room] || []), device], // Add device to the room's array
    }));
  };

  ///Handle API for toggling devices
  // Function to handle toggling device status
  
  const handleToggle = async (deviceId, roomId) => {
    try {
      const response = await axios.get(
        `https://saviotserver.vercel.app/toggle?id=${deviceId}&roomId=${roomId}&homeId=1&username=ammar`
      );
  
      const newStatus = response.data.status;
      console.log(`Device ${deviceId} toggled. New status:`, newStatus);
  
      // Update deviceStatuses state
      setDeviceStatuses((prevStatuses) => ({
        ...prevStatuses,
        [deviceId]: newStatus,
      }));
  
      alert(`Device ${deviceId} is now ${newStatus === 255 ? 'ON' : 'OFF'}`);
    } catch (error) {
      console.error("Error toggling device:", error);
      alert("Failed to toggle device.");
    }
  };

  const navigate = useNavigate(); // Initialize navigation

  const handleLogout = () => {
    // Clear any user-related data (if needed)
    setRooms([]);
    setActiveRoom(null);
    setActiveSection(null);
    // Redirect to login page
    navigate("/login");
  };

 const addRoom = () => {
    const newRoom = `Room ${rooms.length + 1}`;
    setRooms([...rooms, newRoom]);
    setActiveRoom(null);
    setActiveSection(null); // Show devices section
  };

  // Function to delete a room
  const deleteRoom = (roomToDelete) => {
    setRooms(rooms.filter((room) => room !== roomToDelete));
  };

 
useEffect(() => {
  axios.get('http://localhost:3001/rooms')
    .then(res => setRooms(res.data))
    .catch(err => console.log(err));
}, []);

  useEffect(() => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.style.scrollMarginTop = "80px";
    }
  }, []);


  return (
    <div className="home-layout">
      <aside className="sidebar">
        <h2 style={{ color: "green", position: "relative", top: "-50px", right: "10px", fontSize: "33px" }}>SAVIOT</h2>
        <button className="btn btn-secondary" onClick={addRoom}>
          <MdOutlineAddHome /> Add Rooms 
        </button>
        <div className="room-container">
          {rooms.map((room, index) => (
            <div key={index} className="room-item">
              <button
                className="room-btn"
                onClick={() => {
                  setActiveRoom(room);
                  setActiveSection("devices");
                }}
              >
                <MdMeetingRoom /> {room}
              </button>
              <button className="delete-btn" onClick={() => deleteRoom(room)}>
                ❌
              </button>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary" onClick={() => setActiveSection("limits")}>
          <TbSunElectricity /> Set Limits
        </button>
        <button className="btn btn-secondary" onClick={() => setActiveSection("statistics")}>
          <GoGraph /> Show Statistics
        </button>
        <button className="btn btn-secondary" onClick={() => setActiveSection("reading")}>
          <MdSensors /> Sensor Reading
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          <CiLogin /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <section id="home" className="home-container">
        {activeSection === "devices" && activeRoom && <Devices
         activeRoom={activeRoom}
         roomDevices={roomDevices}
         deviceStatuses={deviceStatuses}
         addDeviceToRoom={addDeviceToRoom}
         handleToggle={handleToggle}
       />}

        {activeSection === "limits" && <SetLimits />}

        {activeSection === "statistics" && <Statistics />}
        
        {activeSection === "reading" && <SensorReadings />}
      </section>
    </div>
  );
};

export default Home;
