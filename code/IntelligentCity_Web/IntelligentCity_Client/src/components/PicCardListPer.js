import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List } from 'antd';

import ListCardPer from "./ListCardPer";

class PicCardListPer extends Component{

    constructor(props) {
        super(props);

        console.log('this.props.digitAsset: ', this.props.digitAsset);
        this.state = {
          digitAsset: this.props.digitAsset
        }
    }

    render() {
        // "注释3": "3 type线上或线下,ture表示线上,false表示线下;",
        // "注释4": "4 chain 只有type=true时才有意义,取值ETH/WAN",

        return (
            <List style={{ background: '#ECECEC', padding: '30px' }}
                grid={{ gutter: 16, column: 3 }}
                dataSource={this.state.digitAsset}
                renderItem={item => (
                <List.Item>
                    <ListCardPer
                        assetId={item.ID}
                        coverImage={item.picture}
                        title={item.name || '无名'}
                        desc = {item.description|| '...'}
                        price = {item.price|| '待定'}
                        online = {item.type === 'true'}
                        netId = {item.chain}
                        >
                    </ListCardPer>
                </List.Item>
                )}
            />
      )
  }
}

PicCardListPer.propTypes = {
    digitAsset: PropTypes.arrayOf(
        PropTypes.shape({
            picture: PropTypes.string,
        })
    )
};

export default PicCardListPer
