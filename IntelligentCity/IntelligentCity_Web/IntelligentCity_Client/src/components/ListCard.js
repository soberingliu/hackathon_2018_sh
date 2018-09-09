import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

import { Card, Icon, Avatar, Button, Menu, Dropdown, Rate, Modal } from 'antd';

import {PicBaseUrl} from './HttpUtils'
import './ListCard.css'

const { Meta } = Card;

const AssetChannel = (props) => {
    let channelType = '未知'
    if (props.online == false) {
        channelType = '线下'
    }else if(props.netId == 'ETH') {
        channelType = 'ETH'
    }else if(props.netId == 'WAN') {
        channelType = 'WAN'
    }
    return (
        <Fragment>
            <br></br>
            <span>Channel:  {channelType}</span>
        </Fragment>
    )
}
AssetChannel.propTypes = {
    channelType : PropTypes.string
}
// ======================================

class ListCard extends Component {

    confirmCb = () => {
        console.log("确定下单了。。。。", this);
    }

    _buyMenuClick = (e) => {
        console.log("_buyMenuClick: this is: ", this);
        console.log("_buyMenuClick: this assetId is: ", this.props.assetId);
        console.log("_buyMenuClick: e is:  ", e);

        this.props.buyBtnClick(this.props.assetId, this.confirmCb)
    }

    PayMenuOffline = (
        <Menu onClick={this._buyMenuClick}>
            <Menu.Item key="ERC20">用 ERC20 支付 </Menu.Item>
            <Menu.Item key="WRC20">用 WRC20 支付 </Menu.Item>
        </Menu>
    )

    PayByERC20 = (
        <Menu onClick={this._buyMenuClick}>
            <Menu.Item key="ERC20"> 用 ERC20 支付</Menu.Item>
        </Menu>
    )
    ayByWRC20 = (
        <Menu onClick={this._buyMenuClick}>
            <Menu.Item key="WRC20"> 用 WRC20 支付</Menu.Item>
        </Menu>
    )
    PayByERC20_WRC20 = (
        <Menu onClick={this._buyMenuClick}>
            <Menu.Item key="ERC20">用 ERC20 支付</Menu.Item>
            <Menu.Item key="WRC20">用 WRC20 支付</Menu.Item>
        </Menu>
    )

    getMenu = function(online, netId) {
        let _menu = this.PayMenuOffline
        if(online == false) {
            _menu = this.PayMenuOffline
        } else if(netId === 'ETH') {
            _menu = this.PayByERC20
        } else if(netId === 'WAN') {
            _menu = this.PayByERC20_WRC20
        }
        return _menu
    }

    dropDownClick = (e) => {
        console.log("Dropdown clicked...");
    }

    info() {
        console.log('params: ', this.getMenu(this.props.online, this.props.netId));
        Modal.info({
            title: '选择支付方式',
            content: (
                <div>
                    <Button type="primary" >购买1</Button>
                    <Button type="primary" >购买2</Button>
                </div>
            ),
            onOk() {},
        });
    }

    render () {
        // TODO: 要绑定数据（index等）
        console.log('this.props: ', this.props);
        return (
            <div>
                <Card
                    cover={<img alt="装备" src={PicBaseUrl+"/"+ this.props.coverImage} />}

                    actions={this.props.actionBtnTitle != "" ? [
                        <div className='priceGroup'> <span>Price</span>: <span className='priceVal' >{this.props.price || '待定'}</span> </div>,

                        <div>
                            <Button type="primary" onClick={this.info.bind(this)}>购买</Button>
                        </div>

                    ] : []
                    }
                >
                    <Meta
                        title={this.props.title}
                        description={this.props.desc}
                    />
                    <AssetChannel {...this.props}></AssetChannel>
                </Card>
            </div>
        )
    }
}

ListCard.propTypes = {
    btnClick: PropTypes.func,
};

export default ListCard
