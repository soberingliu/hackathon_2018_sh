import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
// import MyCard from './components/MyCard';
import PicCardList from './components/PicCardList';
import MyCol4 from './components/Grid_Col4';
import MyCol2 from './components/Grid_Col2';
import MyIcon from './components/Icon';
import Rowdemo from "./components/Row_Col_demo1";
import Erc20_detail from './components/Erc20_detail';
import MyTab from './components/MyTab';
import AccountInputForm from './components/AccountInputForm';


class App extends Component {
  render() {
    const TabData = [
      {title: "RERC20", pane: <Erc20_detail></Erc20_detail>},
      {title: "ERC721", pane: <Rowdemo></Rowdemo>}
    ]

    const TabStyle = {
      tab : {
        height: 300,
      }
    }
    return (
      <div>
      <AccountInputForm></AccountInputForm>

      <MyTab data={TabData} className={TabStyle.tab}>
      </MyTab>

         {/* <Rowdemo></Rowdemo>
        <MyIcon></MyIcon>
        <MyCol2></MyCol2>
        <p>请选择日期：</p>
        <DatePicker />

        <MyCol4></MyCol4>
        <Erc20_detail></Erc20_detail>
      */}

      </div>
    );
  }
}

export default App;
