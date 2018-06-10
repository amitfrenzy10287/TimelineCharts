import React, { Component } from 'react'; 
import { Chart } from 'react-google-charts';
import moment from 'moment';
import Loader from '../Loader/Loading';
import './Status.css';

class Status extends Component {

  constructor(props) {
    super(props);
      
    this.state = {
      updatedData: null,		
      options: { 
      	onClick: function(evt, activeElements) {
	      var elementIndex = activeElements[0]._index;
	      this.data.datasets[0].pointBackgroundColor[elementIndex] = 'white';
	      this.update();
	    },
        title: 'Timeline vs. Duration comparison',
        hAxis: { title: 'Timeline', minValue: 0, maxValue: 31 },
        vAxis: { title: 'Duration', minValue: 0, maxValue: 300 },
        colors: ['orange','green','red'],
        pointSize: 15,
        is3D:true,
          legend: true,
        },
      rows:[],

      columns: [
        {
          type: 'string',
          label: 'Date',
        },
        {
          type: 'number',
          label: 'Error',
        },
        {
          type: 'number',
          label: 'Pass',
        },
        {
          type: 'number',
          label: 'Fail',
        }, 

      ],
    };
  } 

  render() {  

   	const plotData = this.props.data ? this.props.data : null; 

    const plottedRows = plotData?plotData.map(function(arrPlot){
       return [moment(arrPlot.start_time).format("MMM DD"),
       arrPlot.status==='error'?
       arrPlot.duration:null,
       arrPlot.status==='pass'?
       arrPlot.duration:null,
       arrPlot.status==='fail'?
       arrPlot.duration:null];
     }):null; 
      

    return (

    <div className="panel panel-default statusContainer" >	
      {plottedRows?<Chart
        chartType="ScatterChart"
        rows={plottedRows?plottedRows:[]}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle={true}
        chartEvents={this.chartEvents}
      />:<Loader/>}
      </div>
    );
  }
}
export default Status;