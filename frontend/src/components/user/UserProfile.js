import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserProfile.css';
import Navbar from '../Navbar';
import CheckAuth from '../auth/checkAuth';
import { useSelector } from 'react-redux';
import axios from 'axios';

function UserProfile() {
  const [name,setName]=useState("")
  const [ogData,setOgData]=useState(null)
  const [gender,setGender] = useState("")
  const [email,setEmail] = useState("")
  const [address,setAddress] = useState("")
  const [contactNo,setContactNo] = useState("")
  const [dob,setDob] = useState("")
  const [isEditing,setIsEditing] = useState(false)

  const user=useSelector((store)=>store.auth.user)

  

  useEffect(() => {

    if(user){
    axios.get(`http://127.0.0.1:8000/User_Management/user_profile/${user.userId}/`).then(response => (
      console.log("response",response.data),
      setOgData(response.data),
      setName(response.data.name),
      setAddress(response.data.address),
      setContactNo(response.data.contact_no),
      setEmail(response.data.email),
      setGender(response.data.gender),
      setDob(response.data.dob)
    )
      ).catch(error => 
        console.log("Error occured"));}
      }, [user]);

      if (!user){
        return <div>Loading...</div>
      }

      function handleSave(){
        axios.put(`http://127.0.0.1:8000/User_Management/user_profile_update/${user.userId}/`,
          {
            name:name,
            address:address,
            dob:dob,
            contact_no:contactNo,
            email:email


          }
        ).then(response=>{
          setIsEditing(!isEditing)
          alert("Profile has been updated")

        }) .catch(error => {
          console.error("Error updating profile:", error);
          alert("Failed to update profile. Please try again.");
        });
      }


      function handleCancel(){
        if(ogData){
        setName(ogData.name)
        setAddress(ogData.address)
        setContactNo(ogData.contact_no)
        setEmail(ogData.email)
        setGender(ogData.gender)
        setDob(ogData.dob)
        
      
        }
        setIsEditing(false)
      }



  return (
    <div>
      <Navbar />
      <div className="container py-2 mt-md-2 ">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="user-profile-container">
              {/* Profile Header */}
              <div className="card profile-header-card mb-4 py-md-4">
                <div className="card-body d-flex flex-column flex-md-row align-items-center">
                  <div className="profile-image-container me-md-4 mb-3 mb-md-0">
                    <img 
                      src="https://cdn2.iconfinder.com/data/icons/audio-16/96/user_avatar_profile_login_button_account_member-512.png" 
                      alt="User Profile" 
                      className="profile-image"
                    />
                  </div>
                      <div className="container mt-3">
                        <div className="row">
                          <div className="col text-center px-md-4 text-md-start">
                            <h2 className="fw-bold">{name}</h2>
                            <p className="text-muted">{email}</p>
                          </div>
                        </div>
                      </div>

                </div>
              </div>

              {/* Profile Information */}
              <div className="card profile-details-card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Personal Information</h4>
                  
                    {isEditing?(
                          <>
                          <div className='d-flex'>
                         
                          <button className="btn  btn-outline-success me-2"onClick={handleSave} >
                          <i class="fa-solid fa-thumbs-up me-1"></i>Save Changes</button>
                          <button className="btn btn-outline-danger"onClick={handleCancel} >
                          <i class="fa-solid fa-ban me-1"></i>Cancel</button>
                          </div>
                          
                          </>

                    ):(
                      <>

                    <button className="btn btn-primary"onClick={()=>setIsEditing(!isEditing)} >
                    <i className="fa"></i>Edit Profile</button>
        
                      </>
                    )}
                  
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-muted">Full Name</label>
                      <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} readOnly= {!isEditing} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-muted">Email Address</label>
                      <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} readOnly= {!isEditing} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-muted">Phone Number</label>
                      <input type="tel" className="form-control" value={contactNo} onChange={(e)=>setContactNo(e.target.value)} readOnly= {!isEditing} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-muted">Date of Birth</label>
                      <input type="date" className="form-control" value={dob} onChange={(e)=>setDob(e.target.value)} readOnly = {!isEditing}/>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label text-muted">Address</label>
                      <input type="text" className="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} readOnly= {!isEditing} />
                    </div>
                  </div>
                </div>
              </div>

             
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckAuth(UserProfile);