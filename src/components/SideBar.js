import React from 'react'
import { Menu, Button, Modal,Form, Dropdown} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { adapter } from '../services'
import PlaidLink from 'react-plaid-link';

const credentials = {
  publicKey: "a5ec48b34d0a037118ccb09fd170a9",
  clientName: 'LINA'
}

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home',
      modalOpen: false,
      deleteAccountModal: false,
      account_name: '',
      account_id: '',
      user_id: this.props.user.id,
    }
  }

  handleItemClick = (e, { name }) => {
    e.preventDefault()
    this.setState({activeItem: name})
    this.props.selectAccount(e.target.id)
  }

  handleOnSuccess(token, metadata) {
    adapter.auth.createAccountsFromPlaid(token, metadata)
  }

  handleOnExit(error, metadata) {
    console.log('link: user exited');
    console.log(error, metadata);
  }
  handleOnLoad() {
    console.log('link: loaded');
  }
  handleOnEvent(eventname, metadata) {
    console.log('link: user event', eventname, metadata);
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleDeleteOpen = () => this.setState({ deleteAccountModal: true })

  handleDeleteClose = () => this.setState({ deleteAccountModal: false })

  handleChange = event => {
    this.setState( { account_name: event.target.value } )
  }

  handleClick = event => {
    this.setState({account_name: event.currentTarget.innerText, account_id: event.currentTarget.attributes[0].nodeValue})
  }

  handleSubmit = () => {
    let name = this.state.account_name
    let user_id = this.state.user_id
    this.setState({ modalOpen: false })
    adapter.auth.createAccount(name, user_id)
  }

  handleAccountSubmit = () => {
    adapter.auth.deleteAccount(this.state.account_id)
  }

  renderAccounts = () => {
    const { activeItem } = this.state
    if (this.props.user.accounts) {
      return this.props.user.accounts.map(account => {
        return <Menu.Item
                  name={account.name}
                  onClick={this.handleItemClick}
                  active={activeItem === account.name}
                  id={account.id}
                  key={account.id}
                />
      })
    } else {
     <div/>
    }
  }

  render() {
    console.log(this.props)
    let data = []
    if (this.props.user.accounts) {
      this.props.user.accounts.map((account,index) =>
        data.push({key:index, text: account.name, name: account.id, value:account.name}))
    }
    return (
      <div>
        <Menu pointing secondary vertical>
          <Menu.Item as='h4'>Your Accounts</Menu.Item>
          {this.props.user.accounts !== undefined && this.props.user.accounts.length > 0 ?
            <Menu.Item
              name='All'
              onClick={this.handleItemClick}  active={this.state.activeItem === 'All'}
            />
          : null}
          {this.renderAccounts()}
          <Menu.Item>
            <Modal
             trigger={<Button onClick={this.handleOpen}
             color='olive'>Add Account</Button>}
             open={this.state.modalOpen}
             onClose={this.handleClose}
             size='tiny'
           >
             <Modal.Header content='Add Account' />
             <Modal.Content>
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
                 <Button
                   color='green'
                   type='submit'
                   inverted
                 >
                   Add Account
                 </Button>
                </Form>
              </Modal.Content>
            </Modal>
          </Menu.Item>
          <Menu.Item>
          <Modal
           trigger={<Button onClick={this.handleDeleteOpen}
           color='red' inverted>Delete Account</Button>}
           open={this.state.deleteAccountModal}
           onClose={this.handleDeleteClose}
           size='tiny'
         >
           <Modal.Header content='Delete Account' />
           <Modal.Content>
             <Form onSubmit={this.handleAccountSubmit}>
               <Dropdown
                fluid
                label='account'
                options={data}
                placeholder='account'
                name='account_name'
                value={this.state.account_name}
                onChange={this.handleClick}
              />
               <Button
                 color='red'
                 type='submit'
                 inverted
               >
                 Delete Account
               </Button>
              </Form>
            </Modal.Content>
          </Modal>
          </Menu.Item>
          <Menu.Item>
          <PlaidLink
            publicKey={credentials.publicKey}
            product={['auth', 'transactions']}
            clientName={credentials.clientName}
            env="sandbox"
            apiVersion="v2"
            selectAccount={true}
            onSuccess={this.handleOnSuccess}
            onExit={this.handleOnExit}
            onEvent={this.handleOnEvent}
            onLoad={this.handleOnLoad}
          />
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.auth.currentUser.id,
    user: state.auth.currentUser,
    loading: state.auth.isLoading,
  }
}

export default connect(mapStateToProps, actions)(SideBar);
