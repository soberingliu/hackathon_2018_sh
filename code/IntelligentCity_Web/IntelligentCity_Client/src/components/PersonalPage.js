import React, { Component } from 'react'

import Erc20_detail from './Erc20_detail'
import { GetPersonalAsset } from './HttpUtils';
import PicCardListPer from "./PicCardListPer";
import { Skeleton } from 'antd';

class PersonalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
          personalAsset:{}
        }
      }

    componentDidMount() {

        let resp = GetPersonalAsset('wanglu');
        resp.then((payLoad) => {
            { this.setState({personalAsset: payLoad.data}) }
        })

      }

    render () {

        const Loading = () => (<Skeleton active title={false} />);
        const dataReady = this.state.personalAsset && this.state.personalAsset.token;
        const digitAssetReady = this.state.personalAsset && this.state.personalAsset.digitAsset;

        return (
            <div>
                <h1>我的资产</h1>
                <h3 style={{ marginBottom: 16 }}>ERC20 资产</h3>

                { dataReady ?
                    <Erc20_detail balanceList={this.state.personalAsset.token}></Erc20_detail> :
                    <Loading></Loading>
                 }

                <h3 style={{ marginBottom: 16 }} >已购资产</h3>
                { digitAssetReady ?
                    <PicCardListPer
                        digitAsset={this.state.personalAsset.digitAsset}
                        actionBtnTitle="">
                    </PicCardListPer> :
                    <Loading></Loading>
                 }

            </div>
        )
    }
}
export default PersonalPage
