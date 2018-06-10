import React, { Component } from 'react';
import Status from '../../components/Status/Status'; 
import Slider from 'rc-slider';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';
import './StatusChart.css';

import axios from 'axios';

class StatusChart extends Component {

    constructor(props){

        super(props);

        this.state = { 

            value: null,
            plotpoints: null,
            maxDuration: 0,
            markers:this.rangePoints(),
            error: false,
            sliderError:false,
        };
        
    }  
     
    onSliderChange = (seconds) => {
        
        const start_time = seconds[0] ? seconds[0]: 0;
        const end_time = seconds[1] ? seconds[1]: 0;
        this.handleSliderData( start_time , end_time ); 
        this.setState({
            value:seconds,
        });
    }

    handleSliderData( start_time , end_time ){
 
       axios.get('http://localhost/Timeline/public/index.php/get_plotpoints?start_time='+start_time+'&end_time='+end_time)
       .then(res => {
             this.setState({plotpoints:res.data.message})
       }).catch( error => {
            this.setState({ sliderError: true });
       });
    }

    componentDidMount () { 

       axios.get('http://localhost/Timeline/public/index.php/get_plotpoints')
       .then(res => { 
            const maxDurationValue = this.getMaxDuration(res.data.message); 
            this.setState({
                plotpoints:res.data.message,
                maxDuration:maxDurationValue, 
            }); 
        }).catch( error => {
            this.setState({ error: true });
        }); 
    } 

    getMaxDuration =(arrPlot)=>{
        
        const getDurations = arrPlot?arrPlot.map(function(arr){
            return arr.duration;
        }):null;

        return Math.max(...getDurations); 
    }
    
    rangePoints(){
        const marks = {
          0: {
            style: {
              color: 'red',
            },
            label: <strong>0 Seconds</strong>,
          },
          50: <strong>50 Seconds</strong>,
          100 : <strong>100 Seconds</strong>,
          150 : <strong>150 Seconds</strong>,
          200 : <strong>200 Seconds</strong>,
          250 : <strong>250 Seconds</strong>,
          300 : {
            style: {
              color: 'green',
            },
            label: <strong> 300 Seconds</strong>,
          },
        };
        return marks;   
    };

    render () { 

        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);  
        const wrapperStyle = { margin: 50 ,width:'90%'};  
        const maxIntervel = this.state.maxDuration?this.state.maxDuration:100;

        return (
            <div className="container full-width">  
             {this.state.error===false?
                <div>
                <div className="panel panel-default">
                    <div className="panel-heading">Slide to sort graph by Time</div>
                      <div style={wrapperStyle} className="panel-body">

                            <Range onChange={ (value) => this.onSliderChange( value ) } 
                            min={0} marks={this.state.markers?this.state.markers:100}
                             step={50} max={300}
                            allowCross={false} 
                            value={this.state.value?this.state.value:[0,maxIntervel]} 
                            tipFormatter={value => `${value} Seconds`}
                            />  

                      </div>
                    </div> 
            	<Status data={this.state.plotpoints?this.state.plotpoints:null}/>
                </div>
                :<div className="container full-width">
                    <div className="alert alert-danger fade in">
                        <a href="#" className="close" data-dismiss="alert">&times;</a>
                        <strong>Network Error!</strong> Please try after sometime.
                    </div>
                 </div>
              } 
            </div>
        );
    }
}

export default StatusChart;