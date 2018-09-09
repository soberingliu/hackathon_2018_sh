import React, { Component } from 'react'

import { Row, Col } from 'antd';

class MyCol4 extends Component {
    render () {
        return (
            <div>
               <Row>
                <Col span={12}>col-12</Col>
                <Col span={12}>col-12</Col>
                </Row>
                <Row>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                </Row>
                <Row>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
                <Col span={6}>col-6</Col>
              </Row>
            </div>
        )
    }
}

export default MyCol4  
