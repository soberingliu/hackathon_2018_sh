import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import PicCardList from './PicCardList'
import { GetShoppingMallAsset } from './HttpUtils'

class ShoppingMallPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            mallAsset: []
         }
    }


    componentDidMount() {

        let resp = GetShoppingMallAsset('wanglu');
        resp.then((payLoad) => {
            {
                this.setState({mallAsset: payLoad.data})
            }
        })
    }

    componentWillMount() {

    }

    render() {

        const dataReady = this.state.mallAsset && this.state.mallAsset.length > 0;
        // const dataReady =false
        return (
            <div>
                <h1>商城</h1>
                {/*<h3 style={{ marginBottom: 16 }}>ERC20 资产</h3>*/}
                { dataReady ?
                    <PicCardList
                        digitAsset={this.state.mallAsset}
                        showBuyDlg={this.props.showBuyDlg}
                        actionBtnTitle={"购买"} >
                    </PicCardList> :

                    <Spin tip="Loading...">
                        <Alert
                            message="ERC20资产加载中..."
                            description="正在努力加载中，请稍等..."
                            type="info"
                        />
                    </Spin>

                 }
            </div>
        );
    }
}

ShoppingMallPage.propTypes = {

};

export default ShoppingMallPage;
