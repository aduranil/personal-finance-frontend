import React from 'react'
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import {Menu, Grid, Header, Segment,Statistic} from 'semantic-ui-react'
import { connect } from 'react-redux'

class Trends extends React.Component {
  state = {
    activeItem: 'home',
    isPassed: "",
    frequency: 'merchant_frequency'
  }

  renderComponent(isPassed) {
    const data =  []
    if (this.props.user) {
      let frequency = this.props.user[this.state.frequency]
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
      return <WordCloud data={data} fontSizeMapper={fontSizeMapper}/>
     default:
      return     <Statistic>
      <Statistic.Value>${this.props.user.average_spend}</Statistic.Value>
      <Statistic.Label>Spend per transaction</Statistic.Label>
    </Statistic>

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
              <Menu.Item name='Home' active={activeItem === 'home'} onClick={()=>this.setState({isPassed: ""})} /><br/>
              <Menu.Item name='Merchant Frequency' active={activeItem === 'Merchant Frequency'} onClick={()=>this.setState({isPassed: 0, frequency:'merchant_frequency', activeItem: 'Merchant Frequency'})} />
              <Menu.Item name='Category Frequency' active={activeItem === 'Category Frequency'} onClick={()=>this.setState({isPassed: 1, frequency: 'category_frequency', activeItem: 'Category Frequency'})} />
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
