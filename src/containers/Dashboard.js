import React from 'react'
import SideBar from '../components/SideBar'
import TransactionsTable from '../components/TransactionsTable'
import {Grid} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Dashboard extends React.Component {

  componentDidMount(){
    this.props.fetchAccounts()
  }

  render(){
    return (
      <div>
        <Grid columns={2}>
          <Grid.Column width={4}>
            <SideBar/>
          </Grid.Column>
          <Grid.Column width={8}>
            <TransactionsTable
              account={this.props.account}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser.id,
    user: state.auth.currentUser,
    active_account: state.accounts.active_account,
    accounts: state.accounts.accounts,
    account: state.accounts.account
  }
}

export default connect(mapStateToProps, actions)(Dashboard)
