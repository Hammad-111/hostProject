import { useState } from "react";
import { TbSunElectricity } from "react-icons/tb";
const homeId = localStorage.getItem("homeId");
    const Limits =()=>{
      const [monthlyLimit, setMonthlyLimit] = useState("");
      const [showToast, setShowToast] = useState(false);
      const [toastMessage, setToastMessage] = useState("");
      
          const handleSave = async () => {  
            
               try {
                 const response = await fetch(`https://saviotserver.vercel.app/setLimit?limit=${monthlyLimit}&homeId=${homeId}&username=ammar`);
                 const data = await response.json();
             
                 if (data.status === "success") {
                   setToastMessage("Limits saved successfully!");
                 } else {
                   setToastMessage("Failed to save limit.");
                 }
               } catch (error) {
                 setToastMessage("Error connecting to server.");
                 console.error("API error:", error);
               }
             
               setShowToast(true);
               setTimeout(() => setShowToast(false), 3000);
     };
     
return (
     <div className="set-limits-section">
            <TbSunElectricity className="limit-icon" />
            <h2>Set Your Energy Limits</h2>
            <p>
              Manage your electricity consumption effectively by setting daily, monthly, and peak hour usage limits.
              Enabling auto-cutoff will prevent excessive usage beyond your defined threshold.
            </p>
            {/* Monthly Limit */}
            <label>Monthly Limit (kWh):</label>
            <input
              type="number"
              placeholder="Enter monthly limit"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
            />
    
                {/* Save & Reset Buttons */}
               <div className="button-group">
                 <button className="save-btn" onClick={handleSave}>
                   Save Limit
                 </button>
               </div>  
               {showToast && (
                 <div className="glass-toast">
                 {toastMessage}
                 </div>
)}    
     </div>
)}
export default Limits;