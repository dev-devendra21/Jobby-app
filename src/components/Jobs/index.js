import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCardItem from '../JobCardItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const locationList = [
  {
    label: 'Hyderabad',
    locationId: 'HYDERABAD',
  },
  {
    label: 'Bangalore',
    locationId: 'BANGALORE',
  },
  {
    label: 'Chennai',
    locationId: 'CHENNAI',
  },
  {
    label: 'Delhi',
    locationId: 'DELHI',
  },
  {
    label: 'Mumbai',
    locationId: 'MUMBAI',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'INPROCESS',
}

export default class Jobs extends Component {
  state = {
    profile: {},
    jobList: [],
    searchInput: '',
    profileApiStatus: apiStatusList.inProcess,
    jobCardApiStatus: apiStatusList.inProcess,
    salaryRange: '',
    employmentType: [],
    location: [],
  }

  componentDidMount() {
    this.getProfileCard()
    this.getJobList()
  }

  onRetryJobCard = () => {
    this.setState({jobCardApiStatus: apiStatusList.inProcess}, this.getJobList)
  }

  onRetryProfileCard = () => {
    this.setState(
      {profileApiStatus: apiStatusList.inProcess},
      this.getProfileCard,
    )
  }

  onClickSearchIcon = () => {
    this.setState({jobCardApiStatus: apiStatusList.inProcess}, this.getJobList)
  }

  setSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  setSalaryRange = event => {
    this.setState(
      {
        salaryRange: event.target.value,
        jobCardApiStatus: apiStatusList.inProcess,
      },
      this.getJobList,
    )
  }

  setEmploymentType = event => {
    const {employmentType} = this.state

    const value = employmentType.includes(event.target.value)
    if (value) {
      const filterValue = employmentType.filter(
        eachValue => eachValue !== event.target.value,
      )
      this.setState(
        {
          employmentType: filterValue,
          jobCardApiStatus: apiStatusList.inProcess,
        },
        this.getJobList,
      )
    } else {
      this.setState(
        previousValue => ({
          employmentType: [...previousValue.employmentType, event.target.value],
          jobCardApiStatus: apiStatusList.inProcess,
        }),
        this.getJobList,
      )
    }
  }

  setLocation = event => {
    const {location} = this.state
    const value = location.includes(event.target.value)
    if (value) {
      const filterValue = location.filter(
        eachValue => eachValue !== event.target.value,
      )
      this.setState(
        {
          location: filterValue,
          jobCardApiStatus: apiStatusList.inProcess,
        },
        this.getJobList,
      )
    } else {
      this.setState(
        previousValue => ({
          location: [...previousValue.location, event.target.value],
          jobCardApiStatus: apiStatusList.inProcess,
        }),
        this.getJobList,
      )
    }
  }

  getProfileCard = async () => {
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const formatData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profile: formatData,
        profileApiStatus: apiStatusList.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusList.failure})
    }
  }

  formatJobData = data => {
    const jobsData = data.map(eachJob => ({
      id: eachJob.id,
      title: eachJob.title,
      rating: eachJob.rating,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      jobDescription: eachJob.job_description,
      employmentType: eachJob.employment_type,
      companyLogoUrl: eachJob.company_logo_url,
    }))

    return jobsData
  }

  getJobList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {salaryRange, searchInput, employmentType, location} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&location=${location.join(
      ',',
    )}&search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const formatData = this.formatJobData(data.jobs)
      this.setState({
        jobList: formatData,
        jobCardApiStatus: apiStatusList.success,
      })
    } else {
      this.setState({jobCardApiStatus: apiStatusList.failure})
    }
  }

  renderOnSuccessJobCard = () => {
    const {jobList} = this.state
    return (
      <ul className="job-card-item-list-container">
        {jobList.map(eachJobs => (
          <JobCardItem jobList={eachJobs} key={eachJobs.id} />
        ))}
        {jobList.length === 0 && (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-paragraph">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </ul>
    )
  }

  renderOnFailureJobCard = () => (
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
          onClick={this.onRetryJobCard}
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </>
  )

  renderJobCard = () => {
    const {jobCardApiStatus} = this.state
    switch (jobCardApiStatus) {
      case 'SUCCESS':
        return this.renderOnSuccessJobCard()
      case 'FAILURE':
        return this.renderOnFailureJobCard()
      case 'INPROCESS':
        return this.onShowLoader()
      default:
        return ''
    }
  }

  renderJobList = () => {
    const {searchInput} = this.state

    return (
      <>
        <section className="job-list-container">
          <div className="search-input-container">
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.setSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-icon-btn"
              onClick={this.onClickSearchIcon}
            >
              <BsSearch className="search-icon" />
              {}
            </button>
          </div>
          <div>{this.renderJobCard()}</div>
        </section>
      </>
    )
  }

  onShowLoader = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  onSucessProfileCard = () => {
    const {profile} = this.state
    const {profileImageUrl, shortBio, name} = profile
    return (
      <>
        <div className="profile-card-container">
          <img
            alt="profile icon"
            className="avatar-icon"
            src={profileImageUrl}
          />
          <h1 className="name">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
      </>
    )
  }

  onFailureProfileCard = () => (
    <>
      <div className="retry-btn-container">
        <button
          type="button"
          onClick={this.onRetryProfileCard}
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </>
  )

  renderProfileCard = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case 'SUCCESS':
        return this.onSucessProfileCard()
      case 'FAILURE':
        return this.onFailureProfileCard()
      case 'INPROCESS':
        return this.onShowLoader()
      default:
        return ''
    }
  }

  renderSideBar = () => (
    <>
      <aside className="aside-bar-container">
        {this.renderProfileCard()}
        <div className="type-of-employment-container">
          <h1 className="sidebar-heading">Type of Employment</h1>
          <ul className="type-of-employment-list">
            {employmentTypesList.map(eachEmploymentType => (
              <li
                key={eachEmploymentType.employmentTypeId}
                className="sidebar-list"
              >
                <input
                  id={eachEmploymentType.employmentTypeId}
                  value={eachEmploymentType.employmentTypeId}
                  type="checkbox"
                  onChange={this.setEmploymentType}
                />
                <label
                  className="type-label-text"
                  htmlFor={eachEmploymentType.employmentTypeId}
                >
                  {eachEmploymentType.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="salary-range-container">
          <h1 className="sidebar-heading">Salary Range</h1>
          <ul className="salary-range-list">
            {salaryRangesList.map(eachSalaryRange => (
              <li key={eachSalaryRange.salaryRangeId} className="sidebar-list">
                <input
                  type="radio"
                  value={eachSalaryRange.salaryRangeId}
                  id={eachSalaryRange.salaryRangeId}
                  name="salaryRange"
                  onChange={this.setSalaryRange}
                />
                <label
                  className="type-label-text"
                  htmlFor={eachSalaryRange.salaryRangeId}
                >
                  {eachSalaryRange.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="type-of-location-container">
          <h1 className="sidebar-heading">Location</h1>
          <ul className="type-of-location-list">
            {locationList.map(eachlocation => (
              <li key={eachlocation.locationId} className="sidebar-list">
                <input
                  id={eachlocation.locationId}
                  value={eachlocation.locationId}
                  type="checkbox"
                  onChange={this.setLocation}
                />
                <label
                  className="type-label-text"
                  htmlFor={eachlocation.locationId}
                >
                  {eachlocation.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-container">
            {this.renderSideBar()}
            {this.renderJobList()}
          </div>
        </div>
      </>
    )
  }
}
