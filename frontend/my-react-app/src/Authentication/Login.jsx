import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Login = () => {

   const [email, setEmail] = useState(""); 
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");
   const [rememberMe, setRememberMe] = useState(false);
   const navigate = useNavigate();

   // Check localStorage for saved credentials on component mount
   useEffect(() => {
      const savedEmail = localStorage.getItem("email");
      const savedPassword = localStorage.getItem("password");
      const savedRememberMe = localStorage.getItem("rememberMe");

      if (savedRememberMe === "true") {
         setEmail(savedEmail);
         setPassword(savedPassword);
         setRememberMe(true);
      }
   }, []);

   const handleSubmit = (e) => {
     e.preventDefault();
     setMessage("");

     axios.post("http://localhost:3001/login", { email, password })
     .then(result => {
      console.log(result);
      if (result.data.message === "Success") { 
        setMessage("Login Successful! Redirecting...");
        setTimeout(() => navigate("/homeSetup"), 2000);   

        // If "Remember Me" is checked, save email and password to localStorage
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
        }
      } else {
        setMessage(result.data.message);
      }
    })
    .catch(err => {
      console.log(err);
      setMessage("Login Failed! Try again.");
    });
   };

   const handleRememberMeChange = (e) => {
      setRememberMe(e.target.checked);
   };

  return (
    <div className="wrapper">
       <div className="form-box login">
           <form onSubmit={handleSubmit}>
             <h1>Login</h1>
              <div className="input-box">
                 <input 
                   type="email" 
                   placeholder='Email' 
                   required 
                   onChange={(e) => setEmail(e.target.value)} 
                   value={email} />
                 <FaUser className="icon"/>
              </div>
              <div className="input-box">
                 <input 
                   type="password" 
                   placeholder='Password' 
                   required 
                   onChange={(e) => setPassword(e.target.value)} 
                   value={password} />
                 <FaLock className="icon"/>
              </div>
              <div className="remember-forgot">
                <label>
                   <input 
                     type="checkbox" 
                     checked={rememberMe} 
                     onChange={handleRememberMeChange} />
                   Remember me
                </label>
                <a href="Login/Forgot">Forgot Password?</a>
              </div>
              <button type="submit">Login</button>
              <div className="register-link">
                <p>Do not have an Account? <a href="/Register">Register</a></p>
              </div>
              <div className="message">{message}</div>
           </form>
       </div>
    </div>
  );
};
