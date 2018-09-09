import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {Menu, Icon} from 'antd'

import {GetAccountList, GetBalance} from './HttpUtils'

const {SubMenu} = Menu


class AccountList extends Component {
    constructor(params) {
        super(params)
        this.state = {
            eth : [],
            wan: []
        }
    }

    async componentDidMount() {
        let resp = await GetAccountList()
        console.log('componentDidMount: ', resp);
        if (!resp.err) {
            this.setState({eth:resp.data.eth, wan: resp.data.wan});
        }


    }
    
    render () {
        return (
            <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ borderRight: 0 , width: 300}}
            onClick={this.props.onClick}
            >
            <SubMenu key="sub1" title={<span><Icon type="user" /> Eth Account</span>}>
            { this.state.eth.map( (addr, index) => {
                return <Menu.Item key={"eth_"+addr}> {addr} </Menu.Item>
            })}
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="user" /><span>Wan Account</span></span>}>
            { this.state.wan.map( (addr, index) => {
                return <Menu.Item key={"wan_"+addr}> {addr} </Menu.Item>
            })}
            </SubMenu>
                
            </Menu>
        )
    }
}

AccountList.propTypes = {
    onClick: PropTypes.func.required,
}

export default AccountList
