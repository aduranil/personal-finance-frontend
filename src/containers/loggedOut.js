
import React, { Component } from 'react'
import {
  Button,
  Container,
  Header,
  Segment,
} from 'semantic-ui-react'
import { Link } from "react-router-dom";

export default class HomepageLayout extends Component {

  render() {
    return (
      <Segment
        textAlign='center'
        style={{height: '100vh'}}
        vertical
      >
        <Container text>
          <Header
            as='h1'
            content='Wallet'
            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
          />
          <Header
            as='h2'
            content='track all of your expenses in one place'
            style={{ fontSize: '1.7em', fontWeight: 'normal' }}
          />
          <Button as={Link} to='/login' color='olive' size='huge'>
            Login
          </Button>
          <Button color='olive' size='huge'>
            Sign Up
          </Button>
        </Container>
      </Segment>
    )
  }
}
