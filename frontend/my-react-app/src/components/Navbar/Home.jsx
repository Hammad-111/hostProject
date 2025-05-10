import { useState , useEffect} from "react";
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
  const [activeSection, setActiveSection] = useState("datas"); // Default section to show
  const [rooms, setRooms] = useState([]);
  const [roomDevices, setRoomDevices] = useState({}); // State to track devices for each room
  const [deviceStatuses, setDeviceStatuses] = useState({}); // State to track device statuses
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Function to add a device to a room
  const addDeviceToRoom = async (room, device) => {
    try {
      // Step 1: Update local state by adding the device to the room's array
      setRoomDevices((prevDevices) => ({
        ...prevDevices,
        [room.id]: [...(prevDevices[room.id] || []), device], // Add device to the room's array
      }));
      console.log("Device added to local state:", device);
      console.log("Device added to local state:", room.id);
      
      // Step 2: Call the server API to add the appliance
      const addDeviceResponse = await fetch(
        `https://saviotserver.vercel.app/addAppliance?dPin=23&sPin=21&type=${device}&title=mainFan&roomId=${room.id}&homeId=0&username=ammar`
      );
      const responseData = await addDeviceResponse.json();
  
      if (responseData.status === "successful") {
        const deviceId = responseData.id; // Get the device ID from the response
        setToastMessage("Device added successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        // Step 3: Update state with the device ID in roomDevices
        setRoomDevices((prevDevices) => ({
          ...prevDevices,
          [room.id]: [
            ...(prevDevices[room.id] || []),
            { name: device, id: deviceId },
          ], // Store the device object with name and ID
        }));
      } else {
        setToastMessage("Failed to add device. Please try again");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

      }
    } catch (error) {
      console.error("Error adding device:", error);
      setToastMessage("Something went wrong while adding the device");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

 // Function to delete a device from a room
  const deleteDevice = async (room, device) => {
    try {
      // Find the device ID from the roomDevices state
      const deviceToDelete = roomDevices[room.id].find(
        (d) => d.name === device
      );
      
      if (!deviceToDelete) {
        setToastMessage("Device not found");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }
      const deviceId = deviceToDelete.id;
  
      // Call the server API to remove the device using its ID
      const removeDeviceResponse = await fetch(
        `https://saviotserver.vercel.app/removeAppliance?id=${deviceId}&roomId=${room.id}&homeId=0&username=ammar`
      );
      const responseData = await removeDeviceResponse.json();
  
      if (responseData.status === "successful") {
        console.log(`Device ${device} removed successfully.`);
  
        // Step 2: Remove device from local state
        setRoomDevices((prevDevices) => ({
          ...prevDevices,
          [room.id]: prevDevices[room.id].filter(
            (d) => d.name !== device // Remove device based on name
          ),
        }));
      } else {
        setToastMessage("Failed to remove device. Please try again.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error(":", error);
      setToastMessage("Something went wrong while removing the device");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  

  
  ///Handle API for toggling devices
  // Function to handle toggling device status
  
  const handleToggle = async (deviceId, roomId) => {
    try {
      const response = await axios.get(
        `https://saviotserver.vercel.app/toggle?id=${deviceId}&roomId=${roomId}&homeId=0&username=ammar`
      );
  
      const data = response.data;
  
      if (data.id === 0 && data.error) {
        // Jab device allocate nahi hui hogi
        alert(`Error: ${data.error}`);
        return;
      }
  
      const newStatus = data.status;
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
      const isAnyNewResponse = await fetch('https://saviotserver.vercel.app/isAnyNew?homeId=0&username=ammar');
      const isAnyNewData = await isAnyNewResponse.json();  // Assuming response is JSON
  
      // Extract MAC Address from the response
      const macAddress = isAnyNewData?.newDevice;
  
      if (!macAddress || macAddress.trim() === "no new device") {
        setToastMessage("No new room device detected. Please connect a new RoomController near the gateway");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return; // Stop further execution
      }
  
      // Step 2: Add the new room using the MAC address
      const addNewRoomResponse = await fetch(`https://saviotserver.vercel.app/registerNewRoom?homeId=0&username=ammar&mac=${macAddress.trim()}`);
      const addNewRoomData = await addNewRoomResponse.json(); // Assuming server sends JSON with roomId
  
      
      const { id } = addNewRoomData;
  
      if (!id) {
        setToastMessage("Failed to add new room. Please try again.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }
  
      // Step 3: Update local state
      const newRoom = { id: id, name: `Room ${id}` };
      setRooms([...rooms, newRoom]);
      setActiveRoom(null);
      setActiveSection(null);
  
      setToastMessage("New room added successfully");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error adding new room:", error);
      setToastMessage("Something went wrong while adding the new room.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  
  
  // Function to delete a room
  const deleteRoom = async (roomId) => {
    try {
      const response = await fetch('https://saviotserver.vercel.app/removeRoom?roomId=2&homeId=0&username=ammar');
      const data = await response.json();
  
      if (data.status === "success") {
        // Successfully deleted from server, now update frontend
        setRooms(rooms.filter((room) => room.id !== roomId));
        setToastMessage("Room deleted successfully.");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else if (data.error) {
        // Server sent an error
        alert(`Failed to delete room: ${data.error}`);
        setToastMessage("Room deleted successfully");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        // Unexpected response
        setToastMessage("Unexpected response from server");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      setToastMessage("Something went wrong while deleting the room");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  
  useEffect(() => {
    fetch('https://saviotserver.vercel.app/sendAllData?homeId=0&username=ammar')
      .then(response => response.json())
      .then(fetchedData => {
        console.log('Fetched data:', fetchedData);

        // Filter out empty objects
        const validData = fetchedData.filter(item => item && item.appliances && item.appliances.length > 0);
        setData(validData);
        setLoading(false);
        // ✅ Store homeId (assuming first item has homeId)
         if (validData.length > 0 && validData[0].homeId) {
          localStorage.setItem("homeId", validData[0].homeId);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  const handleButtonClickDelete = (applianceId) => {
    deleteRoom(applianceId);
    window.location.reload(); // Reload the page after toggling
  };

  const handleButtonClick = (applianceId) => {
    handleToggle(applianceId ,2);
    window.location.reload(); // Reload the page after toggling
  };

  return (
    <div className="home-layout">
      <aside className="sidebar">
        <h2 style={{ color: "green", position: "relative", top: "-50px", right: "10px", fontSize: "33px" }}>SAVIOT</h2>
        <button className="btn btn-secondary" onClick={addRoom} >
          <MdOutlineAddHome/> Add Rooms
        </button>
          {showToast && (
             <div className="glass-toast1">
             {toastMessage}
             </div>
          )}  
        <div className="room-container">
           {rooms.map((room) => (
             <div key={room.id} className="room-item">
               <button
                 className="room-btn"
                 onClick={() => {
                   setActiveRoom(room);
                   setActiveSection("devices");
                 }}
               >
                 <MdMeetingRoom /> {room.name}
               </button>
               <button onClick={() => deleteRoom(room.id)}>
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
       {  activeSection === "datas" &&    
       <div className="min-h-screen">
       <div className="container">
         <h1>Appliance Dashboard</h1>
 
         <div className="grid">
           {data.map((home, homeIndex) => (
             <div key={homeIndex} className="home-card">
               <h2>Home {homeIndex + 1}
                <button onClick={() => handleButtonClickDelete(2)}>Delete</button>
               </h2>
 
               <div className="space-y-4">
                 {/* Check if appliances is defined and is an array */}
                 {home.appliances && Array.isArray(home.appliances) ? (
                   home.appliances.map((appliance) => (
                     <div key={appliance.id} className="appliance-card">
                       <h3>Appliance ID: {appliance.id}</h3>
                       <p><strong>Status:</strong> {appliance.status === 255 ? 'On' : 'Off'}</p>
                       <p><strong>Title:</strong> {appliance.title || 'No title available'}</p>
                       <button
                         className="toggle-btn"
                         onClick={() => handleButtonClick(appliance.id) }
                         
                       >
                          {appliance.status === 255 ? 'ON' : 'OFF'}
                       </button>
                     </div>
                   ))
                 ) : (
                   <div className="no-data">No appliances data available for this home</div>
                 )}
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>}
      {/* Main Content */}
      <section id="home" className="home-container">
        {activeSection === "devices" && activeRoom && <Devices
         activeRoom={activeRoom}
         roomDevices={roomDevices}
         deviceStatuses={deviceStatuses}
         addDeviceToRoom={addDeviceToRoom}
         deleteDevice={deleteDevice}
         handleToggle={handleToggle}
         rooms={rooms}
        />}

        {activeSection === "limits" && <SetLimits />}

        {activeSection === "statistics" && <Statistics />}
        
        {activeSection === "reading" && <SensorReadings />}
      </section>
    </div>
  );
};

export default Home;
