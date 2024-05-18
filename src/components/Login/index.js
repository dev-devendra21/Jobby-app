import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

export default class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onLoginFormSubmit = event => {
    event.preventDefault()
    this.checkIsUserAuthenticate()
  }

  onSuccessLogin = token => {
    this.setState({showErrorMsg: false})
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  checkIsUserAuthenticate = async () => {
    const {username, password} = this.state
    const loginApiUrl = 'https://apis.ccbp.in/login'

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)

    const data = await response.json()

    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onSetUsername = event => {
    this.setState({username: event.target.value})
  }

  onSetPassword = event => {
    this.setState({password: event.target.value})
  }

  renderForm = () => {
    const {username, password, errorMsg, showErrorMsg} = this.state

    return (
      <>
        <div className="form-card-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo-img"
              alt="website logo"
            />
          </div>
          <form className="form-container" onSubmit={this.onLoginFormSubmit}>
            <div className="username-container">
              <label className="label-text" htmlFor="username">
                USERNAME
              </label>
              <input
                placeholder="Username"
                id="username"
                type="text"
                value={username}
                className="input"
                onChange={this.onSetUsername}
              />
            </div>
            <div className="password-container">
              <label className="label-text" htmlFor="password">
                PASSWORD
              </label>
              <input
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                className="input"
                onChange={this.onSetPassword}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
          </form>
        </div>
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-bg-container">{this.renderForm()}</div>
      </>
    )
  }
}
