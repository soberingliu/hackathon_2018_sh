import React, { Component, PropTypes } from 'react'
import { Select } from 'antd';

const Option = Select.Option;

class ChainChoices extends Component {

    handleChange(value) {
      console.log(`selected ${value}`);
    }

    render () {
        return (
            <Select
            showSearch
            style={{ width: 100 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            <Option value="wan">Wan</Option> 
            <Option value="eth">Eth</Option>            
        </Select>
        )
    }
}


export default ChainChoices
