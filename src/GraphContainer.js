import React, { useState, useEffect } from 'react';

import Graph from './Graph';

import styled from "styled-components";

import { FaCircle, FaBluetoothB } from "react-icons/fa"

const GraphWrapper = styled.div`
    display : flex;
    width : 100%;
    flex-direction : column;
    padding : 1rem;
    box-shadow : 4.0px 8.0px 16.0px hsl(0deg 0% 0% / 0.25);
    border-radius : 1rem;
    margin : 1rem 0;
`;

const StyledGraphContainer = styled.div`
    display : flex;
    flex-wrap : wrap;
    width : 80%;
    margin : 0 auto;
    justify-content: space-evenly;
`

const StyledGraphWrapperTop = styled.span`
    // border-bottom : 1px solid gray;
    margin : 0.2rem 0.5rem;
    // display : inline;
    // background : purple;
`

const StyledGraphTitle = styled.span`
    font-size : 1.5rem;
    margin-left : 0.6rem;
    
`

const BlueToothButton = styled.span`
    background : #2292d4;
    border : 3px solid white;
    color : white;
    font-size : 1.4rem;
    padding : 0.4rem 1rem;
    border-radius : 1rem;
    display : flex;
    align-items :center;
    cursor : pointer;

`



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

    function onClicks(e) {
        console.log("!!!!!!!!!!");
        navigator.bluetooth.requestDevice({
            filters: [{ services: [bluetoothUuid] }] // bluetoothUUid를 통해 아두이노(블루투스 모듈)를 찾음
        })
            .then(function (device) {
                getDevice(device)
                return device.gatt.connect(); // 아두이노와 연결
            })
            .then(function (server) {
                return server.getPrimaryService(bluetoothUuid);
            })
            .then(function (service) {
                return service.getCharacteristic(bluetoothChar);
            })
            .then(function (characteristic) {


                let arr = [];

                characteristic.startNotifications().then(() => {
                    characteristic.addEventListener('characteristicvaluechanged', function (e) {
                        const value = e.target.value.getUint8(0).toString(10);
                        // console.log(value);


                        if (value == 255) {
                            if (arr.length == 4) {
                                // console.log(arr[0], arr[1], arr[0] * 128 + arr[1])
                                let result = {
                                    "x": new Date().getTime(),
                                    "distance": (arr[0] * 128 + arr[1]) * 17 / 1000,
                                    "water": arr[2] * 128 + arr[3]
                                };

                                // console.log(result);

                                setResult(result);
                            }
                            arr = [];
                        } else {
                            arr.push(value * 1);
                        }


                    });
                })

            })
            .catch(function (error) {
                console.error('Connection failed!', error);
            });
    }
    const bluetoothUuid = 0xFFE0;
    const bluetoothChar = 0xFFE1;

    function getDevice(device) {
        device.addEventListener('gattserverdisconnected', () => {
            alert("디바이스 연결이 끊어졌습니다.");
        });
    }


    return (
        <>

            <StyledGraphContainer>
                <BlueToothButton onClick={onClicks}>
                    <FaBluetoothB/> &nbsp;블루투스 연결
                </BlueToothButton>
                <GraphWrapper>
                    <StyledGraphWrapperTop>
                        <FaCircle />
                        <StyledGraphTitle>
                            초음파 센서
                        </StyledGraphTitle>
                    </StyledGraphWrapperTop>


                    <Graph lastData={lastData} target="distance" />
                </GraphWrapper>
                <GraphWrapper>
                    <StyledGraphWrapperTop>
                        <FaCircle />
                        <StyledGraphTitle>
                            수위 센서
                        </StyledGraphTitle>
                    </StyledGraphWrapperTop>
                    <Graph lastData={lastData} target="water" />
                </GraphWrapper>
            </StyledGraphContainer>
        </>
    );
};
export default GraphContainer;