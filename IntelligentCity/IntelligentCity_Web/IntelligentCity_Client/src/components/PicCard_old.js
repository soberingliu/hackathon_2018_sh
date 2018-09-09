import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';

import { Card, Button, Radio, Modal, Spin, Alert } from 'antd';

import {postWRC20TransferWAN, PicBaseUrl, postERC20Transfer, postWRC20Transfer, postERC20TransferWAN, postERC20TransferETH} from './HttpUtils'
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
    };
    AssetChannel.propTypes = {
        channelType : PropTypes.string
    };
// ======================================

class PicCard extends Component {
    state = { visible: false, transfer: false};

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = async (e) => {
        let param = {address: this.props.address};

        // 用 ERC20 支付
        if (this.state.channel === 0) {

            this.setState({
                transfer: true
            });

            let resp;

            //ERC20 线下支付
            if (!this.props.netId) {
                resp = await postERC20Transfer(this.props.address, this.props.price);
            }

            //ERC20 线上 WAN渠道
            if (this.props.netId === 'WAN') {
                resp = await postERC20TransferWAN(this.props.assetId, this.props.price);
            }

            //ERC20 线上 ETH渠道
            if (this.props.netId === 'ETH') {
                resp = await postERC20TransferETH(this.props.price);
            }

            console.log('ERC20 resp: ', resp);
            this.setState({
                visible: false,
                transfer: false
            });


        }
        // 用 WRC20 支付
        else if (this.state.channel === 1) {

            this.setState({
                transfer: true
            });

            let resp;
            // 用 WRC20 支付 线下支付
            if (!this.props.netId) {
                resp = await postWRC20Transfer(this.props.price);
            }
            // 用 WRC20 支付 线上 WAN渠道
            if (this.props.netId === 'WAN') {
                resp = await postWRC20TransferWAN(this.props.assetId, this.props.price);
            }

            console.log('WRC20 resp: ', resp);

            this.setState({
                visible: false,
                transfer: false
            });
        }

    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

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
    };

    dropDownClick = (e) => {
        let id = e.target.id;
        if (id === '0') {
            this.setState({
                channel: 0,
            });
        } else {
            this.setState({
                channel: 1,
            });
        }
    };

    render () {
        // TODO: 要绑定数据（index等）
        let arr = this.getMenu(this.props.online, this.props.netId);
        let arrLength = arr.length;

        let arr2;
        if (arrLength !== 2) {
            arr2 = arr.concat('用 WRC20 支付');
        }

        return (
            <div>
        <Card
            cover={<img alt="装备" src={PicBaseUrl+"/"+ this.props.coverImage} />}

            actions={this.props.actionBtnTitle !== "" ? [
                    <div className='priceGroup'> <span>Price</span>: <span className='priceVal' >{this.props.price || '待定'}</span> </div>,

                <div>

                    <div>
                        <Button type="primary" onClick={this.showModal}>购买</Button>
                        <Modal
                            title="支付方式"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        >
                            <Radio.Group >
                                {
                                    arrLength === 2 ?
                                        arr.map((value, index) => {

                                            if (index === 0) {
                                                return <Radio.Button value="large" key={index} id={index.toString()} onClick={this.dropDownClick}>{value}</Radio.Button>

                                            } else {
                                                return <Radio.Button value="default" key={index} id={index.toString()} style={{marginLeft: '80px'}} onClick={this.dropDownClick}>{value}</Radio.Button>
                                            }

                                        }) :
                                        arr2.map((value, index) => {

                                            if (index === 0) {
                                                return <Radio.Button value="large" key={index} id={index.toString()} onClick={this.dropDownClick}>{value}</Radio.Button>
                                            } else {
                                                return <Radio.Button value="default" key={index} id={index.toString()} style={{marginLeft: '80px'}} onClick={this.dropDownClick} disabled>{value}</Radio.Button>
                                            }

                                        })
                                }
                            </Radio.Group>

                            { this.state.transfer ?
                                <Spin tip="Loading...">
                                    <Alert
                                        message="支付中..."
                                        type="info"
                                    />
                                </Spin> : <div></div>
                            }

                        </Modal>
                    </div>

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
