import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser } from "./store/authSlice";

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [searchTerm,setSearchTerm] = useState("")
  var user=useSelector(store=>store.auth.user)
  const dispatch=useDispatch()
  const navigate = useNavigate()

  function handleLogout(){
    if (user){
    dispatch(removeUser())
    navigate("/login")
  }}

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

function handleSearch(e){
  e.preventDefault()
  if (searchTerm.trim()){
    navigate(`/doctor_list?search=${encodeURIComponent(searchTerm)}`);
  }

}



  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <i className="fas fa-heartbeat me-2"></i>MedixCare 
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavToggle}
          aria-controls="navbarTogglerDemo01"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            isNavCollapsed ? "" : "show"
          }`}
          id="navbarTogglerDemo01"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <i className="fas fa-home me-1"></i> Home
              </NavLink>
            </li>

            <li className="nav-item">
            <NavLink className="nav-link" to="/doctor_list">
              <i className="fas fa-user-md me-1"></i> Doctors
              </NavLink>
            </li>
{/* 
{user?(
            <> */}
            <li className="nav-item">
            <NavLink className="nav-link" to="/my_appointments">
              <i className="fas fa-calendar-check  me-1"></i> My Appointments
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to={`/user_profile/`}>
                <i className="fas fa-user me-1"></i> My Profile
              </NavLink>
            </li>
            {/* </>
):""} */}

          </ul>

          <form className="d-flex search-form me-2" role="search" onSubmit={handleSearch} >
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchTerm(e.target.value)}  />
            <button className="btn btn-success" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>


{user?(
          <NavLink className="nav-link login-btn" onClick={handleLogout}>
          <i className="fa-solid fa-person-walking"></i> Logout
          </NavLink>
        ):(
            <NavLink className="nav-link login-btn" to="/login">
            <i className="fas fa-sign-in-alt me-1"></i> Login
          </NavLink>
        )}





        </div>
      </div>
    </nav>
  
  
  );
}


export default Navbar;
