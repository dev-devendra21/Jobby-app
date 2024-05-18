import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {IoExitOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="header-bg-container">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo-img"
            alt="website logo"
          />
        </div>
        <nav className="navbar-mobile">
          <ul className="nav-mobile-link-list">
            <Link className="nav-link" to="/">
              <li>
                <AiFillHome className="header-icon" />
              </li>
            </Link>
            <Link className="nav-link" to="/jobs">
              <li>
                <FaSuitcase className="header-icon" />
              </li>
            </Link>
            <li>
              <IoExitOutline onClick={onClickLogOut} className="header-icon" />
            </li>
          </ul>
        </nav>
        <nav className="navbar-desktop">
          <ul className="nav-desktop-link-list">
            <Link className="nav-link" to="/">
              <li className="desktop-link">Home</li>
            </Link>
            <Link className="nav-link" to="/jobs">
              <li className="desktop-link">Jobs</li>
            </Link>
          </ul>
        </nav>
        <div className="Logout-desktop-btn-container">
          <button
            type="button"
            onClick={onClickLogOut}
            className="Logout-desktop-btn"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(Header)
