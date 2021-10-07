import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import Api from '../services/Api'

const Register = () => {
  const history = useHistory()
  const [error, setError] = useState(null)
  const username = useRef()
  const password = useRef()
  const email = useRef()

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(email.current.value)
    const data = await Api.register({ username: username.current.value, password: password.current.value, email: email.current.value })
    if (username) {
      history.push('/?registered')
    } else {
      if(data.error && data.error.message)
        setError(data.error.message)
    }
  }
  return (
    <section className="hero is-secondary is-fullheight">
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
                  <label htmlFor="email" className="label">Email</label>
                  <div className="control has-icons-left">
                    <input name="email" ref={email} type="text" placeholder="john@doe.fr" className="input" required />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="password" className="label">Password</label>
                  <div className="control has-icons-left">
                    <input name="password" ref={password} type="password" placeholder="*******" className="input" required  />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>

                <div className="field">
                  <button className="button is-success" type="submit">
                    Register
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

export default Register
