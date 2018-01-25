import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class Signup extends React.Component {
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

  handleChange = event => {
    const newFields = {...this.state.fields, [event.target.name]: event.target.value}
    this.setState({fields: newFields})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {fields: {username, password}} = this.state;
    this.props.createUser(username, password, this.props.history)
  }

  render(){
    console.log('from signup',this.props.errors)
    const {fields} = this.state
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
            {this.props.errors ?
              <Message warning> {this.props.errors.map(error => <p>{error}</p>)}
                </Message>: null}
            <Header as='h1' inverted textAlign='center'>
              {' '}Pick a username to get started.
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
                <Button type='submit' color='olive' fluid size='large'>Sign Up</Button>
              </Segment>
            </Form>
            <Message>
              Already a member? <Link to='/login'>Log in</Link>
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
export default withRouter(connect(mapStateToProps, actions)(Signup))
