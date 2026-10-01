import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { ROUTES } from '../routes'

export default function About() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const go = (page) => { navigate(ROUTES[page]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page">
      <div className="screen">
          <nav className="navbar">
              <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); go('home') }}><div className="nav-logo-icon">LS</div><div className="nav-logo-text"><span>Life</span>Saver</div></a>
              <div className="nav-links">
                  <a href="#" onClick={(e) => { e.preventDefault(); go('home') }}>Home</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('search') }}>Search Donor</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); go('donor-stock') }}>Blood Groups</a>
                  <a href="#" className="active">About</a>
              </div>
              <div className="nav-btns">
                  <button className="btn btn-outline btn-sm" onClick={() => go('login')}>Login</button>
                  <button className="btn btn-primary btn-sm" onClick={() => go('register')}>Register as Donor</button>
              </div>
          </nav>
          <div className="about-page">
              <div className="about-header"><h2>About Life Saver</h2><p>Connecting donors with those in need — a web-based blood donation and emergency request platform</p></div>
              <div className="about-content">
                  <div className="about-card"><h3>Our Mission</h3><p>Life Saver is a web-based platform designed to bridge the gap between blood donors and patients during critical emergencies. Our mission is to provide a fast, reliable, and user-friendly system that connects compatible donors with those in need, reducing response time and saving lives.</p></div>
                  <div className="about-card"><h3>Platform at a Glance</h3>
                      <div className="about-stats">
                          <div className="about-stat"><div className="num">512</div><div className="label">Registered Donors</div></div>
                          <div className="about-stat"><div className="num">8</div><div className="label">Blood Groups</div></div>
                          <div className="about-stat"><div className="num">247</div><div className="label">Lives Saved</div></div>
                          <div className="about-stat"><div className="num">24/7</div><div className="label">Emergency Support</div></div>
                      </div>
                  </div>
                  <div className="about-card"><h3>Key Features</h3>
                      <ul>
                          <li>Donor registration and profile management</li>
                          <li>Blood group and location-based donor search</li>
                          <li>Emergency blood request submission</li>
                          <li>Admin dashboard for donor management</li>
                          <li>Blood stock inventory tracking</li>
                          <li>Secure login with role-based access</li>
                          <li>Responsive design for all devices</li>
                          <li>Direct contact with available donors</li>
                      </ul>
                  </div>
                  <div className="about-card"><h3>Technology Stack</h3>
                      <ul>
                          <li><strong>Frontend:</strong> React.js, HTML5, CSS3, Inter Font</li>
                          <li><strong>Backend:</strong> Node.js, Express.js</li>
                          <li><strong>Database:</strong> MongoDB / Supabase</li>
                          <li><strong>Design:</strong> Figma</li>
                          <li><strong>Version Control:</strong> Git &amp; GitHub</li>
                          <li><strong>Development:</strong> Visual Studio Code</li>
                      </ul>
                  </div>
                  <div className="about-card"><h3>Project Team — Group 3</h3>
                      <div className="team-grid">
                          <div className="team-member"><div className="team-avatar">HM</div><div className="team-info"><div className="name">Hamlet Mondal</div><div className="role">ID: 20242073010</div></div></div>
                          <div className="team-member"><div className="team-avatar">MR</div><div className="team-info"><div className="name">Maksudur Rahman Jisan</div><div className="role">ID: 20242145010</div></div></div>
                          <div className="team-member"><div className="team-avatar">SR</div><div className="team-info"><div className="name">Sk. Fuadur Rahman</div><div className="role">ID: 20242156010</div></div></div>
                      </div>
                      <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--gray-500)' }}>
                          <strong>Supervisor:</strong> Istyaque Ahmmed, Lecturer, Department of CSE<br />
                          <strong>Course:</strong> Internet Programming Laboratory (CSE-3108) · Section B · Semester 3.1
                      </p>
                  </div>
                  <div className="about-card"><h3>Project Information</h3>
                      <p><strong>Project Name:</strong> Life Saver — Web-Based Blood Donation &amp; Emergency Blood Request System<br />
                      <strong>Duration:</strong> 10 Weeks<br />
                      <strong>Institution:</strong> North Western University, Khulna<br />
                      <strong>Department:</strong> Computer Science and Engineering</p>
                  </div>
              </div>
              <div className="footer">
                  <div><div className="footer-brand"><span>Life</span>Saver</div><div style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '2px' }}>Emergency Blood Donation Platform — Bangladesh</div></div>
                  <div className="footer-links">
                      <a href="#" onClick={(e) => { e.preventDefault(); go('home') }}>Home</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); go('search') }}>Search Donor</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); go('register') }}>Register</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); go('about') }}>About</a>
                  </div>
                  <div className="footer-copy">© 2026 Life Saver · CSE-3108 Group-3</div>
              </div>
          </div>
      </div>
    </div>
  )
}
