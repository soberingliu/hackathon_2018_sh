import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

import { Card, Button, Modal, Input, Radio } from 'antd';

import {PicBaseUrl} from './HttpUtils'
import './PicCard.css'

const { Meta } = Card;

const AssetChannel = (props) => {
        let channelType = '未知';
        if (props.online === false) {
            channelType = '线下'
        }else if(props.netId === 'ETH') {
            channelType = 'ETH'
        }else if(props.netId === 'WAN') {
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

class PicCard extends Component {

    confirmCb = () => {
        console.log("确定下单了。。。。", this);
    }

     _buyMenuClick = (e) => {
        console.log("_buyMenuClick: this is: ", this);
        console.log("_buyMenuClick: this assetId is: ", this.props.assetId);
        console.log("_buyMenuClick: e is:  ", e);

        this.props.buyBtnClick(this.props.assetId, this.confirmCb)
    }

     PayMenuOffline = ['用 ERC20 支付', '用 WRC20 支付'];
    PayByERC20 = ['用 ERC20 支付'];
    ayByWRC20 = ['用 WRC20 支付'];
    PayByERC20_WRC20 = ['用 ERC20 支付', '用 WRC20 支付'];

    getMenu = function(online, netId) {
            let _menu = this.PayMenuOffline
            if(online === false) {
                _menu = this.PayMenuOffline
        } else if(netId === 'ETH') {
            _menu = this.PayByERC20
        } else if(netId === 'WAN') {
            _menu = this.PayByERC20_WRC20
        }
        return _menu
    }

    dropDownClick = (e) => {
        let name = e.target.name;
        if(name === '0') {
            console.log("用 ERC20 支付...");
        } else {
            console.log("用 WRC20 支付...");
        }

    };

    info() {
        let arr = this.getMenu(this.props.online, this.props.netId);
        let arrLength = arr.length;

        let arr2;
        if (arrLength !== 2) {
            arr2 = arr.concat('用 WRC20 支付');
        }

        Modal.info({
            title: '选择支付方式',
            okText: '确认',
            cancelText: '取消',
            content: (
                <div>
                    <Radio.Group >
                        {
                            arrLength === 2 ?
                                arr.map((value, index) => {

                                    if (index === 0) {
                                        return <Radio.Button value="large" key={index} name={index} onClick={this.dropDownClick}>{value}</Radio.Button>

                                    } else {
                                        return <Radio.Button value="default" key={index} name={index} style={{marginLeft: '20px'}} onClick={this.dropDownClick}>{value}</Radio.Button>
                                    }

                                }) :
                                arr2.map((value, index) => {

                                    if (index === 0) {
                                        return <Radio.Button value="large" key={index} name={index} onClick={this.dropDownClick}>{value}</Radio.Button>
                                    } else {
                                        return <Radio.Button value="default" key={index} name={index} style={{marginLeft: '20px'}} onClick={this.dropDownClick} disabled>{value}</Radio.Button>
                                    }

                                })
                        }
                    </Radio.Group>

                    <Input placeholder="Basic usage"  style={{marginTop: '20px'}} type="password"/>
                </div>
            ),

            onOk() {},
            onCancel() {},
        });
    }

    render () {
        // TODO: 要绑定数据（index等）
        return (
            <div>
        <Card
            cover={<img alt="装备" src={PicBaseUrl+"/"+ this.props.coverImage} />}

            actions={this.props.actionBtnTitle !== "" ? [
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

PicCard.propTypes = {
    btnClick: PropTypes.func,
};

export default PicCard
