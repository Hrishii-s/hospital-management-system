import Navbar from "../Navbar";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";


function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] =useState("")
  const navigate=useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    var data={
      email:email,
      password:password
    }
    axios.post("http://127.0.0.1:8000/User_Management/login/",data).then(response=>{
      setError("")
      var user={
        email:email,
        userId:response.data.userId,
        token:response.data.token
      }
      console.log("response ", user)
      
      dispatch(setUser(user))
      navigate("/")

    }).catch(err=>{
      if (err.response.data.errors){
        setError(Object.values(err.response.data.errors).join(' '))
      }else if(err.response.data.message){
        setError(err.response.data.message)
      }else{
        setError("Login failed. Try again Later")
      }
    })
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center ">
          <div className="col-md-6 ">
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">Welcome Back</h2>
                  <p className="text-muted">Please enter your credentials to login</p>
                  {error?<div className="alert alert-danger">{error}</div>:""}
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        className="form-control py-2"
                        id="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label htmlFor="password" className="form-label fw-semibold mb-0">Password</label>
                      
                    </div>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <Lock size={18} />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control py-2"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        className="input-group-text bg-light"
                        type="button"
                        onClick={togglePasswordVisibility}>
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold mb-3"
                  >
                    Log In
                  </button>

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account? <NavLink to={"/signup"} className="text-decoration-none fw-semibold">Sign Up</NavLink>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;