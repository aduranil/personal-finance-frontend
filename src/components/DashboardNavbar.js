import React from 'react'
import {Menu, Modal, Form, Button, Dropdown} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import withAuth from '../hocs/withAuth'
import { adapter } from '../services'
import PlaidLink from 'react-plaid-link';

class DashboardNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home',
      modalOpen: false,
      deleteAccountModal: false,
      account_name: '',
      account_id: '',
      user_id: this.props.user.id,
      publicKey: "a5ec48b34d0a037118ccb09fd170a9",
      clientName: this.props.user.username
    }
  }

  handleChange = event => {
    this.setState({account_name: event.target.value})
  }

  handleDeleteOpen = () => {
    this.setState({deleteAccountModal: true})
  }

  handleDeleteClose = () => this.setState({deleteAccountModal: false})

  handleSubmit = () => {
    let name = this.state.account_name
    let user_id = this.state.user_id
    this.props.addAccount(name, user_id)
    this.setState({modalOpen: false, account_name: '' })
  }

  handleOpen = () => this.setState({modalOpen: true})

  handleClose = () => this.setState({modalOpen: false})

  handleAccountSubmit = () => {
    this.setState({deleteAccountModal: false})
    this.props.deleteAccount(this.state.account_id, this.props.history)
  }

  handleClick = event => {
    this.setState({
      account_name: event.currentTarget.innerText,
      account_id: event.currentTarget.attributes[0].nodeValue
    })
  }

  handleOnSuccess = (user_id, token, metadata) => {
    adapter.auth.createAccountsFromPlaid(this.props.user.id, token, metadata)
  }

  render(){
    const { activeItem } = this.state
    console.log('from dashboard nav', this.state)
    let data = []
    if (this.props.user.accounts) {
      this.props.user.accounts.map((account,index) =>
        data.push({key:index, text: account.name, name: account.id, value:account.name})
      )
    }
    return (
      <Menu color='blue' inverted secondary>
        <Menu.Item
          name='Add Transaction'
          active={activeItem === 'Add Transaction'}
          onClick={()=>this.props.modal(!this.props.modalBoolean)}
        >
          Add Transaction
        </Menu.Item>
        <Modal
          trigger={<Menu.Item name='Add Account' active={activeItem === 'Add Account'} onClick={this.handleOpen}> Add Account </Menu.Item>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          size='tiny'
        >
          <Modal.Header content='Add Account' />
            <Modal.Content scrolling>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  fluid
                  id='account'
                  label='account name'
                  placeholder='account'
                  type='account'
                  name='account'
                  value={this.state.account_name}
                  onChange={this.handleChange}
                />
                <Button color='green' type='submit' inverted> Add Account</Button>
              </Form>
            </Modal.Content>
        </Modal>
        <Modal
          trigger={<Menu.Item name='Delete Account' active={activeItem === 'Delete Account'} onClick={this.handleDeleteOpen}>Delete Account </Menu.Item>}
          open={this.state.deleteAccountModal}
          onClose={this.handleDeleteClose}
          size='tiny'
        >
          <Modal.Header content='Delete Account' />
            <Modal.Content>
              <Form onSubmit={this.handleAccountSubmit}>
                <Dropdown
                  fluid
                  search
                  simple
                  selection
                  item
                  label='account'
                  options={data}
                  placeholder='account'
                  name='account_name'
                  value={this.state.account_name}
                  onChange={this.handleClick}
                />
                <Button color='red' type='submit' inverted> Delete Account</Button>
              </Form>
            </Modal.Content>
        </Modal>
        <Menu.Item>
          <div>
            <PlaidLink
              publicKey={this.state.publicKey}
              product={['auth', 'transactions']}
              clientName={this.state.clientName}
              env="sandbox"
              className='buttonChange'
              apiVersion="v2"
              selectAccount={true}
              onSuccess={this.handleOnSuccess}>
                <font id='buttonText'>Link Accounts</font>
            </PlaidLink>
          </div>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    modalBoolean: state.modal.modalOpen
  }
}

export default withAuth(connect(mapStateToProps, actions)(DashboardNavbar))
