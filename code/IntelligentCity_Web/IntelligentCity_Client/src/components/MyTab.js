import React, { Component } from 'react'

import { Tabs } from 'antd';

import "./MyTab.css"

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class MyTab extends Component {
    render () {
        return (
            <div className='Tab'>
                  <Tabs defaultActiveKey="1" onChange={callback}>
                  {
                        this.props.data.map(function (val, index) {
                            console.log("item:" , val)
                            return <TabPane tab={val.title} key= {index}> {val.pane} </TabPane> 
                        })
                  }
                </Tabs>
            </div>
        )
    }
}

export default MyTab
