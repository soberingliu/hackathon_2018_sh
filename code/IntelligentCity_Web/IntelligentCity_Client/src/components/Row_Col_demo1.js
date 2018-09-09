import React, { Component } from 'react'

import { Row, Col, Divider } from 'antd';


const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class DemoBoxX extends Component {
  
  render() {
    const { value } = this.props;
    const className = `hight-${value}`;
    return (
                <p className={className}>{this.props.children}</p>
    );
  }
}

/* 在 16.x 中不建议 createClass 这么用了！ 运行会报错：
const DemoBox = React.createClass({
    render() {
      const { value } = this.props;
      const className = `hight-${value}`;
      return (
        <p className={className}>{this.props.children}</p>
      );
    }
  });
*/

class Rowdemo extends Component {
    render () {
        return (

            <div>
                        <h1>Row demo</h1>
            <p>顶部对齐</p>
            <Row type="flex" justify="center" align="top" style={{border:"solid gray"}}>
              <Col span="4"><DemoBox value="100">.col-4</DemoBox></Col>
              <Divider type="vertical" />
              <Col span="4"><DemoBox value="50">.col-4</DemoBox></Col>
              <Divider type="vertical" />
              <Col span="4"><DemoBox value="120">.col-4</DemoBox></Col>
              <Divider type="vertical" />
              <Col span="4"><DemoBox value="80">.col-4</DemoBox></Col>
            </Row>
        
            <p>居中对齐</p>
            <Row type="flex" justify="space-around" align="middle" style={{border:"dashed gray"}}>
              <Col span="4"><DemoBox value="100">.col-4</DemoBox></Col>
              <Col span="4"><DemoBox value="50">.col-4</DemoBox></Col>
              <Col span="4"><DemoBox value="120">.col-4</DemoBox></Col>
              <Col span="4"><DemoBox value="80">.col-4</DemoBox></Col>
            </Row>
        
            <p>底部对齐</p>
            <Row type="flex" justify="space-between" align="bottom">
              <Col span="4"><DemoBox value="100">.col-4</DemoBox></Col>
              <Col span="4"><DemoBox value="50">.col-4</DemoBox></Col>
              <Col span="4"><DemoBox value="120">.col-4</DemoBox></Col>
              <Col span="4"><DemoBox value="80">.col-4</DemoBox></Col>
            </Row>
          </div>
        )
    }
}

export default Rowdemo
 