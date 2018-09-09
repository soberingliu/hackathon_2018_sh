import React, { Component } from 'react'

import ModelDlg from "./ModelDlg"
import ModelDlgX from "./ModelDlg_try"
import AccountList from './AccountList';


import { Card, Icon, Avatar, Button, Menu, Dropdown, Rate } from 'antd';

const { Meta } = Card;

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
    </Menu>
  )
  
  const MyMenu = (props) => (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
    </Menu>
  )

const MoreA = (props) =>  (
<Dropdown overlay={menu}>
   <div>
    <Rate allowHalf defaultValue={4.5} disabled/>
    <span>4.9</span>
    <Icon type="down" style={{fontSize: 18}}/>
    </div>
</Dropdown>
)

const MoreB = (props) => {
    return (
<Dropdown overlay={menu}>
    <div>
    <Rate allowHalf defaultValue={4.5} disabled/>
    <span>4.8</span>
    <Icon type="down" style={{fontSize: 18}}/>
    </div>
</Dropdown>)
}

class TestPane extends Component {

    menuClick = ( {key} ) => {
        console.log("click : ", key);
    }

    render () {
        console.log("menu: ", menu);
        console.log("MyMenu: ", MyMenu);
        return (
            <div>
            <ModelDlg>
            <AccountList onClick={this.menuClick}></AccountList>
            </ModelDlg>
            <ModelDlgX></ModelDlgX>
            {/* <More></More> */}
            {/* <MoreA></MoreA> */}
          
            <Card
            // cover={<img alt="example" src="https://dummyimage.com/600x400/c799c7/fff.png&text=Ethereumn" />}    // OK!
            cover={<img alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536034396292&di=61af57a6db8a1ae3cbbbb953c31f3261&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20161019%2Fa37aed1a20f54d579fcb3efa8b1f4b37_th.jpg" />}
            // actions={[<Button icon="safety-certificate" onClick={this.btnClick}>Search</Button>, <Icon type="safety-certificate" theme="outlined" />]}
            actions={[<Button icon="safety-certificate" onClick={this.btnClick}>Search</Button>, <MoreA></MoreA>]}
            
        >
            <Meta
            // avatar={<Avatar src="" />}
            // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="Card title"
            description="This is the description"
            />
        </Card>

            </div>
        )
    }
}

export default TestPane
