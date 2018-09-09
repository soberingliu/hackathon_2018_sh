
import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb, Icon, Divider } from 'antd';

import "./MyLayout.css"

import MyTab from './MyTab';
import AccountInputForm from './AccountInputForm';

import MainArea from './MainArea';
import AccountList from './AccountList';
import CompanyLogo from './SideBarImage'
import emitter from "./Events.js"
import {GetBalance} from './HttpUtils'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MyLayout extends Component {
    
    accountClick = ({key, item}) => {
        console.log("accountClick: key", key, ", item:", item)
        const charIndex = key.indexOf('_')
        if (charIndex !== -1) {
            let netId = key.substring(0, charIndex)
            let addr = key.substring(charIndex + 1)
            console.log('netId: ', netId)
            console.log('addr: ', addr)
            let resp = GetBalance(netId, addr)
            resp.then(payload => {
                console.log('got data: ', payload);
                console.log('got balance: ', payload.data.balance);
                // console.log('got balance: this is', this);
                // 触发自定义事件
                emitter.emit("balance", {balance: payload.data.balance, addr: addr})
            })
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Layout>
                <Header className="header">
                <div className="logo" />
                <div className="textLogo">  WangLu Tech </div>
                </Header>
                <Layout>
                <Sider width={320} style={{ background: '#fff' }}>

                    <AccountList onClick={this.accountClick}></AccountList>

                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ borderRight: 0, width: 300}}
                    >
                    <SubMenu key="sub1" title={<span><Icon type="notification" />Notification</span>}>
                        <Menu.Item key="1">New message...</Menu.Item>
                    </SubMenu>
                    </Menu>
                    <CompanyLogo></CompanyLogo>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Divider>输入新账户:</Divider>
                    <AccountInputForm ></AccountInputForm>
                    <Divider>账户信息:</Divider>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <MainArea></MainArea>
                    </Content>
                </Layout>
                </Layout>
            </Layout>
            );
    }
}


export default MyLayout
