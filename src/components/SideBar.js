import React from 'react'
import { Menu, Button, Modal,Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { adapter } from '../services'

class SideBar extends React.Component {
  state = {
    activeItem: 'home',
    modalOpen: false,
    account_name: '',
    user_id: this.props.user.id
  }


  handleItemClick = (e, { name }) => {
    e.preventDefault()
    this.setState({activeItem: name})
    this.props.selectAccount(e.target.id)
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = event => {
    this.setState( { account_name: event.target.value } )
  }

  handleSubmit = () => {
    let name = this.state.account_name
    let user_id = this.state.user_id
    this.setState({ modalOpen: false })
    adapter.auth.createAccount(name, user_id)

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
                   label='account'
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
