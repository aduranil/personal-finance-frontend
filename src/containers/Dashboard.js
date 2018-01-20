import React from 'react'
import SideBar from '../components/SideBar'
import DashboardNavbar from '../components/DashboardNavbar'
import TransactionsTable from '../components/TransactionsTable'
import {Grid} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import withAuth from '../hocs/withAuth'
import AddTransaction from '../components/AddTransaction'
import Filter from '../components/Filter'

class Dashboard extends React.Component {

  render(){
    return (
      <div>
        <DashboardNavbar history={this.props.history}/>
        <AddTransaction history={this.props.history}/>
        <Grid columns={3} stackable>
          <Grid.Column width={2}>
            <SideBar/>
          </Grid.Column>
          <Grid.Column width={11}>
            <TransactionsTable history={this.props.history}/>
          </Grid.Column>
          <Grid.Column width={3}>
            <Filter/>
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}

export default withAuth(connect(null, actions)(Dashboard))
