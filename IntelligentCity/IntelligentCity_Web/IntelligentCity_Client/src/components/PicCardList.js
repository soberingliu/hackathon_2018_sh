import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List } from 'antd';

import PicCard from "./PicCard_old";

class PicCardList extends Component{

    constructor(props) {
        super(props);
        // console.log("PicCardList: props", props);
        this.state = {
          digitAsset: props.digitAsset
        }
    }

    render() {

        return (
            <List style={{ background: '#ECECEC', padding: '30px' }}
                grid={{ gutter: 16, column: 3 }}
                dataSource={this.state.digitAsset}
                renderItem={item => (
                <List.Item>
                    <PicCard
                        assetId={item.ID}
                        address={item.address}
                        coverImage={item.picture}
                        title={item.name || '无名'}
                        desc = {item.description|| '...'}
                        price = {item.price|| '待定'}
                        online = {item.type === 'true'}
                        netId = {item.chain}
                        >
                    </PicCard>
                </List.Item>
                )}
            />
      )
  }
}

PicCardList.propTypes = {
    digitAsset: PropTypes.arrayOf(
        PropTypes.shape({
            picture: PropTypes.string,
        })
    )
};

export default PicCardList
