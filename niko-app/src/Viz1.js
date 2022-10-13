// Display Arrivals into New Zealand from 1921 to 2021
// resulting visualization toggles between real numbers and logarithmic scale of identical data.
// the point of the visualization is to "discover" trend impact of WWII being comparable to trend impact of Covid 19
// whereas in the non logarithmic visualization the impact of WWII is not visible.



import React, { useState, useEffect } from "react";
// import DatePicker from "react-datepicker";
import { Line } from 'react-chartjs-2';
import "react-datepicker/dist/react-datepicker.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale
);

export const options = {       // options for the chart
    responsive: true,      // responsive to window size
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Arrival Numbers into Aotearoa 1921-2021 - Stats NZ",
        },
    },
    scales: {
        y: {
            type: "logarithmic",
            position: "right", // `arrivals at 'y' is a number which plots at date 'x' in json data`
        },
    },
};

export default function PlotExample() {
    // const [selectedDate, setSelectedDate] = useState(new Date("1921-01-01")); // set start date to 1921
    const [data, setData] = useState({  // data is the state of the app
        labels: [],
        datasets: [
            {
                label: "Arrivals",  // label is the name of the dataset
                data: [],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    });

    const [isLogScale, setIsLogScale] = useState(false);    // isLogScale is the state of the app

    const getData = async () => {   // getData is the function which fetches the data from the API
        let response = await fetch('data.json'  // data.json is the file which contains the data
            , {
                headers: {
                    'Content-Type': 'application/json', // the data is in json format
                    'Accept': 'application/json'
                }
            }
        );

        const myJson = await response.json();   // myJson is the variable which contains the data
        return myJson;
    }

    const transformListIntoXYList = (input_list_of_dict, key) => {  // transformListIntoXYList is the function which transforms the data into the format required by the chart

        let output_list = [[], []]; // output_list is the variable which contains the transformed data
        input_list_of_dict.forEach(item => {
            output_list[0].push(item[key]); // output_list[0] is the list of dates
            output_list[1].push(item["TimePeriod"]);    // output_list[1] is the list of arrivals
        });

        return output_list;
    };



    useEffect(() => {   // useEffect is the function which is called when the app is loaded
        async function getLineData() {  // getLineData is the function which is called when the app is loaded
            let jsonData = await getData();
            let lineData = transformListIntoXYList(jsonData, "Arrivals");   // lineData is the variable which contains the transformed data
            let graphData = {   // graphData is the variable which contains the data in the format required by the chart
                labels: lineData[1],        // graphData[0] is the list of dates
                datasets: [
                    {
                        label: "Arrivals",
                        data: lineData[0],  // graphData[1] is the list of arrivals
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                    },
                ],
            };
            setData(graphData); // setData is the function which sets the data in the app
        };
        getLineData();  // getLineData is the function which is called when the app is loaded
    }, []);
    let options = [];
    if (isLogScale) {   // if isLogScale is true then the chart is displayed with logarithmic scale
        options = {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Arrival Numbers into Aotearoa 1921-2021 - Stats NZ",
                },
            },
            scales: {
                y: {
                    type: "logarithmic",
                    position: "right", // `axis` is determined by the position as `'y'`
                },
            },
        };
    }
    else {
        options = {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: "Arrival Numbers into Aotearoa 1921-2021 - Stats NZ",
                },
            },
            scales: {},
        };
    }
    return (
        <div className="App">
            <h1>Aotearoa Arrivals Across a Century</h1>
            <button onClick={() => setIsLogScale(!isLogScale)}>Real Number Left vs Logarithmic Number Right</button>
            <Line data={data} options={options} />
        </div>
    );
}
