import React, { useState, useEffect } from 'react';

import Graph from './Graph';

import styled from "styled-components";

import { FaCircle, FaBluetoothB } from "react-icons/fa"


const GraphContainer = () => {

    const [data, setData] = useState([]);
    const [lastData, setLastData] = useState([]);
    const [result, setResult] = useState([]);


    // useEffect(() => {
    //     setInterval(function () {
    //         var x = (new Date()).getTime(), // current time
    //             // y = Math.round(Math.random() * 100);
    //             y = distanceData;

    //         setData(data => [...data, [x, y]])
    //         setLastData([x, y])

    //         // series.addPoint([x, y], true, true);

    //     }, 1000);
    // }, [])
    useEffect(() => {
        if (result.length != 0) {
            // console.log(result, "!!!!!!!!!!!!!!!@@@@@@@@@@@");
            setData(data => [...data, result]);
            setLastData(result);
        }

    }, [result])



    return (
        <>

        </>
    );
};
export default Description;