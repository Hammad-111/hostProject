import { useState} from "react";
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

  const addRoom = async () => {
    try {
      // Step 1: Check if there is any new device
      const isAnyNewResponse = await fetch('https://saviotserver.vercel.app/isAnyNew?homeId=1&username=ammar');
      const macAddress = await isAnyNewResponse.text(); // Response will be plain text (MAC address or "no new device")
  
      if (macAddress.trim() === "no new device") {
        alert("No new room device detected. Please connect a new RoomController near the gateway.");
        return; // Stop further execution
      }
  
      // Step 2: Add the new room using the MAC address
      const addNewRoomResponse = await fetch(`https://saviotserver.vercel.app/addNewRoom?homeId=1&username=ammar&mac=${macAddress.trim()}`);
      const addNewRoomData = await addNewRoomResponse.json(); // Assuming server sends JSON with roomId
  
      const { roomId } = addNewRoomData;
  
      if (!roomId) {
        alert("Failed to add new room. Please try again.");
        return;
      }
  
      // Step 3: Update local state
      const newRoom = `Room ${roomId}`; // Or simply roomId if you want
      setRooms([...rooms, newRoom]);
      setActiveRoom(null);
      setActiveSection(null);
  
      alert(`New room added successfully: Room ${roomId}`);
    } catch (error) {
      console.error("Error adding new room:", error);
      alert("Something went wrong while adding the new room.");
    }
  };
  
  // Function to delete a room
  const deleteRoom = (roomToDelete) => {
    setRooms(rooms.filter((room) => room !== roomToDelete));
  };


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
              <button onClick={() => deleteRoom(room)}>
                Delete
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
