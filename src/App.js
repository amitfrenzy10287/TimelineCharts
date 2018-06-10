import React, { Component } from 'react';
import StatusChart from './containers/StatusChart/StatusChart';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
window.jQuery = window.$ = $;
require('bootstrap');



class App extends Component {
  render() {
    return (
      <div className="App">
       <StatusChart />
      </div>
    );
  }
}

export default App;
