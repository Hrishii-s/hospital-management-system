import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5><i className="fas fa-heartbeat me-2"></i>MedixCare</h5>
              <p className="small">Your trusted healthcare provider for comprehensive medical services.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white-50">Home</a></li>
                <li><a href="#" className="text-white-50">Find a Doctor</a></li>
                <li><a href="#" className="text-white-50">Departments</a></li>
                <li><a href="#" className="text-white-50">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <p className="small text-white-50">
                <i className="fas fa-envelope me-2"></i>admin@medixcare.com<br />
                <i className="fas fa-phone me-2"></i>+91 9999222555<br />
                <i className="fas fa-map-marker-alt me-2"></i>1234 Healthcare Ave, Medical City
              </p>
            </div>
          </div>
          <hr className="my-3 bg-secondary" />
          <div className="row">
            <div className="col-md-6">
              <p className="small mb-0">&copy; 2025 MedixCare. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <a href="#" className="text-white me-3"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer