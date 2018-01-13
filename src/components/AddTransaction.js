import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Input, TextArea} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class AddTransaction extends Component {

  render() {
    let options = []
      this.props.user.accounts.map(account =>
        options.push({key: account.id, text: account.name, name: account.name, id: account.id, value: account.id}))
    let category_options = []
    let categories = []
    this.props.user.transactions.map(transaction =>
      category_options.push(transaction.category_name))
    let unique = [...new Set(category_options)]
    unique.sort()
    unique.map((category,index) => {
      categories.push({key: index, text:category, name:category, id:index})
    })


    return (
      <Modal
        open={this.props.modalBoolean}
        onClose={()=>this.props.modal(!this.props.modalBoolean)}
        size='tiny'
      >
        <Modal.Header content='Add Transaction' />
        <Modal.Content>
          <Form>
            <Form.Input fluid id='date' label='date' placeholder='Date' type='date'/>
            <Form.Input fluid id='merchant' label='merchant' placeholder='Merchant' />
            <Form.Input fluid id='category' label='category' placeholder='category' />
            <Form.Select fluid label='category_options' options={categories} placeholder='categories' />
            <Form.Input fluid id='amount' label='amount' placeholder='amount' />
             <Form.Select fluid label='account' options={options} placeholder='account' />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    modalBoolean: state.modal.modalOpen,
    user: state.auth.currentUser
  }
}

export default connect(mapStateToProps, actions)(AddTransaction)
