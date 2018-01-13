import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Input, TextArea} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { adapter } from '../services'

class AddTransaction extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        amount: '',
        category_name: '',
        merchant_name: '',
        account_name: '',
        period_name: '',
        debit_or_credit: 'debit'
      }
    }
  }

  handleChange = event => {
    const newFields = {...this.state.fields, [event.target.name]: event.target.value}
    this.setState( { fields: newFields } )
  }

  handleSubmit = event => {
    event.preventDefault()
    const { fields: { amount, category_name, merchant_name, account_name, period_name, debit_or_credit } } = this.state;
    adapter.auth.createTransaction(amount, category_name, merchant_name, account_name, period_name, debit_or_credit)
  }

  componentDidMount(){
    this.props.getCategories()
  }

  render() {
    const { fields } = this.state
    console.log(this.props)
    let options = []
      this.props.user.accounts.map((account,index) =>
        options.push({key: index, text: account.name, name: account.name, id: account.id, value: account.id}))
    let categories = []
    this.props.categories.map((category,index) =>
      categories.push({key:index, text: category.name, name: category.name, id:category.id, value:category.id}))

    return (
      <Modal
        open={this.props.modalBoolean}
        onClose={()=>this.props.modal(!this.props.modalBoolean)}
        size='tiny'
      >
        <Modal.Header content='Add Transaction' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              fluid
              id='date'
              label='date'
              placeholder='Date'
              type='date'
              name='period_name'
              value={fields.period_name}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              id='merchant'
              label='merchant'
              placeholder='Merchant'
              name='merchant_name'
              value={fields.merchant_name}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              id='category'
              label='category'
              placeholder='category'
              name='category_name'
              value={fields.category_name}
              onChange={this.handleChange}
            />
            <Form.Select
              fluid
              label='categories'
              options={categories}
              placeholder='categories'
              name='category_name'
              value={fields.category_name}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              id='amount'
              label='amount'
              placeholder='amount'
              name='amount'
              value={fields.amount}
              onChange={this.handleChange}
            />
             <Form.Select
              fluid
              label='account'
              options={options}
              placeholder='account'
              name='account_name'
              value={fields.account_name}
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type='submit' color='green' inverted>
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
    user: state.auth.currentUser,
    categories: state.categories.categories
  }
}

export default connect(mapStateToProps, actions)(AddTransaction)
