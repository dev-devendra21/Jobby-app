import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'
import './index.css'

const SimilarJobsItem = props => {
  const {similarJobList} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarJobList
  return (
    <>
      <li className="similar-jobs-card-container">
        <section className="employee-role-container">
          <div className="company-logo-container">
            <img
              alt="similar job company logo"
              className="company-logo"
              src={companyLogoUrl}
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
        <section>
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </section>
        <section>
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
        </section>
      </li>
    </>
  )
}

export default SimilarJobsItem
