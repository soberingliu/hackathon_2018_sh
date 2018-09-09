import React, { Component } from 'react'

import "./SideBarImage.css"

import {CompanyLogoUrl} from './HttpUtils'

class CompanyLogo extends Component {
    render () {
        return (
                <img src={CompanyLogoUrl} className='bottomImg'></img>
        )
    }
}

export default CompanyLogo
