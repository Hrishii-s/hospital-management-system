import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './DoctorCard.css'

function DoctorCard(props) {



function capitalise(name){
  return name.split(' ').map(word=>word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()).join(' ')
}
return (
    <div className='col-md-2 col-lg-3'>
        <div className='card h-100 doc-card border-0 shadow'>
            <div className='card-body text-center'>
                <img className="img-fluid doc-img mb-4" src={props.profile}></img>
                <h5 className="card-title doc-name">{capitalise(props.name)}</h5>
                
                <div className='doc-info mt-3'>
                <div className='row mb-2'>
                <div className='text-primary col-5 text-start fw-bold'> Experience:</div>
                <div className='col-7 text-start'> {props.experience} yrs</div>
                </div>
                <div className='row mb-3'>
                <div className='text-primary col-5 text-start fw-bold'>Qualification:</div>
                <div className='col-7 text-start'>{props.qualification}</div>
                </div>
                </div>
                
                <Link to={`/doctor_profile/${props.id}`}><button className="btn btn-primary w-100">Book Appointment</button></Link>
              
            </div>
        </div>



    </div>
  )
}

export default DoctorCard