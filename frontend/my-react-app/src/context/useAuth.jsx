// filepath: f:\8th Smester\project fyp\frontend\my-react-app\src\context\useAuth.js
import { useContext } from "react";
import AuthContext from "./AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;