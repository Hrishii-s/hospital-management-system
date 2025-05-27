import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DoctorProfile.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function DoctorProfile() {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [time,setTime] = useState ("")





  let user=useSelector(store=>store.auth.user)
  const navigate=useNavigate()

  const {doctorId}=useParams();

  useEffect(()=>{
    if(!user){
      return
    }
    axios.get(`http://127.0.0.1:8000/Doctor_Management/doctor_profile/${doctorId}/`,{
      'headers':{"Authorization":"Token " + user.token}
    }).then(response=>{
      setDoctor(response.data)
    }).catch(err=>{
      setError("There was an error")
    })
  },[user])
 



  function capitalizeWords(name) {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  function handleBooking(e){
    e.preventDefault()
    const datetimeString = `${date}T${time}:00`
    axios.post("http://127.0.0.1:8000/Appointment_Management/appointment_booking/",
      {
        user_id:user.userId,
        doctor_id:doctor.id,
        appointment_date:datetimeString,
      },{
        'headers': {
          "Authorization":"Token " + user.token
        }
      }
    ).then(response=>{
      alert("Appointment Booked Successfully")
      navigate("/my_appointments")

    }) .catch(error => {
      console.error("Booking failed:", error.response?.data); 
      setError("Failed to book appointment");
    });
  }











  

  return (
    <div>
      <Navbar />
      <div className="container my-3">
        <div className="row">
          {/* Doctor Profile Section */}
          <div className="col-lg-4 mb-4">
            <div className="card doctor-profile-card h-100 ">
              <div className="card-body text-center">
             

                <img 
                  src={doctor?doctor.profile:""}
                  alt={doctor?doctor.name:""} 
                  className="doctor-profile-image"
                />
                <h3 className="mt-3 doctor-name">Dr. {doctor ? capitalizeWords(doctor.name) : ''}</h3>
                <p className="text-primary doctor-specialty">Cardiology Specialist</p>
                <hr />
                <div className="doctor-details text-start">
                  <p><strong><i className="fa-solid fa-clock-rotate-left me-2 text-primary"></i>Experience:</strong> {doctor.experience} yrs</p>
                  <p><strong><i className="fa-solid fa-graduation-cap me-2 text-primary"></i>Qualification:</strong> {doctor.qualification}</p>
                  <p><strong><i className="fa-solid fa-comment me-2 text-primary"></i>Languages:</strong> English</p>
                  
                </div>
                <div className="contact-info mt-4">
                  <p><i className="fa-solid fa-phone me-2"></i>+91 {doctor.doc_num} </p>
                  <p><i className="fa-solid fa-envelope me-2"></i>reception@medixcare.com</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Doctor Bio and Appointment Form Section */}
         
  
            {/* Appointment Booking Form */}
            <div className="col-lg-8 mb-4">
            <div className="card appointment-card h-100">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Book an Appointment</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleBooking}>

                  
                  <div className="mb-3">
                    <div className="col-12 mb-3 mb-md-0">
                      <label htmlFor="date" className="form-label">Preferred Date</label>
                      <input type="date" className="form-control mb-4" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="time" className="form-label">Preferred Time</label>
                      <select className="form-select mb-4" id="time" value={time} onChange={(e)=>setTime(e.target.value)} required>
                        <option value="" disabled>Select time slot</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="reason" className="form-label">Reason for Visit <span className='text-muted ms-1'> (Optional)</span></label>
                    <textarea className="form-control" id="reason" rows="4" placeholder="Briefly describe your reason for visit"></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100 mt-md-3 py-2" >Confirm Appointment</button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;