import React, { Component } from 'react'
import { Divider, Row } from 'antd';
import MyCol4 from './Grid_Col4'


class MyCol2 extends Component {
    render () {
        return (
            <div>
              <Row gutter={8}>
                <MyCol4></MyCol4>
                <Divider type="vertical" />
                <MyCol4></MyCol4>
              </Row>
            </div>
        )
    }
}

export default MyCol2
