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
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

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
            <SideBar/>
          </Grid.Column>
          <Grid.Column width={10}>
            <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
            <TransactionsTable history={this.props.history}/>
          </Grid.Column>
          <Grid.Column width={4}>
            <Sidebar.Pushable>
              <Sidebar
                animation='overlay'
                width='wide'
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
    user: state.auth.currentUser.transactions
  }
}


export default withAuth(connect(mapStateToProps, actions)(Dashboard))
