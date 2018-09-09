import React, { Component } from 'react';

import { Tabs } from 'antd';
import Erc20_detail from './Erc20_detail';
import PicCardList from './PicCardList';

import emitter from "./Events.js"
import "./MyTab.css"

import TestPane from './TestPane'

const TabPane = Tabs.TabPane

function callback(key) {
  console.log(key);
}

class MainArea extends Component {
  
  constructor(params) {
    super(params)
    this.state = {
      accountInfoList: []
    }
  }
  
  componentDidMount() {
    console.log("MainArea::  register event listener ")
    this.eventEmitter = emitter.addListener("balance",(data)=>{
      console.log("MainArea::Emmiter got value: ", data)
      let newInfo = {addr: data.addr, amount: data.balance}
      // let newInfoList = Object.assign({}, this.state.accountInfoList)
      // let newInfoList = this.state.accountInfoList.concat(newInfo)
      let newInfoList = [newInfo]
      this.setState({accountInfoList: newInfoList})
    });
  }

        // 组件销毁前移除事件监听
  componentWillUnmount() {
      emitter.removeListener(this.eventEmitter);
  }

  render() {

    const TabStyle = {
      tab : {
        height: 300,
      }
    } 
    console.log("MainArea:render() state: ", this.state);
    // console.log("MainArea:render() state.info addr: ", this.state._setInfo.addr);
    return (
      <div className='Tab'>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab='RERC20' key='1'> 
           <Erc20_detail accountInfoList={this.state.accountInfoList}></Erc20_detail>
         </TabPane> 
         <TabPane tab='ERC721' key='2'> 
           <PicCardList></PicCardList>
         </TabPane> 
         <TabPane tab='Test1' key='3'> 
           <PicCardList></PicCardList>
         </TabPane>          
         <TabPane tab='test2' key='4'> 
           <TestPane></TestPane>
         </TabPane> 
         </Tabs>
      </div>
    );
  }
}

export default MainArea;
