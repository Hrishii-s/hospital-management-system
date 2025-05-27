import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import './MyAppointments.css';
import CheckAuth from '../auth/checkAuth';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';

function MyAppointments() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments,setAppointments] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  let user=useSelector(store=>store.auth.user)
  const navigate=useNavigate()


  useEffect(()=>{
    if (user){
    axios.get("http://127.0.0.1:8000/Appointment_Management/appointment_history/",{
      'headers':{"Authorization":"Token " + user.token}

    }).then(response=>{
     
      setAppointments(response.data)

      const now=new Date()

      const upcoming=response.data.filter(appnt=>new Date(appnt.appointment_date)>now)
        
      const past=response.data.filter(appnt=>new Date(appnt.appointment_date)<now)
        
        setUpcomingAppointments(upcoming.sort((a,b)=>new Date(a.appointment_date)-new Date(b.appointment_date)))
        setPastAppointments(past.sort((a,b)=>new Date(b.appointment_date)- new Date(a.appointment_date)))
      }
        )
}else{

  navigate('/login')
}

},[user])

 function formatTime (dateString) {
  const timeStr = dateString.split('T')[1] || '';
  const hourStr = timeStr.substring(0, 2);
  const minuteStr = timeStr.substring(3, 5);
  

  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;
  
  return `${hour}:${minuteStr} ${ampm}`;
};


  return (
    <div className="appointments-page">
      <Navbar />
      
      <div className="container py-5">
        
        
        {/* Main Card */}
        <div className="card main-card shadow-sm">
          {/* Header with Tabs */}
          <div className="card-header bg-white border-bottom-0">
          <h2 className="mb-4 display-5 text-center text-primary">My Appointments</h2>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming Appointments
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
                  onClick={() => setActiveTab('past')}
                >
                  Past Visits
                </button>
              </li>
            </ul>
          </div>
          
          {/* Content Area */}
          <div className="card-body">
            {activeTab === 'upcoming'? (

                <div className="row g-4">
                  {/* Card 1 */}
                  {upcomingAppointments.map((appnts)=>(
                  <div className="col-md-6"  key={appnts.id}>
                    <div className="card appointment-card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="appointment-date">
                            <p className="text-muted mb-1">{new Date(appnts.appointment_date).toDateString()}</p>
                            <p className="text-muted">{formatTime(appnts.appointment_date)}</p>
                          </div>
                          <span className="badge bg-warning text-dark appointment-status">Scheduled</span>
                        </div>
                        
                        <div className="d-flex mb-4">
                          <div className="doctor-img-container me-3">
                            <img src={`http://127.0.0.1:8000${appnts.doctor_details.profile}`} alt={appnts.doctor_details.name} className="doctor-img" />
                          </div> 
                          <div>
                            <h5 className="card-title mb-1">{appnts.doctor_details.name}</h5>
                            <p className="text-muted">{appnts.doctor_details.department}</p>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-top">
                            <button className="btn btn-danger">Cancel</button>
                          </div>
                        
                      </div>
                    </div>
                  </div>
                  
          

                  ))}
                  
                </div>
              
            ):(
            
            activeTab === 'past' && (
                <div className="row g-4">
                  {/* Past Card 1 */}
                  {pastAppointments.map((appnts)=>
                  <div className="col-md-6" key={appnts.id}>
                    <div className="card appointment-card h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="appointment-date">
                            <p className="text-muted mb-1">{new Date(appnts.appointment_date).toDateString()}</p>
                            <p className="text-muted">{formatTime(appnts.appointment_date)}</p>
                          </div>
                          <span className="badge bg-success appointment-status">Completed</span>
                        </div>
                        
                        <div className="d-flex mb-4">
                          <div className="doctor-img-container me-3">
                            <img src={`http://127.0.0.1:8000${appnts.doctor_details.profile}`} className="doctor-img" />
                          </div>
                          <div>
                            <h5 className="card-title mb-1">{appnts.doctor_details.name}</h5>
                            <p className="text-muted">{appnts.doctor_details.department}</p>
                          </div>
                        </div>
                        
                        <div className="appointment-details pt-3 border-top">
                          
                        
                        </div>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
            ))
            }


            {/* card body closing */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;