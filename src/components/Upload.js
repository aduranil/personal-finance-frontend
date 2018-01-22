import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { adapter } from '../services'
import { Button, Modal, Dropdown, Input} from 'semantic-ui-react'

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      file:null,
      account_id: null,
      account_name: null
    }
  }
  onFormSubmit = (e) =>{
    e.preventDefault() // Stop form submit
    const url = 'http://example.com/file-upload';
    const formData = new FormData();
    formData.append('file_upload',this.state.file)
    formData.append('account_id',this.state.account_id)
    adapter.auth.createUpload(formData)
  }

  onChange = (e) => {
    this.setState({file:e.target.files[0]})
  }

  handleClick = event => {
    this.setState({
      account_name: event.currentTarget.innerText,
      account_id: event.currentTarget.attributes[1].nodeValue
    })
  }

  render() {
    return (
      <Modal
        open={this.props.loaderBoolean}
        onClose={()=>this.props.loaderModal(!this.props.loaderBoolean)}
        size='tiny'
      >
      <Modal.Content>
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <Dropdown
          fluid
          search
          selection
          item
          label='select account'
          options={this.props.accountOptions}
          placeholder='account'
          name='account_name'
          value={this.state.account_name}
          onChange={this.handleClick}
        /><br/>
        <Input type="file" onChange={this.onChange} fluid/><br/>
        <Button color='olive' type="submit">Upload</Button>
      </form>
      </Modal.Content>
      </Modal>
   )
  }
}

const mapStateToProps = state => {
  return {
    loaderBoolean: state.modal.loaderOpen,
    accountOptions: state.auth.accountOptions
  }
}

export default connect(mapStateToProps, actions)(Upload);
