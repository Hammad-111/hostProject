import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';

export const Register = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");
   const [agreeTerms, setAgreeTerms] = useState(false); // State to track checkbox
   const [termsError, setTermsError] = useState(""); // State to track terms error message
   const Navigate = useNavigate();

   const handleSubmitte = (e) => {
      e.preventDefault();
      if (!agreeTerms) {  // Check if checkbox is not checked
         setTermsError("You must agree to the terms and conditions!");
         return;
      }
      setTermsError(""); // Clear error message if terms are agreed
      setMessage("");
      axios.post('http://localhost:3001/register', { name, email, password })
         .then(result => {
            console.log(result);
            setMessage("Registration Successful! Redirecting...");
            setTimeout(() => Navigate("/Login"), 2000);
         })
         .catch(err => {
            console.log(err);
            setMessage("Registration Failed! Try again.");
         });
   }

   return (
      <div className="wrapper">
         <div className="form-box register">
            <form onSubmit={handleSubmitte}>
               <h1>Registration</h1>

               <div className="input-box">
                  <input 
                     type="text" 
                     placeholder='Username' 
                     value={name} 
                     onChange={(e) => setName(e.target.value)} 
                     required 
                  />
                  <FaUser className="icon" />
               </div>

               <div className="input-box">
                  <input 
                     type="email" 
                     placeholder='Email' 
                     value={email}  
                     onChange={(e) => setEmail(e.target.value)} 
                     required 
                  />
                  <MdEmail className="icon" />
               </div>

               <div className="input-box">
                  <input 
                     type="password" 
                     placeholder='Password' 
                     value={password} 
                     onChange={(e) => setPassword(e.target.value)} 
                     required 
                  />
                  <FaLock className="icon" />
               </div>

               <div className="remember-forgot">
                  <label>
                     <input 
                        type="checkbox" 
                        checked={agreeTerms} 
                        onChange={() => setAgreeTerms(!agreeTerms)} // Toggle checkbox state
                     />
                     I agree to the terms & conditions
                  </label>
               </div>

               <button type="submit" disabled={!agreeTerms}>Register</button> {/* Disable submit button if checkbox not checked */}

               {termsError && <div className="terms-error">{termsError}</div>} {/* Show error message if terms are not agreed */}

               <div className="register-link">
                  <p>Already have an Account? <a href="/Login">Login</a></p>
               </div>

               <div className="message">{message}</div>

            </form>
         </div>
      </div>
   )
};
