import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'

import './index.css'

const JobCardItem = props => {
  const {jobList} = props

  const {
    id,
    title,
    rating,
    location,
    packagePerAnnum,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = jobList
  return (
    <>
      <Link className="job-card-link" to={`jobs/${id}`}>
        <li className="job-card-container">
          <section className="employee-role-container">
            <div className="company-logo-container">
              <img
                className="company-logo"
                src={companyLogoUrl}
                alt="company logo"
              />
            </div>
            <div className="job-role-container">
              <h1 className="job-role-title">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </section>
          <section className="location-and-salary-container">
            <div className="location-and-employement-type-container">
              <div className="location-container">
                <IoLocation className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employement-type-container">
                <BsBriefcaseFill className="employment-type-icon" />
                <p className="employement-type">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="package-per-annum">{packagePerAnnum}</p>
            </div>
          </section>
          <section>
            <h1 className="description-heading">Description</h1>
            <p className="job-description">{jobDescription}</p>
          </section>
        </li>
      </Link>
    </>
  )
}

export default JobCardItem
