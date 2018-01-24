
import React from 'react'
import {
  Button,
  Container,
  Header,
  Segment,
  Grid,
  Image,
  Icon,
  List,
  Divider
} from 'semantic-ui-react'
import { Link } from "react-router-dom";

const HomepageLayout = () => {
  return (
    <div>
    <Segment
      textAlign='center'
      style={{minHeight: 500}}
      color='grey'
      vertical
    >
      <Container text>
        <Header
          inverted
          as='h1'
          content='Wallet'
          style={{ fontSize: '4em', fontWeight: 'bold', marginBottom: 0, marginTop: '2em' }}
        />
        <Header
          as='h2'
          inverted
          content='track all of your expenses in one place'
          style={{ fontSize: '2em', fontWeight: 'bold' }}
        />
        <Button as={Link} to='/login' color='olive' size='huge'>
          Login
        </Button>
        <Button as={Link} to='/signup' color='olive' size='huge'>
          Sign Up
        </Button>
      </Container>
    </Segment>

    <Segment
      style={{ padding: '4em 0em 0em 0em' }}
      vertical
      textAlign='center'
    >
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column>
            <Header as='h3' style={{ fontSize: '1.5em', fontWeight: 'bold'}}>View all of your transactions</Header>
            <p style={{ fontSize: '1em' }}>
              See every single transaction across all of your accounts
            </p>
             <Icon name='calculator' inverted color='teal' size='huge' />
            <Header as='h3' style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Easily connect your bank accounts</Header>
            <p style={{ fontSize: '1em' }}>
              With a click of a button, import all of your transactions. All of your data is encrypted at a 256-bit encryption level so it is always secure!
            </p>
            <Icon name='line chart' inverted color='teal' size='huge' />
          <Header as='h3' style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Get spending insights</Header>
          <p style={{ fontSize: '1em' }}>
            Using machine learning, we automatically categorize you transactions to give you better insight into where you are spending!
          </p>
          <Icon name='pie graph' inverted color='teal' size='huge' /><br/><br/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>


        <Segment
          inverted
          vertical
          style={{ margin: '0em 0em 0em', padding: '1em 1em 1em 1em' }}
        >
          <Container textAlign='center'>
            <Icon name='grid layout' inverted size='large' /><br/>
            <List horizontal inverted divided link style={{ fontSize: '1em' }}>
              <List.Item as='a' href='#'>Site Map</List.Item>
              <List.Item as='a' href='#'>Contact Us</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
      </div>

  )
}

export default HomepageLayout
