import React from 'react'
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';
import {Menu, Grid} from 'semantic-ui-react'
import { connect } from 'react-redux'

class Trends extends React.Component {
  state = {
    activeItem: 'home',
    wordCloud: false,
    wordCloud2: false
  }

  render(){
    console.log(this.props)
    const { activeItem } = this.state
    const data =  []
    if (this.props.user) {
      let frequency = this.props.user.merchant_frequency
      for (const key in frequency) {
        if (frequency.hasOwnProperty(key)) {
          data.push({text: key, value: frequency[key]})
        }
      }
    }

    const fontSizeMapper = word => Math.log2(word.value) * 5;
    const rotate = word => word.value % 360;

    return (
      <div>
        <Grid columns={2}>
          <Grid.Column width={4}>
            <Menu pointing secondary vertical>
            </Menu>
              <Menu.Item name='Merchant frequency' active={activeItem === 'home'} onClick={()=>this.setState({wordCloud: true, wordCloud2:false})} /><br/>
              <Menu.Item name='Merchant frequency 2' active={activeItem === 'home'} onClick={()=>this.setState({wordCloud2: true, wordCloud: false})} />
          </Grid.Column>
          <Grid.Column width={8}>
            {this.state.wordCloud? <WordCloud
              data={data}
              fontSizeMapper={fontSizeMapper}
              rotate={rotate}
            /> : null}
            {this.state.wordCloud2? <WordCloud
              data={data}
              fontSizeMapper={fontSizeMapper}
            /> : null}
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
