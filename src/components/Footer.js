import React from 'react'
import {Container, Icon, List, Segment} from 'semantic-ui-react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (<div>
    <Segment
      inverted
      vertical
      style={{padding: '2em 1em 1em 1em' }}
    >
      <Container textAlign='center'>
        <Icon name='grid layout' inverted size='large' /><br/>
        <List horizontal inverted divided link size='tiny'>
          <List.Item>Site Map</List.Item>
          <List.Item >Contact Us</List.Item>
          <List.Item >Terms and Conditions</List.Item>
          <List.Item >Privacy Policy</List.Item>
        </List>
      </Container>
    </Segment>
  </div>)
}

export default Footer;
