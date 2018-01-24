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

class Dashboard extends React.Component {
  componentDidMount(){
    this.props.fetchUser(localStorage.getItem('token'))
  }

  render(){
    return (
      <div>
        <DashboardNavbar history={this.props.history}/>
        <AddTransaction history={this.props.history}/>
        <Upload history={this.props.history}/>
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
        <Footer/>
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
