import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'
import {HiExternalLink} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobsItem from '../SimilarJobsItem'

import './index.css'

const apiStatusList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'INPROCESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobList: [],
    apiStatus: apiStatusList.inProcess,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onRetryjobDetails = () => {
    this.setState({apiStatus: apiStatusList.inProcess}, this.getJobDetails)
  }

  setSkills = data => {
    const skillList = data.map(eachSkills => ({
      name: eachSkills.name,
      imageUrl: eachSkills.image_url,
    }))

    return skillList
  }

  formatJobDetails = data => {
    const jobDetailsData = {
      id: data.job_details.id,
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      title: data.job_details.title,
      lifeAtCompany: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
      skills: this.setSkills(data.job_details.skills),
    }

    const similarJobData = data.similar_jobs.map(eachSimilarJobs => ({
      id: eachSimilarJobs.id,
      companyLogoUrl: eachSimilarJobs.company_logo_url,
      employmentType: eachSimilarJobs.employment_type,
      jobDescription: eachSimilarJobs.job_description,
      location: eachSimilarJobs.location,
      rating: eachSimilarJobs.rating,
      title: eachSimilarJobs.title,
    }))

    return {jobDetailsData, similarJobData}
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(jobApiUrl, options)
    const data = await response.json()
    const formatData = this.formatJobDetails(data)
    if (response.ok) {
      this.setState({
        jobDetails: formatData.jobDetailsData,
        similarJobList: formatData.similarJobData,
        apiStatus: apiStatusList.success,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderSimilarJobs = () => {
    const {similarJobList} = this.state
    return (
      <>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobList.map(eachJobs => (
              <SimilarJobsItem key={eachJobs.id} similarJobList={eachJobs} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      title,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      lifeAtCompany,
      skills,
    } = jobDetails

    return (
      <>
        <li className="job-details-card-container">
          <section className="employee-role-container">
            <div className="company-logo-container">
              <img
                alt="job details company logo"
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
            <div className="description-container">
              <h1 className="description-heading">Description</h1>
              <a className="official-website-link" href={companyWebsiteUrl}>
                <p className="visit-link">Visit</p>
                <HiExternalLink className="visit-link-icon" />
              </a>
            </div>

            <p className="job-description">{jobDescription}</p>
          </section>
          <section>
            <h1 className="skill-heading">Skills</h1>
            <ul className="skills-container-list">
              {skills.map(eachSkills => (
                <li key={eachSkills.name} className="skill-list">
                  <img
                    alt="skills logo"
                    className="language-icon"
                    src={eachSkills.imageUrl}
                  />
                  <p className="language-name">{eachSkills.name}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="company-description">{lifeAtCompany.description}</p>
              <img
                alt="company"
                className="company-img"
                src={lifeAtCompany.imageUrl}
              />
            </div>
          </section>
        </li>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderOnFailureView = () => (
    <>
      <div className="failure-job-card-container">
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-job-card-heading">Oops! Something Went Wrong</h1>
        <p className="failure-job-card-paragraph">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          onClick={this.onRetryjobDetails}
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </>
  )

  onShowLoader = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderJobDetails()
      case 'FAILURE':
        return this.renderOnFailureView()
      case 'INPROCESS':
        return this.onShowLoader()
      default:
        return ''
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-bg-container">
          {this.renderJobItemDetails()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
