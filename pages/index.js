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
        <style jsx global>{`
          :root{
            --bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --card: #ffffff;
            --muted: #6b7280;
            --accent: #1a202c;
            --primary: #3182ce;
            --primary-light: #63b3ed;
            --border: #e2e8f0;
            --footer-bg: #2d3748;
            --footer-text: #cbd5e0;
          }
          * { box-sizing: border-box; }
          html, body, #__next { height: 100%; margin: 0; padding: 0; }
          body {
            font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background: var(--bg);
            color: var(--accent);
            -webkit-font-smoothing: antialiased;
            line-height: 1.6;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 32px 16px 0;
            min-height: calc(100vh - 200px);
          }
          .site-header {
            text-align: center;
            margin-bottom: 40px;
            padding: 40px 20px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            position: relative;
          }
          .header-controls {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 10;
          }
          .theme-toggle {
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          }
          .theme-toggle:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
          }
          .site-header h1 {
            margin: 0 0 12px;
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--accent);
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .lead {
            color: var(--muted);
            margin: 0;
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto 24px;
          }
          .search-container {
            position: relative;
            margin: 24px auto;
            max-width: 500px;
          }
          .search-input {
            width: 100%;
            padding: 16px 50px 16px 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            font-size: 1rem;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            outline: none;
          }
          .search-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
          }
          .search-icon {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2rem;
            color: var(--muted);
          }
          .stats-bar {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 20px;
          }
          .stat {
            text-align: center;
            background: rgba(255, 255, 255, 0.8);
            padding: 12px 24px;
            border-radius: 12px;
            backdrop-filter: blur(10px);
          }
          .stat-number {
            display: block;
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
          }
          .stat-label {
            font-size: 0.9rem;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
            margin-bottom: 60px;
          }
          .card {
            background: var(--card);
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid var(--border);
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
          }
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
          }
          .dept-name {
            margin: 0 0 4px;
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--primary);
          }
          .expand-btn {
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-left: auto;
          }
          .expand-btn:hover {
            background: var(--primary-light);
            transform: rotate(90deg);
          }
          .dept-desc {
            margin: 0 0 12px;
            color: var(--muted);
            font-size: 0.95rem;
            line-height: 1.5;
          }
          .count-badge {
            background: linear-gradient(45deg, var(--primary), var(--primary-light));
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
          }
          .faculty-list {
            transition: max-height 0.3s ease;
          }
          .faculty-list.collapsed {
            max-height: 0;
            overflow: hidden;
          }
          .faculty-list.expanded {
            max-height: 1000px;
          }
          .faculty {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 12px 0;
            border-top: 1px solid var(--border);
          }
          .faculty:first-child {
            border-top: 0;
            padding-top: 0;
          }
          .faculty-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--primary), var(--primary-light));
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.9rem;
            flex-shrink: 0;
          }
          .faculty-info {
            flex: 1;
          }
          .faculty-main {
            display: flex;
            flex-direction: column;
            gap: 2px;
            margin-bottom: 8px;
          }
          .faculty-name {
            font-weight: 600;
            font-size: 1rem;
            color: var(--accent);
          }
          .faculty-title {
            color: var(--muted);
            font-size: 0.9rem;
            font-style: italic;
          }
          .faculty-contact {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .contact-link {
            color: var(--primary);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 8px;
            border-radius: 6px;
            transition: all 0.2s ease;
            margin: 2px 0;
          }
          .contact-link:hover {
            background: rgba(49, 130, 206, 0.1);
            text-decoration: underline;
          }
          .site-footer {
            background: var(--footer-bg);
            color: var(--footer-text);
            margin-top: 80px;
            padding: 40px 0 20px;
          }
          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
          }
          .footer-section h3 {
            color: #ffffff;
            margin: 0 0 16px;
            font-size: 1.4rem;
            font-weight: 600;
          }
          .footer-section h4 {
            color: #ffffff;
            margin: 0 0 12px;
            font-size: 1.1rem;
            font-weight: 500;
          }
          .footer-section p {
            margin: 0 0 8px;
            line-height: 1.6;
          }
          .footer-contact p {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 8px 0;
          }
          .footer-links {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .footer-links li {
            margin: 8px 0;
          }
          .footer-links a {
            color: var(--footer-text);
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .footer-links a:hover {
            color: #ffffff;
            text-decoration: underline;
          }
          .footer-bottom {
            border-top: 1px solid #4a5568;
            margin-top: 30px;
            padding: 20px 16px 0;
            text-align: center;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }
          .footer-bottom p {
            margin: 0;
            font-size: 0.9rem;
            color: #a0aec0;
          }
          @media (max-width: 768px) {
            .container { padding: 16px 12px 0; }
            .site-header { padding: 24px 16px; margin-bottom: 24px; }
            .site-header h1 { font-size: 1.8rem; }
            .stats-bar { gap: 20px; }
            .grid { grid-template-columns: 1fr; gap: 16px; }
            .card { padding: 20px; }
            .footer-content { grid-template-columns: 1fr; gap: 24px; text-align: center; }
          }
        `}</style>
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