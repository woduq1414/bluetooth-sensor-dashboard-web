import React, { useState, Component } from 'react';
// Import Highcharts
import Highcharts from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.min.js";
import HighchartsReact from "highcharts-react-official";

import styled from "styled-components";
import HC_more from "highcharts/highcharts-more"; //module
HC_more(Highcharts); //init module

const Description = styled.span`
    font-size : 20px;
    font-weight : bold;
`




class Graph extends Component {


    componentDidMount() {
        const chart = this.chartComponent.current.chart;

        let series = chart.series[0];
        // setInterval(()=> {
        //     // console.log(this.props);
        //     series.addPoint([x, y], true, true);

        // }, 1000);


    }

    componentDidUpdate(prevProps) {
        // 전형적인 사용 사례 (props 비교를 잊지 마세요)
        if (this.props.lastData !== prevProps.lastData) {
            let target = this.props.target;


            //   console.log(this.props.lastData);
            const chart = this.chartComponent.current.chart;

            let series = chart.series[0];
            series.addPoint([this.props.lastData["x"], this.props.lastData[target]], true, true);
        }
    }


    constructor(props) {
        super(props);
        this.chartComponent = React.createRef();
        this.state = {
            options: {
                chart: {
                    events: {
                        load: function () {

                            // set up the updating of the chart each second

                        }
                    }
                },

                time: {
                    useUTC: false
                },

                rangeSelector: {
                    buttons: [{
                        count: 1,
                        type: 'minute',
                        text: '1M'
                    }, {
                        count: 5,
                        type: 'minute',
                        text: '5M'
                    }, {
                        type: 'all',
                        text: 'All'
                    }],
                    inputEnabled: false,
                    selected: 0
                },



                exporting: {
                    enabled: false
                },

                series: [{

                    name: 'Sensor data',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                            time = (new Date()).getTime(),
                            i;

                        for (i = -1000; i <= 0; i += 1) {
                            data.push([
                                time + i * 1000,
                                0
                            ]);
                        }
                        return data;
                    }())
                }]
            }
        };
    }

    render() {
        return (
            <>
                <Description>
                    {
                        `Current Value : ${this.props.lastData[this.props.target]}`
                    }
                </Description>
{/* 
                <span>
                    {
                        this.props.target == "distance" ?  : "ㅇㅇ"
                    }
                </span> */}

                <HighchartsReact
                    constructorType={"stockChart"}
                    ref={this.chartComponent}
                    highcharts={Highcharts}
                    options={this.state.options}
                />
            </>

        );
    }
}
export default Graph;