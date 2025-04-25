import { useState } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import './Forgot.css';

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError(false);

        if (!email) {
            setError(true);
            setMessage("Email field is required!");
            return;
        }

        try {
            await axios.post("http://localhost:3001/forgot-password", { email });
            setMessage("Password reset link has been sent to your email.");
        } catch (err) {
            console.error(err);
            setError(true);
            setMessage("Failed to send reset link. Try again.");
        }
    };

    return (
        <div className="container">
            <div className="form-box forgot-password">
                <form onSubmit={handleSubmit}>
                    <h1>Forgot Password</h1>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={error && !email ? "error-field" : "success-field"}
                            required
                        />
                        <MdEmail className="icons" />
                    </div>
                    <button type="submit">Send Reset Link</button>
                    <div className={`message ${error ? "error-message" : "success-message"}`}>
                        {message}
                    </div>
                </form>
            </div>
        </div>
    );
};
