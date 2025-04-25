import { PiFanBold } from "react-icons/pi";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineAir, MdOutlineSecurity } from "react-icons/md";
import { BiTv } from "react-icons/bi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import PropTypes from "prop-types";

const Devices = ({ activeRoom, roomDevices, deviceStatuses, addDeviceToRoom, handleToggle }) => {
  return (
    <div className="devices-section">
      <h2 style={{margin: '10px', position: 'absolute',top: '10px'}}>{activeRoom} - Control Your Devices</h2>
      <div className="devices-container">
        {/* Device Cards */}
        <div className="device-list">
          <div className="device-card">
            <PiFanBold className="device" />
            <h3>Smart Fan</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "Smart Fan")}>Add</button>
          </div>

          <div className="device-card">
            <FaRegLightbulb className="device" />
            <h3>Smart Light</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "Smart Light")}>Add</button>
          </div>

          <div className="device-card">
            <MdOutlineAir className="device" />
            <h3>Air Conditioner</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "Air Conditioner")}>Add</button>
          </div>

          <div className="device-card">
            <MdOutlineSecurity className="device" />
            <h3>Security Camera</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "Security Camera")}>Add</button>
          </div>

          <div className="device-card">
            <BiTv className="device" />
            <h3>Smart TV</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "Smart TV")}>Add</button>
          </div>

          <div className="device-card">
            <CgSmartHomeRefrigerator className="device" />
            <h3>Refrigerator</h3>
            <p>Turn ON/OFF</p>
            <button onClick={() => addDeviceToRoom(activeRoom, "Refrigerator")}>Add</button>
          </div>
        </div>

        {/* Added Devices */}
        <div className="added-devices">
          <h3>Added Devices:</h3>
          <ul>
            {(roomDevices[activeRoom] || []).map((device, index) => (
              <li key={index}>
                {device}
                <button onClick={() => handleToggle(index)}>
                  {deviceStatuses[device] === 255 ? "OFF" : "ON"}
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
  activeRoom: PropTypes.string.isRequired, // activeRoom should be a string and is required
  roomDevices: PropTypes.object.isRequired, // roomDevices should be an object and is required
  deviceStatuses: PropTypes.object.isRequired, // deviceStatuses should be an object and is required
  addDeviceToRoom: PropTypes.func.isRequired, // addDeviceToRoom should be a function and is required
  handleToggle: PropTypes.func.isRequired, // handleToggle should be a function and is required
};

export default Devices;