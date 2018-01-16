import React from 'react'
import WordCloud from 'react-d3-cloud';
import {Menu, Grid, Header, Segment,Statistic} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
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
    const rotate = word => word.value % 360;
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
      default: return (
        <div>
        <Statistic>
          <Statistic.Value>${user.average_spend}</Statistic.Value>
          <Statistic.Label>Spend per transaction</Statistic.Label>
        </Statistic>
        <Header> Your spent the most on </Header>
        </div>
      )
    }
  }

  render(){
    console.log(this.props)
    const { activeItem } = this.state
    return (
      <div>
        <Grid columns={2}>
          <Grid.Column width={4}>
            <Menu pointing secondary vertical>
              <Menu.Item
                name='Home'
                active={activeItem === 'home'}
                onClick={()=>this.setState({isPassed: ""})}
              />
              <Menu.Item as='h4'>Word Clouds</Menu.Item>
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
              <Menu.Item as='h4'>Expense Graphs</Menu.Item>
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
          <Grid.Column width={8}>
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
  }
}
export default connect(mapStateToProps, null)(Trends);
