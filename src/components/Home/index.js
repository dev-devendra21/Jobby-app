import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <div>
      <Header />
      <div className="home-bg-container">
        <div className="hero-section">
          <h1 className="hero-section-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="hero-section-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link className="job-link-btn" to="/jobs">
            <button type="button" className="find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default Home
