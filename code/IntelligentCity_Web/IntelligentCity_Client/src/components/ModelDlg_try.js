import React from 'react'

import { Modal, Button } from 'antd';

class ModelDlg extends React.Component {
  state = { visible: false }
  showModal = () => {
    const prevVisible = this.state.visible
    console.log("showModal: prevVisible is ", prevVisible);
    this.setState({
      visible: !prevVisible,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  renderModal = () => {
    if(this.state.visible) {
      <Modal
        title="Basic Modal"
        visible
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
      <p>blablabla...</p>
        { this.props.children }
      </Modal>
    }
  }
  render() {
    console.log("ModelDlg::render ...", this.state);
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Show/Hide</Button>
        {this.renderModal()}
      </div>
    );
  }
}


export default ModelDlg
