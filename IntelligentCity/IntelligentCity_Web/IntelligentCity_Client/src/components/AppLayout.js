import React, { Component } from 'react'

import { Layout, Menu } from 'antd';
import PersonalPage from './PersonalPage';
import ShoppingMallPage from './ShoppingMallPage';

const { Header, Content, Footer } = Layout;


class AppLayout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      curPage: 'Personal'
    }
  }

  componentDidMount() {
    // console.log("AppLayout:: componentDidMount")
  }

        // 组件销毁前移除事件监听
  componentWillUnmount() {

    // let resp = GetDigitAsset('addr')
    // resp.then((payload)=>{
    //     console.log('PicCardList got data: ', payload);
    //     let newData = payload.data.map((d) => { return {pic: d}})
    //     this.setState({digitAsset: newData})
    // })
  }

  showBuyDlg = (assetId, confirmCb) => {
    console.log('call doPayDlg ... for asset : ', assetId);
    // console.log('confirmCb: ', confirmCb);
    confirmCb()
  }

  menuClk = ({key, item}) => {
    // console.log("menuClk: key", key, ", item:", item)
    this.setState({curPage: key})
  }

  render () {
    let isPersonal = this.state.curPage === 'Personal'
    let isShoppingMall = this.state.curPage === 'ShoppingMall'

    const ErrorInfo = () => (<h2> 程序里臭虫 :) 刷新试试吧 </h2>)

    return (
      <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
          onClick={this.menuClk}
        >
          <Menu.Item key="Personal">我的资产</Menu.Item>
          <Menu.Item key="ShoppingMall">商城</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        {/* <ErrorInfo></ErrorInfo> */}
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
        { isPersonal && isShoppingMall ? <ErrorInfo/> : isPersonal
         ? <PersonalPage></PersonalPage> : <ShoppingMallPage showBuyDlg={this.showBuyDlg}></ShoppingMallPage> }
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Virtual Asset Exchanger ©2018 Created by WangLU
      </Footer>
    </Layout>
    )
  }
}

export default AppLayout
