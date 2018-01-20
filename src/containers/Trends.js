import React from 'react'
import WordCloud from 'react-d3-cloud';
import {Menu, Grid, Header,Statistic, Divider} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip,Bar } from 'recharts';
import _ from 'lodash'
 import withAuth from '../hocs/withAuth'

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Trends extends React.Component {
  state = {
    activeItem: 'home',
    isPassed: '',
    frequency: 'merchant_frequency',
    time: 10
  }

  renderComponent(isPassed) {
    let data =  []
    const user = this.props.user
    const time = this.state.time
    if (user) {
      let frequency = user[this.state.frequency]
      for (const key in frequency) {
        if (frequency.hasOwnProperty(key)) {
          data.push({text: key, value: frequency[key]})
        }
      }
    }
    const fontSizeMapper = word => Math.log2(word.value) * 5;
    switch(isPassed) {
      case 0:
        return <WordCloud data={data} fontSizeMapper={fontSizeMapper}/>
      case 1:
        data = data.slice(0,time)
        return (
          <BarChart margin={{bottom: 200}} width={730} height={550} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis angle={-45} textAnchor="end" dataKey="text" interval={0}/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )
      default:
        let merchantExpenses = _.keys(user.merchant_expense_data).slice(0,3)
        let merchantValues = _.values(user.merchant_expense_data).slice(0,3)
        let merchantFreq = _.keys(user.merchant_frequency).slice(0,3)
        let merchantUnits = _.values(user.merchant_frequency).slice(0,3)
        let categoryExpenses = _.keys(user.category_expense_data).slice(0,3)
        let categoryValues = _.values(user.category_expense_data).slice(0,3)
        let categoryFreq = _.keys(user.category_frequency).slice(0,3)
        let categoryUnits = _.values(user.category_frequency).slice(0,3)
        return (
          <div>
            <Statistic.Group>
              <Statistic>
                <Statistic.Value>
                  {user.transactions ? numberWithCommas(user.transactions.length) : null}
                </Statistic.Value>
                <Statistic.Label>Transactions</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {this.props.category_name ? this.props.category_name.length : null}
                </Statistic.Value>
                <Statistic.Label>Categories</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {this.props.merchant_name ? this.props.merchant_name.length: null}
                </Statistic.Value>
                <Statistic.Label>Merchants</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>${user.average_spend}</Statistic.Value>
                <Statistic.Label>Spend per transaction</Statistic.Label>
              </Statistic>
            </Statistic.Group>

            <Header>
              Your spent the most with {merchantExpenses[0]} (${merchantValues[0]}), {merchantExpenses[1]} (${merchantValues[1]}), and {merchantExpenses[2]} (${merchantValues[2]}).
            </Header>
            <Header>
              Your most frequent transactions were with {merchantFreq[0]} ({merchantUnits[0]} times), {merchantFreq[1]} ({merchantUnits[1]} times), and {merchantFreq[2]} ({merchantUnits[2]} times).
            </Header>
            <Header>
              Your spent the most on {categoryExpenses[0]} (${categoryValues[0]}), {categoryExpenses[1]} (${categoryValues[1]}), and {categoryExpenses[2]} (${categoryValues[2]}).
            </Header>
            <Header>
              Your most frequent transactions were on {categoryFreq[0]} ({categoryUnits[0]} times), {categoryFreq[1]} ({categoryUnits[1]} times), and {categoryFreq[2]} ({categoryUnits[2]} times).
            </Header>
          </div>
        )
    }
  }

  render(){
    console.log(this.props)
    const { activeItem } = this.state
    return (
      <div>
      <Divider hidden/>
        <Grid columns={2}>
          <Grid.Column width={3}>
            <Menu secondary vertical>
              <Menu.Item
                name='Home'
                active={activeItem === 'home'}
                onClick={()=>this.setState({isPassed: ""})}
              />
              <Menu.Item style={{fontSize: '1.1em'}}><b>Word Clouds</b></Menu.Item>
              <Menu.Item
                name='Merchant Frequency'
                active={activeItem === 'Merchant Frequency'}
                onClick={()=>this.setState({isPassed: 0, frequency:'merchant_frequency', activeItem: 'Merchant Frequency'})}
              />
              <Menu.Item
                name='Category Frequency'
                active={activeItem === 'Category Frequency'}
                onClick={()=>this.setState({isPassed: 0, frequency: 'category_frequency', activeItem: 'Category Frequency'})}
              />
              <Menu.Item
                name='Category Expense Data'
                active={activeItem === 'Category Expense Data'}
                onClick={()=>this.setState({isPassed: 0, frequency: 'category_expense_data', activeItem: 'Category Expense Data'})}
              />
              <Menu.Item
                name='Merchant Expense Data'
                active={activeItem === 'Merchant Expense Data'}
                onClick={()=>this.setState({isPassed: 0, frequency: 'category_expense_data', activeItem: 'Merchant Expense Data'})}
              />
            <Menu.Item style={{fontSize: '1.1em'}}><b>Expense Graphs</b></Menu.Item>
              <Menu.Item
                name='Category Expenses'
                active={activeItem === 'Category Expenses'}
                onClick={()=>this.setState({isPassed: 1, frequency: 'category_expense_data', activeItem: 'Category Expenses'})}
              />
              <Menu.Item
                name='Merchant Expenses'
                active={activeItem === 'Merchant Expenses'}
                onClick={()=>this.setState({isPassed: 1, frequency: 'merchant_expense_data', activeItem: 'Merchant Expenses'})}
              />
              <Menu.Item
                name='Spend Per Month'
                active={activeItem === 'Spend Per Month'}
                onClick={()=>this.setState({isPassed: 1, frequency: 'spend_by_month', activeItem: 'Spend Per Month', time:12})}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column width={13}>
            {this.renderComponent(this.state.isPassed)}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser,
    merchant_name: state.auth.merchant_name,
    category_name: state.auth.category_name
  }
}
export default withAuth(connect(mapStateToProps, null)(Trends));
