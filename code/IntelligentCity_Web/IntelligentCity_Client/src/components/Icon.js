import React, { Component } from 'react'

import {Icon} from "antd"

class MyIcon extends Component {
    render () {
        return (
            <div>
                <Icon type="home" />
                <Icon type="setting" theme="filled" />
                <Icon type="smile" theme="outlined" />
                <Icon type="sync" spin />
                <Icon type="loading" />
            </div>
        )
    }
}

export default MyIcon
