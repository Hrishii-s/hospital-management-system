
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Eye,EyeOff } from "lucide-react";
import { useState } from "react";
import axios from "axios";



function SignUp(){
    
    const [showPassword,setShowPassword] = useState(false)
    const [gender,setGender] = useState("");     
    const [name,setName] = useState("")
    const [dob,setDob] = useState("")
    const [email,setEmail] = useState("")
    const [address,setAddress] = useState("")
    const [password,setPassword] = useState("");
    const [confpassword,setConfPassword] = useState("")
    const [contactNo,setContactNo] = useState("")
    const [error,setError] = useState("")
    var navigate=useNavigate()

    function handleEye(){
        setShowPassword(!showPassword)
    }

    function handleRegister(e){
        e.preventDefault()

        if(password!==confpassword){
            setError("Password fields does not match.")
            return
        }
        const user={
            name:name,
            email:email,
            password:password,
            gender:gender,
            address:address,
            dob:dob,
            contact_no:contactNo,

        }

        axios.post("http://127.0.0.1:8000/User_Management/signup/",user).then(response=>{
            console.log("Response:", response); 
            setError("");
            navigate("/login")
        }).catch(err=>{
            console.log("Error response:", err.response.data); 
            if(err.response.data.message){
                setError(err.response.data.message)
            }else{
                setError("Something went wrong. Try again later.")
            }

        })

    }


    return(
        <div >
        <Navbar/>
        <div className="container mt-3 mb-3 mt-md-1 mb-md-1">
        <div className="row d-flex align-items-center justify-content-center ">
        <div className="col-md-6 ">
            <div className="card shadow border-0">
            <div className="card-body px-5">
            <h2 className="text-center fw-bold text-primary ">Signup</h2>
            <p className="text-muted text-center mb-0">Enter details to signup !</p>
            {error?<div className="alert alert-danger mx-auto text-center">{error}</div>:''}
        <form className="px-5" onSubmit={handleRegister}>
            <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} required></input>
            <label className="form-label">Email</label>
            <input type="email" className="form-control mb-3" placeholder="name@example.com" value={email} onChange={(e)=>setEmail(e.target.value)}required></input>
           
            <div className="row">
            <div className="col-md-6">
            <label className="form-label">Date of Birth :</label>
            <input type="date" className="form-control" value={dob} onChange={(e)=>setDob(e.target.value)} required></input></div>
            <div className="col-md-6">
            <label className="form-label">Gender :</label><br></br>
             <div className="form-check form-check-inline ">
                    <input className="form-check-input" type="radio" id="male"  value="Male" name="gender" checked={gender==="Male"} onChange={(e) => setGender(e.target.value)} required></input>
                    <label className="form-check-label"   htmlFor="male">
                    Male
                    </label>
                    </div>

                    <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" id="female" name="gender" value="Female" checked={gender==="Female"} onChange={(e) => setGender(e.target.value)} ></input>
                    <label className="form-check-label"  htmlFor="female">
                    Female
            </label>
            </div>
            </div>
            </div>


            <label className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="123 Street" value={address} onChange={(e)=>setAddress(e.target.value)} required></input>
            <label className="form-label" >Contact Number</label>
            <input type="text" placeholder="10 digit phone number" className="form-control" value={contactNo} onChange={(e)=>setContactNo(e.target.value)} required></input>
            <div className="row">
             <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
             </div>
             <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">

                <input type={showPassword?"text":"password"} className="form-control" placeholder="Confirm your password" 
                value={confpassword} onChange={(e)=>setConfPassword(e.target.value)} required></input>
                <button type="button" className="input-group-text bg-light" onClick={handleEye}>
                    {showPassword?<Eye size={18}></Eye>:<EyeOff size={18}></EyeOff>}
                </button>

             </div> 
             </div>
             </div>
                
            <button type="submit" className="btn btn-primary w-100 my-3" >SignUp</button>
            <div className="text-center pb-2">
                    <p className="mb-0">
                      Already have an account? <NavLink to={"/login"} className="text-decoration-none fw-semibold">Login</NavLink>
                    </p>
                  </div>
            </div>
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}
export default SignUp;