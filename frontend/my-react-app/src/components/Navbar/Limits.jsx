import { useState } from "react";
import { TbSunElectricity } from "react-icons/tb";

const Limits =()=>{
    const [monthlyLimit, setMonthlyLimit] = useState("");
    const [dailyLimit, setDailyLimit] = useState("");
    const [peakHourLimit, setPeakHourLimit] = useState("");
    const [autoCutoff, setAutoCutoff] = useState(false);
  
    const handleSave = () => {
      console.log("Limits Saved:", {
        monthlyLimit,
        dailyLimit,
        peakHourLimit,
        autoCutoff,
      });
      alert("Limits saved successfully!");
    };
  
    const handleReset = () => {
      setMonthlyLimit("");
      setDailyLimit("");
      setPeakHourLimit("");
      setAutoCutoff(false);
      alert("Limits reset successfully!");
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
            <label>Daily Limit (kWh):</label>
            <input
              type="number"
              placeholder="Enter daily limit"
              value={dailyLimit}
              onChange={(e) => setDailyLimit(e.target.value)}
            />
           {/* Peak Hours Limit */}
           <label>Peak Hours Limit (kWh):</label>
                 <input
                   type="number"
                   placeholder="Enter peak hour limit"
                   value={peakHourLimit}
                   onChange={(e) => setPeakHourLimit(e.target.value)}
                 />
           
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
     </div>
)}
export default Limits;