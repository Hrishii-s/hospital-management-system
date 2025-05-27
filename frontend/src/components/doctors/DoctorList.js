import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DoctorList.css';
import DoctorCard from './DoctorCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CheckAuth from '../auth/checkAuth';


function DoctorList() {

  const [doctorList,setDoctorList]=useState([])
  const location = useLocation()
  const params= new URLSearchParams(location.search)
  const searchQuery=params.get('search')?.toLowerCase() || ''

  let user=useSelector(store=>store.auth.user)
  const dispatch=useDispatch()
  
  function fetchDoctor(){
    axios.get("http://127.0.0.1:8000/Doctor_Management/doctor_list/",{
      'headers':{"Authorization":"Token " + user.token}
    }).then(response=>{
      console.log(window.localStorage)
      setDoctorList(response.data)
    })
}

useEffect(()=>{
  if(!user){
    return
  }
  fetchDoctor()
},[user])

const filteredDoctor=doctorList.filter(doctor=>{
  const searchDocName=doctor.name.toLowerCase()
  const searchDocDept=doctor.department.toLowerCase()
  return searchDocName.includes(searchQuery) || searchDocDept.includes(searchQuery)
})

  return (
    <div>
      <Navbar />
      
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 text-primary">Our Medical Specialists</h1>
          <p className="lead text-muted">Experienced healthcare professionals dedicated to your care</p>
      </div>

      <div className="row g-4">
      {filteredDoctor.length>0?(
      filteredDoctor.map(doctor=><DoctorCard key={doctor.id} id={doctor.id} name={doctor.name}
       qualification={doctor.qualification} experience={doctor.experience}
       department={doctor.department} profile={doctor.profile}/>)
      ):(
         <p>No doctors found matching your search criteria.</p>
      )}
         
        </div>
      </div>
    </div>
  );
}

export default CheckAuth( DoctorList);