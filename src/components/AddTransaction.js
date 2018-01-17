import React, { Component } from 'react'
import { Button, Header, Modal, Form, Search} from 'semantic-ui-react'
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

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => {
    this.setState({isLoading: false, results: []})
  }

  handleResultSelect = (e, { result }) => {
    this.setState({[result.text]: result.name, showResults:true, id: result.id})
  }

  handleSearchChange = (e, { value }) => {
    let item = e.currentTarget.id
    let data = []
    this.setState({ isLoading: true, [e.currentTarget.id]: value})
    this.props.user[item].map((category,index) =>
      data.push({key:index, text: item, name: category, value:category})
    )

    setTimeout(() => {
      if (this.state[item].length < 1) return this.resetComponent()
      const re = new RegExp(_.escapeRegExp(this.state[item]), 'i')
      const isMatch = result => re.test(result.name)
      this.setState({
        isLoading: false,
        results: _.filter(data, isMatch),
      })
    }, 500)
  }

  handleAccountChange = event => {
    this.setState({
      [event.currentTarget.attributes[0].nodeValue]: event.currentTarget.innerText, [event.currentTarget.attributes[1].nodeValue]: Number(event.currentTarget.attributes[2].nodeValue)
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id} = this.state;
    this.props.createTransaction(amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id)
  }

  render() {
    const {isLoading,results, amount, period_name, merchant_name, category_name, account_name} = this.state
    const resultRenderer = ({ name }) => <Header as='h5' color='black' content={name} />
    let options = []
    if (this.props.user.accounts) {
      this.props.user.accounts.map((account,index) =>
        options.push({key: index, text: account.name, name: 'account_name', id: 'account_id', name2: account.id, value:account.account_name})
      )
    }
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
              options={options}
              placeholder='account'
              name='account_name'
              value={account_name}
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
    user: state.auth.currentUser
  }
}

export default connect(mapStateToProps, actions)(AddTransaction)
