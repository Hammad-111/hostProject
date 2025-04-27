import { PiFanBold } from "react-icons/pi";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineAir, MdOutlineSecurity } from "react-icons/md";
import { BiTv } from "react-icons/bi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import PropTypes from "prop-types";

const Devices = ({ activeRoom, roomDevices, deviceStatuses, addDeviceToRoom,deleteDevice, handleToggle }) => {

  
  return (
    <div className="devices-section">
      <h2 style={{margin: '10px', position: 'absolute',top: '10px'}}>{activeRoom.name} - Control Your Devices</h2>
      <div className="devices-container">
        {/* Device Cards */}
        <div className="device-list">
          <div className="device-card">
            <PiFanBold className="device" />
            <h3>Smart Fan</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "fan")}>Add</button>
            <button onClick={() => deleteDevice(activeRoom, "fan")}>Remove</button>
          </div>

          <div className="device-card">
            <FaRegLightbulb className="device" />
            <h3>Smart Light</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "light")}>Add</button>
            <button onClick={() => deleteDevice(activeRoom ,"light")}>Remove</button>
          </div>

          <div className="device-card">
            <MdOutlineAir className="device" />
            <h3>Air Conditioner</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "Air Conditioner")}>Add</button>
            <button onClick={() => deleteDevice(activeRoom, "Air Conditioner")}>Remove</button>
          </div>

          <div className="device-card">
            <MdOutlineSecurity className="device" />
            <h3>Security Camera</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "Security Camera")}>Add</button>
            <button onClick={() => deleteDevice(activeRoom, "Security Camera")}>Remove</button>
          </div>

          <div className="device-card">
            <BiTv className="device" />
            <h3>Smart TV</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "Smart TV")}>Add</button>
            <button onClick={() => deleteDevice(activeRoom, "Smart TV")}>Remove</button>
          </div>

          <div className="device-card">
            <CgSmartHomeRefrigerator className="device" />
            <h3>Refrigerator</h3>
            <p>Turn ON/OFF</p>
            <button  onClick={() => addDeviceToRoom(activeRoom, "Refrigerator")}>Add</button>
            <button onClick={() => deleteDevice(activeRoom, "Refrigerator")}>Remove</button>
          </div>
        </div>

        {/* Added Devices */}
        <div className="added-devices">
          <h3>Added Devices:</h3>
          <ul>
            {(roomDevices[activeRoom.id] || []).map((deviceObj) => (
              <li key={deviceObj.id}>
                {deviceObj.name}
                <button onClick={() => handleToggle(deviceObj.id ,activeRoom.id)}>
                  {deviceStatuses[deviceObj.id] === 255 ? "ON" : "OFF"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Devices.propTypes = {
  activeRoom: PropTypes.object.isRequired, // activeRoom should be a string and is required
  roomDevices: PropTypes.object.isRequired, // roomDevices should be an object and is required
  deviceStatuses: PropTypes.object.isRequired, // deviceStatuses should be an object and is required
  addDeviceToRoom: PropTypes.func.isRequired, // addDeviceToRoom should be a function and is required
  deleteDevice: PropTypes.func.isRequired, // deleteDevice should be a function and is required
  handleToggle: PropTypes.func.isRequired, // handleToggle should be a function and is required
  rooms: PropTypes.object.isRequired, // rooms should be an array and is required
};

export default Devices;