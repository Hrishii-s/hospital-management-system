import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LogIn from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import DoctorList from "./components/doctors/DoctorList";
import DoctorProfile from "./components/doctors/DoctorProfile";
import UserProfile from "./components/user/UserProfile";
import MyAppointments from "./components/user/MyAppointments";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    {path:'/login',element:<LogIn/>},
    {path:'/signup',element:<SignUp/>},
    {path:'/doctor_list',element:<DoctorList/>},
    {path:'/doctor_profile/:doctorId',element:<DoctorProfile/>},
    {path:'/user_profile/',element:<UserProfile/>},
    {path:"/my_appointments",element:<MyAppointments/>}



   
]);

export default router;