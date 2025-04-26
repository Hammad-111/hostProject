import { Login } from "./Authentication/Login"
import { Register } from "./Authentication/Register";
import { ForgotPassword } from "./Authentication/Forgot";
import {BrowserRouter , Routes,Route ,Navigate} from "react-router-dom";
import Home from "./components/Navbar/Home";
import  HomeSetupScreen  from "./components/Navbar/HomeSetupScreen";
//import PrivateRoute from "./context/useAuth";

const App = ()=> {
 
return (

      <BrowserRouter>
          <Routes>
               <Route path="/" element={<Navigate to="/login" />} />
               <Route path="/homeSetup" element = {<HomeSetupScreen/>}></Route>
               <Route path="/Login" element = {<Login/>}></Route>
               <Route path="Login/Forgot" element = {<ForgotPassword/>}></Route>
               <Route path="/register" element = {<Register/>}></Route>
               <Route path="/home" element = {<Home/>}></Route>
          </Routes>
          </BrowserRouter>
)    
}
export default App;
