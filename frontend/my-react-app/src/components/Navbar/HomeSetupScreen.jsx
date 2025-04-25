import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeSetupScreens.css"; // Import your CSS file for styling

const HomeSetupScreen = () => {
  const [homeName, setHomeName] = useState("");
  const [homes, setHomes] = useState([]);
  const navigate = useNavigate();

  const handleAddHome = () => {
    if (homeName.trim()) {
      setHomes([...homes, homeName.trim()]);
      setHomeName("");
    }
  };

  const handleNext = () => {
    if (homes.length === 0) {
      alert("Please add at least one home before proceeding.");
      return;
    }

    // Optionally: save to localStorage or global state here
    // localStorage.setItem("homes", JSON.stringify(homes));
    navigate("/home"); // navigate to your home/dashboard page
  };

  return (
    <div className="home-setup-container">
      <h1 className="home-setup-title">Welcome to SAVIOT Setup</h1>
      <p className="home-setup-description">
           🌟 Welcome to <strong>SAVIOT</strong> — your smart home energy companion! <br />
       🏠 Here, you can add the homes 🏡 you want to monitor and manage.<br />
       ⚡ Save energy, reduce electricity costs, and take control of your devices from anywhere!<br />
       💡 Let’s start by adding the homes you want to control, then move on to rooms and appliances!
       </p>
     
       <div className="home-input-wrapper">
         <label className="home-input-label">Enter Home Name:</label>
         <input
           type="text"
           value={homeName}
           onChange={(e) => setHomeName(e.target.value)}
           className="home-input-field"
           placeholder="e.g., Home A"
         />
         <button
           onClick={handleAddHome}
           className="add-home-button"
         >
           Add Home
         </button>
       </div>
     
       {homes.length > 0 && (
         <div className="added-homes">
           <h2>Added Homes:</h2>
           <ul>
             {homes.map((home, index) => (
               <li key={index}>{home}</li>
             ))}
           </ul>
         </div>
  )}

  <button
    onClick={handleNext}
    className="next-button"
  >
    Next
  </button>
</div>
  );
};

export default HomeSetupScreen;
