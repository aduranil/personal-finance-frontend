import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as actions from '../actions'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {
        username: '',
        password: ''
      }
    }
  }

  handleChange = e => {
    const newFields = {...this.state.fields, [e.target.name]:e.target.value}
    this.setState({fields: newFields})
  }

  handleSubmit = e => {
    e.preventDefault()
    const {fields: {username, password}} = this.setState
  }

  render(){
    return (
      <div>hi</div>
    )
  }
}
export default Login
