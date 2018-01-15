import React, { Component } from 'react'
import { Button, Header, Modal, Form, Search} from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import _ from 'lodash'

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      fields: {
        amount: '',
        category_name: '',
        merchant_name: '',
        account_name: '',
        account_id: '',
        category_id: '',
        period_name: '',
        debit_or_credit: 'debit'
      }
    }
  }

  handleChange = event => {
    const newFields = {...this.state.fields, [event.target.name]: event.target.value}
    this.setState( { fields: newFields } )
  }

  handleDateChange = event => {
    const newFields = {...this.state.fields, [event.target.name]: event.target.value}
    this.setState( { fields: newFields } )
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    const newFields = {...this.state.fields, [result.text]: result.name, [result.id]: result.name2 }
    this.setState({fields:newFields,value: result.name, showResults:true, id: result.id })
  }

  handleSearchChange = (e, { value }) => {
    const newFields = {...this.state.fields, 'category_name': value}
    this.setState({ isLoading: true, value, fields: newFields})
    let categories = []
    this.props.categories.map((category,index) =>
      categories.push({key:index, text: 'category_name', name: category.name, id:'category_id', name2: category.id, value:category.name}))

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(categories, isMatch),
      })
    }, 500)
  }


  handleAccountChange = event => {
    const newFields = {...this.state.fields, [event.currentTarget.attributes[0].nodeValue]: event.currentTarget.innerText, [event.currentTarget.attributes[1].nodeValue]: Number(event.currentTarget.attributes[2].nodeValue)}
    this.setState( { fields: newFields } )
  }
  handleSubmit = event => {
    event.preventDefault()
    const { fields: { amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id, category_id } } = this.state;
    this.props.createTransaction(amount, category_name, merchant_name, account_name, period_name, debit_or_credit, account_id, category_id)
  }

  componentDidMount(){
    this.props.getCategories()
  }

  render() {
    const { fields, isLoading, value,results } = this.state
    let options = []
    if (this.props.user.accounts) {
      this.props.user.accounts.map((account,index) =>
        options.push({key: index, text: account.name, name: 'account_name', id: 'account_id', name2: account.id, value:account.name}))
    } else {
      <div/>
    }
    const resultRenderer = ({ name }) => <Header as='h5' color='black' content={name} />

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
              onChange={this.handleDateChange}
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
            <Form.Field>
              <label>Categories</label>
            <Search
              fluid
              input={{ fluid: true }}
              placeholder='Search for categories or add your own'
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={results}
              resultRenderer={resultRenderer}
              value={value}
            />
            </Form.Field>
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
              onChange={this.handleAccountChange}
            />
            <Button type='submit' color='green' inverted>
              Submit
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>

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
