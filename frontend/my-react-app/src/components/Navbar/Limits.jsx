import { useState } from "react";
import { TbSunElectricity } from "react-icons/tb";

    const Limits =()=>{
      const [monthlyLimit, setMonthlyLimit] = useState("");
      const [autoCutoff, setAutoCutoff] = useState(false);
  
      const [showToast, setShowToast] = useState(false);
      const [toastMessage, setToastMessage] = useState("");
      
      const handleSave = () => {
        setToastMessage("Limits saved successfully!");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      };
      
      const handleReset = () => {
        setMonthlyLimit("");
        setAutoCutoff(false);
        setToastMessage("Limits reset successfully!");
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
      
            {/* Daily Limit */}
           
                 {/* Auto Cutoff Toggle */}
                 <label>
                   <input
                     type="checkbox"
                     checked={autoCutoff}
                     onChange={(e) => setAutoCutoff(e.target.checked)}
                   />
                   Enable Auto Cutoff When Limit Exceeds
                 </label>
                {/* Save & Reset Buttons */}
               <div className="button-group">
                 <button className="save-btn" onClick={handleSave}>
                   Save Limit
                 </button>
                 <button className="reset-btn" onClick={handleReset}>
                   Reset
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