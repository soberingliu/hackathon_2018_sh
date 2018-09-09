import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Card,Button, Modal } from 'antd';

import {PicBaseUrl} from './HttpUtils'
import './ListCard.css'

const { Meta } = Card;

class ListCardPer extends Component {

    info() {

        Modal.success({
            title: '选择支付方式',
            content: (
                <div>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
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
                    // extra={<Button onClick={this.info}>More</Button>}
                >
                    <Meta
                        title={this.props.title}
                        description={this.props.desc}
                    />

                </Card>
            </div>
        )
    }
}

ListCardPer.propTypes = {
    btnClick: PropTypes.func,
};

export default ListCardPer
