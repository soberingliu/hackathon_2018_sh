import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import './App.css'

import AppLayout from "./components/AppLayout";

class App extends Component {

  render() {

    return (
      <Fragment>
      <AppLayout>

      </AppLayout>

      <Fragment>
       {/* Copyright <Icon type="copyright" /> 2018 网录科技出品 */}
      </Fragment>
      </Fragment>
    );
  }
}

export default App;
