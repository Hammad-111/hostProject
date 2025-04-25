import { Login } from "./Authentication/Login"
import { Register } from "./Authentication/Register";
import { ForgotPassword } from "./Authentication/Forgot";
import {BrowserRouter , Routes,Route ,Navigate} from "react-router-dom";
import Home from "./components/Navbar/Home";
import  HomeSetupScreen  from "./components/Navbar/HomeSetupScreen";

//import { useState } from 'react';
//import { data } from 'react-router-dom';


const App = ()=> {
  /*const [macAddress, setMacAddress] = useState('');
  const [roomId, setRoomId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const checkForNewDevice = async () => {
    try {
      const response = await fetch('https://saviotserver.vercel.app/isAnyNew?homeId=1&username=ammar');
      const data = await response.json();

      if (data === 'no new device') {
        setErrorMessage('No new device detected.');
        alert('No new device detected!');
        return;
      }

      setMacAddress(data);
      console.log("New device MAC Address:", data);
      addNewRoom(data);
    } catch  (error) {
      setErrorMessage('Error checking for new device');
      console.error("Error checking for new device:", error);
      alert(data);
    }
  };

  const addNewRoom = async (mac) => {
    try {
      const response = await fetch(`https://saviotserver.vercel.app/addNewRoom?homeId=1&username=ammar&mac=${mac}`);
      const data = await response.json();

      if (data.roomId) {
        setRoomId(data.roomId);
        alert(`Room added successfully with ID: ${data.roomId}`);
      } else {
        setErrorMessage('Error adding new room');
        alert('Error adding new room!');
      }
    } catch (error) {
      setErrorMessage('Error adding new room');
      console.error("Error adding new room:", error)
      alert('Error adding new room!');
    }
  };*/
  return (
      /*  <div>
          <h2>Add New Room</h2>
          <button onClick={checkForNewDevice}>Add New Room</button>
          
          {macAddress && <p>New device MAC Address: {macAddress}</p>}
          {roomId && <p>Room added with ID: {roomId}</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      );*/
<BrowserRouter>
    <Routes>
         <Route path="/" element={<Navigate to="/login" />} />
         <Route path="/homeSetup" element = {<HomeSetupScreen/>}></Route>
         <Route path="/Login" element = {<Login/>}></Route>
         <Route path="Login/Forgot" element = {<ForgotPassword/>}></Route>
         <Route path="/register" element = {<Register/>}></Route>
         <Route path="/home" element = {<Home/>}></Route>
    </Routes>
    </BrowserRouter>
  )
    
}
   /* */

export default App;
