import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home({ departments }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDepartments, setFilteredDepartments] = useState(departments)
  const [selectedDept, setSelectedDept] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const filtered = departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.faculty.some(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredDepartments(filtered)
  }, [searchTerm, departments])

  const handleDeptClick = (deptId) => {
    setSelectedDept(selectedDept === deptId ? null : deptId)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <Head>
        <title>KL University — Departments</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Explore KL University departments, faculty information, and contact details with interactive features" />
      </Head>

      <main className={`container ${isLoaded ? 'loaded' : ''} ${darkMode ? 'dark' : ''}`}>
        <header className="site-header">
          <div className="header-controls">
            <button 
              onClick={toggleDarkMode} 
              className="theme-toggle"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <h1>KL University — Departments</h1>
          <p className="lead">Interactive department directory with faculty information and contact details</p>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search departments or faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="stats-bar">
            <div className="stat">
              <span className="stat-number">{filteredDepartments.length}</span>
              <span className="stat-label">Departments</span>
            </div>
            <div className="stat">
              <span className="stat-number">{filteredDepartments.reduce((acc, dept) => acc + dept.faculty.length, 0)}</span>
              <span className="stat-label">Faculty Members</span>
            </div>
          </div>
        </header>

        {filteredDepartments.length === 0 && searchTerm && (
          <div className="no-results">
            <h3>No results found</h3>
            <p>Try searching with different keywords</p>
          </div>
        )}

        <section className="grid">
          {filteredDepartments.map((dept, index) => (
            <article 
              key={dept.id} 
              className={`card ${selectedDept === dept.id ? 'expanded' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleDeptClick(dept.id)}
            >
              <div className="card-header">
                <h2 className="dept-name">{dept.name}</h2>
                <button className="expand-btn" aria-label="Toggle details">
                  {selectedDept === dept.id ? '−' : '+'}
                </button>
              </div>
              
              <p className="dept-desc">{dept.description}</p>
              
              <div className="faculty-count">
                <span className="count-badge">{dept.faculty.length} Faculty Members</span>
              </div>

              <div className={`faculty-list ${selectedDept === dept.id ? 'expanded' : 'collapsed'}`}>
                {dept.faculty.map((f, i) => (
                  <div key={i} className="faculty" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="faculty-avatar">
                      {f.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="faculty-info">
                      <div className="faculty-main">
                        <strong className="faculty-name">{f.name}</strong>
                        <span className="faculty-title">{f.title}</span>
                      </div>
                      <div className="faculty-contact">
                        <a 
                          href={`mailto:${f.email}`} 
                          className="contact-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          📧 {f.email}
                        </a>
                        <a 
                          href={`tel:${f.phone}`} 
                          className="contact-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          📞 {f.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedDept === dept.id && (
                <div className="card-actions">
                  <button className="action-btn primary">View Details</button>
                  <button className="action-btn secondary">Contact Department</button>
                </div>
              )}
            </article>
          ))}
        </section>

        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>KL University</h3>
              <p>Leading institution for engineering and technology education</p>
              <div className="footer-contact">
                <p>📍 Vaddeswaram, Guntur, Andhra Pradesh 522502</p>
                <p>📞 +91-863-2344700</p>
                <p>✉️ info@klu.ac.in</p>
              </div>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#admissions">Admissions</a></li>
                <li><a href="#academics">Academics</a></li>
                <li><a href="#research">Research</a></li>
                <li><a href="#campus">Campus Life</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Departments</h4>
              <ul className="footer-links">
                <li><a href="#cse">Computer Science</a></li>
                <li><a href="#ece">Electronics & Communication</a></li>
                <li><a href="#mech">Mechanical Engineering</a></li>
                <li><a href="#civil">Civil Engineering</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} KL University. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </footer>
      </main>
    </>
  )
}

export async function getStaticProps() {
  // Static data fetched at build time
  const departments = require('../data/departments.json')

  return {
    props: {
      departments,
    },
  }
}