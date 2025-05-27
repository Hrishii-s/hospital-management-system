import Navbar from './components/Navbar';
import './App.css';
import doctor_image from './images/doctor-hero.svg'
import { Link } from 'react-router-dom';
import CountUp from './components/stylize/CountUp'
import SplitText from "./components/stylize/SplitText";
import Footer from './components/Footer.js';

function App() {
  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
  return (
    <div>
      <Navbar/>
      

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center flex-column-reverse flex-lg-row">
            <div className="col-lg-6">
              <h1 className="hero-heading">
                <SplitText
                          text="Healthcare Made Simple for Everyone"
                          className="text-2xl font-semibold text-center"
                          delay={70}
                          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                          easing="easeOutCubic"
                          threshold={0.2}
                          rootMargin="-50px"
                          onLetterAnimationComplete={handleAnimationComplete}
                        />
                </h1>
              <h3 className="hero-subheading">Book appointments with trusted specialists</h3>
              <p className="hero-text">
                MedixCare provides a seamless way to schedule consultations with our expert doctors,
                access your medical records, and manage your healthcare journey through an intuitive
                and secure patient portal.
              </p>
              <div className="d-flex gap-3 mt-4">
                <Link to="/doctor_list" ><button className="btn cta-button primary text-white">
                  <i className="fas fa-calendar-check me-2"></i>Book Appointment
                </button></Link>
                <a href="#features" className="btn cta-button secondary">
                  <i className="fas fa-info-circle me-2"></i>Learn More
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={doctor_image} className="img-fluid hero-image" alt="MedixCare Patient Consultation" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section mt-3 py-5" id="features">
        <div className="container">
          <h2 className="section-title">Patient-Centered Services</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-calendar-alt feature-icon"></i>
                <h3 className="feature-title">Easy Appointment Booking</h3>
                <p>Schedule, reschedule, or cancel appointments with just a few clicks. Receive timely reminders via SMS and email.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-user-md feature-icon"></i>
                <h3 className="feature-title">Find Your Specialist</h3>
                <p>Browse through our extensive network of specialists. Filter by specialty, experience, language, and availability.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <i className="fas fa-laptop-medical feature-icon"></i>
                <h3 className="feature-title">Virtual Consultations</h3>
                <p>Connect with doctors through secure video calls from the comfort of your home. Save time and stay safe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Departments Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title">Our Medical Departments</h2>
          <div className="row">
            <div className="col-md-3 col-6 mb-4">
              <div className="dept-card text-center">
                <div className="dept-icon-wrapper">
                  <i className="fas fa-heart dept-icon"></i>
                </div>
                <h5 className="dept-title">Cardiology</h5>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="dept-card text-center">
                <div className="dept-icon-wrapper">
                  <i className="fas fa-brain dept-icon"></i>
                </div>
                <h5 className="dept-title">Neurology</h5>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="dept-card text-center">
                <div className="dept-icon-wrapper">
                  <i className="fas fa-baby dept-icon"></i>
                </div>
                <h5 className="dept-title">Pediatrics</h5>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div className="dept-card text-center">
                <div className="dept-icon-wrapper">
                  <i className="fas fa-bone dept-icon"></i>
                </div>
                <h5 className="dept-title">Orthopedics</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="stat-number">
                <CountUp from={0} to={15000} separator=","direction="up"duration={0.2}className="count-up-text"/>+</div>
              <div className="stat-text">Patients Served Monthly</div>
            </div>
            <div className="col-md-4">
              <div className="stat-number"><CountUp from={0} to={200} separator=","direction="up"duration={0.8}className="count-up-text"/>+</div>
              <div className="stat-text">Specialist Doctors</div>
            </div>
            <div className="col-md-4">
              <div className="stat-number"><CountUp from={0} to={98} separator=","direction="up"duration={1}className="count-up-text"/>%</div>
              <div className="stat-text">Patient Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <h2 className="section-title">Patient Testimonials</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="testimonial-card">
                <p className="testimonial-text">MedixCare has completely transformed my healthcare experience. Booking appointments is now hassle-free, and I love being able to choose from so many qualified specialists.</p>
                <div className="testimonial-author">Emily Rodriguez</div>
                <div className="testimonial-role">Patient</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="testimonial-card">
                <p className="testimonial-text">The virtual consultation feature is a lifesaver! As someone with mobility issues, being able to consult with my doctor from home has made managing my health so much easier.</p>
                <div className="testimonial-author">Michael Thompson</div>
                <div className="testimonial-role">Patient</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-title">Ready to Take Control of Your Health?</h2>
              <p className="mb-4">Book your appointment today and experience healthcare the way it should be - simple, accessible, and patient-centered.</p>
              <Link to="/doctor_list"><button className="btn cta-button primary text-white">
                <i className="fas fa-calendar-check me-2"></i>Book Your Appointment Now
              </button></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer></Footer>
      


    </div>
  );
}

export default App;