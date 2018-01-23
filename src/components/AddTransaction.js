import React, { Component } from 'react'
import { Button, Header, Modal, Form, Search, Message} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import _ from 'lodash'

class AddTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      amount: '',
      category_name: '',
      merchant_name: '',
      account_name: '',
      account_id: '',
      period_name: '',
      debit_or_credit: 'debit'
    }
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  resetComponent = () => {
    this.setState({isLoading: false, results: []})
  }

  handleResultSelect = (e, { result }) => {
    this.setState({[result.name2]: result.name, showResults:true, id: result.key})
  }

  handleSearchChange = (e, { value }) => {
    let item = e.currentTarget.id
    this.setState({ isLoading: true, [e.currentTarget.id]: value})

    setTimeout(() => {
      if (this.state[item].length < 1) return this.resetComponent()
      const re = new RegExp(_.escapeRegExp(this.state[item]), 'i')
      const isMatch = result => re.test(result.name)
      this.setState({
        isLoading: false,
        results: _.filter(this.props[item], isMatch),
      })
    }, 500)
  }

  handleAccountChange = event => {
    const name = event.currentTarget
    this.setState({
      [name.attributes[2].nodeValue]: name.innerText, account_id: Number(name.attributes[1].nodeValue)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id} = this.state;
    this.props.createTransaction(amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id)
    this.props.modal(!this.props.modalBoolean)
  }

  render() {
    const {isLoading,results, amount, period_name, merchant_name, category_name} = this.state
    const resultRenderer = ({ name }) => <Header as='h5' color='black' content={name} />
    return (
      <Modal
        open={this.props.modalBoolean}
        onClose={()=>this.props.modal(!this.props.modalBoolean)}
        size='tiny'
      >
        {this.props.errors?<Message warning>{this.props.errors}</Message>: null}
        <Modal.Header content='Add Transaction' />
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              fluid
              id='date'
              label='date'
              placeholder='date'
              type='date'
              name='period_name'
              value={period_name}
              onChange={this.handleChange}
            />
            <Form.Field>
              <label>merchant</label>
            <Search
              fluid
              id={'merchant_name'}
              input={{ fluid: true}}
              placeholder='Search for merchants or add your own'
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={results}
              resultRenderer={resultRenderer}
              value={merchant_name}
            />
            </Form.Field>
            <Form.Field>
              <label>category</label>
            <Search
              fluid
              id={'category_name'}
              input={{ fluid: true}}
              placeholder='Search for categories or add your own'
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={results}
              resultRenderer={resultRenderer}
              value={category_name}
            />
            </Form.Field>
            <Form.Input
              fluid
              id='amount'
              label='amount'
              placeholder='amount'
              name='amount'
              value={amount}
              onChange={this.handleChange}
            />
             <Form.Select
              fluid
              label='account'
              options={this.props.accountOptions}
              placeholder='account'
              name='account_name'
              onChange={this.handleAccountChange}
            />
            <Button type='submit' color='green' inverted>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    modalBoolean: state.modal.modalOpen,
    user: state.auth.currentUser,
    accountOptions: state.auth.accountOptions,
    merchant_name: state.auth.merchant_name,
    category_name: state.auth.category_name,
    errors : state.auth.errors
  }
}

export default connect(mapStateToProps, actions)(AddTransaction)
