import React, { useContext, useEffect, useRef } from 'react'
import Api from '../services/api'
import { AuthContext } from '../store/AuthStore'

const Login = () => {
  const username = useRef()
  const password = useRef()
  const { login } = useContext(AuthContext)

  useEffect(() => {
    username.current.value = 'johndoe'
    password.current.value = 'bonsoir'
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const { token } = await Api.login({ username: username.current.value, password: password.current.value })
    console.log(token)
    if (token) {
      login(token)
    }
  }

  return (
    <section className="hero is-primary is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-3-widescreen">
            <form onSubmit={onSubmit} className="box">
              <div className="field">
                <label htmlFor="username" className="label">Username</label>
                <div className="control has-icons-left">
                  <input ref={username} className="input" name="username"/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label htmlFor="password" className="label">Password</label>
                <div className="control has-icons-left">
                  <input name="password" ref={password} type="password" placeholder="*******" className="input" required />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="checkbox">
                  <input type="checkbox" />
                 Remember me
                </label>
              </div>
              <div className="field">
                <button className="button is-success" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login
