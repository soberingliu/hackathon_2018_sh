/**
 * Created by mapbar_front on 2018/1/27.
 */

import React,{ Component } from 'react';
import { Table } from 'antd';


const columns = [{
    title: '账户',
    dataIndex: 'addr',
    render: text => <a> { text } </a>
},{
    title: '余额',
    dataIndex: 'balance',
    width: '20%',
},{
    title: '链标识',
    dataIndex: 'netid',
    // sorter: true,
}]

const rowKey = function(record) {
    return record.addr;  // 比如你的数据主键是 uid
  };

// const rowClickHandler =

class Erc20_detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            balanceList: props.balanceList,
        }
    }

    render() {

        let pagination = {
            total: this.state.balanceList.length,
            pageSize: 3,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
              console.log('Page： Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
              console.log('Page: Current: ', current);
            }
          };
          pagination = {};

        return (
            <div>
                <Table
                  onRow= {(record) => {
                        return {
                        onClick: () => {console.log("click on row: ", record)},       // click row
                        // onMouseEnter: () => {console.log("mouse enter on row: ", record)},  // mouse enter row
                        };
                    }}
                   rowKey={rowKey}
                   dataSource={ this.state.balanceList }
                   columns={ columns }
                   pagination={pagination} />
            </div>
        )
    }
}
export default Erc20_detail;
