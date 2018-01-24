import React from 'react'
import {Menu, Modal, Form, Button, Dropdown, Message} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import withAuth from '../hocs/withAuth'
import { adapter } from '../services'
import PlaidLink from 'react-plaid-link';
import { Link } from "react-router-dom";

class DashboardNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home',
      modalOpen: false,
      deleteAccountModal: false,
      account_name: '',
      account_balance: '',
      account_id: '',
      user_id: this.props.user.id,
      publicKey: "a5ec48b34d0a037118ccb09fd170a9",
      clientName: this.props.user.username
    }
  }

  handleChange = event => {
    this.setState({account_name: event.target.value})
  }

  accountBalance = event => {
    this.setState({account_balance: event.target.value})
  }

  handleDeleteOpen = () => {
    this.setState({deleteAccountModal: true})
  }

  handleDeleteClose = () => this.setState({deleteAccountModal: false})

  handleSubmit = () => {
    let name = this.state.account_name
    let user_id = this.state.user_id
    this.props.addAccount(name, user_id, this.state.account_balance, this.props.history)
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
      account_id: event.currentTarget.attributes[1].nodeValue
    })
  }

  handleOnSuccess = (user_id, token) => {
    this.props.createAccountsFromPlaid(this.props.user.id, token, this.props.history)
  }

  render(){
    console.log(this.props)
    const { activeItem } = this.state
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
              <Message> <i>Account names must be unique</i> </Message>
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
                <Form.Input
                  fluid
                  id='balance'
                  label='account balance'
                  placeholder='account balance'
                  type='balance'
                  name='balance'
                  value={this.state.account_balance}
                  onChange={this.accountBalance}
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
                  selection
                  item
                  label='account'
                  options={this.props.accountOptions}
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
              env="development"
              className='buttonChange'
              apiVersion="v2"
              onSuccess={this.handleOnSuccess}>
                <font id='buttonText'>Link Accounts</font>
            </PlaidLink>
          </div>
        </Menu.Item>

        <Menu.Item
          name='Upload Transactions'
          active={activeItem === 'Upload Transaction'}
          onClick={()=>this.props.loaderModal(!this.props.loaderBoolean)}
        >
          Upload Transactions
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.currentUser,
    modalBoolean: state.modal.modalOpen,
    accountOptions: state.auth.accountOptions,
    loaderBoolean: state.modal.loaderOpen
  }
}

export default withAuth(connect(mapStateToProps, actions)(DashboardNavbar))
