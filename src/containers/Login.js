import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        username: '',
        password: ''
      }
    }
  }

  handleChange = e => {
    const newFields = {...this.state.fields, [e.target.name]: e.target.value}
    this.setState( { fields: newFields } )
  }

  handleSubmit = e => {
    e.preventDefault()
    const { fields: { username, password } } = this.state;
    this.props.loginUser(username, password, this.props.history)
  }

  render(){
    const { fields } = this.state
    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            {this.props.errors?<Message warning>{this.props.errors}</Message>: null}
            <Header as='h2' color='olive' textAlign='center'>
              {' '}Log-in to your account
            </Header>
            <Form onSubmit={this.handleSubmit} size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='username'
                  value={fields.username}
                  onChange={this.handleChange}
                  name="username"
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='password'
                  type='password'
                  name="password"
                  value={fields.password}
                  onChange={this.handleChange}
                />
                <Button type='submit' color='olive' fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to='/signup'>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors : state.auth.errors
  }
}
export default withRouter(connect(mapStateToProps, actions)(Login))
