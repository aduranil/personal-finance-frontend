import React from 'react'
import SideBar from '../components/SideBar'
import DashboardNavbar from '../components/DashboardNavbar'
import TransactionsTable from '../components/TransactionsTable'
import {Grid, Loader} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import withAuth from '../hocs/withAuth'
import AddTransaction from '../components/AddTransaction'
import Filter from '../components/Filter'
import Upload from '../components/Upload'
import Footer from '../components/Footer'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Divider } from 'semantic-ui-react'

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Dashboard extends React.Component {

  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })


  render(){
    const { visible } = this.state
    return (
      <div>
        <DashboardNavbar history={this.props.history}/>
        <AddTransaction history={this.props.history}/>
        <Upload history={this.props.history}/>
        <Grid columns={3} stackable>
          <Grid.Column width={2}>
          <Sidebar.Pushable>
            <Sidebar
              animation='overlay'
              direction='left'
              width='thin'
              visible='true'
              icon='labeled'
              vertical
            >
            <SideBar/>
            </Sidebar>
          </Sidebar.Pushable>
          </Grid.Column>
          <Grid.Column width={11}>

            <Grid.Row>
              <Button className='ui right floated button' onClick={this.toggleVisibility}>Filter Transactions</Button>
              <Header as='h2'>Hi, {this.props.user.username}! Cash & Credit Accounts</Header>

            </Grid.Row>
            <Grid.Row>
            <Divider/>
            <Header as='h1'>{this.props.name}:  ${numberWithCommas(parseFloat(Math.round(this.props.balance * 100)/100))}</Header>
            <Divider/>
            </Grid.Row>
            <TransactionsTable history={this.props.history}/>
          </Grid.Column>
          <Grid.Column width={3}>
            <Sidebar.Pushable>
              <Sidebar
                animation='overlay'
                direction='right'
                visible={visible}
                icon='labeled'
                vertical
                inverted
                secondary
              >
                <Filter/>
                </Sidebar>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    name: state.auth.name,
    balance: state.auth.balance
  }
}


export default withAuth(connect(mapStateToProps, actions)(Dashboard))
