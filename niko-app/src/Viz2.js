// Display Birth Rates into New Zealand from 1921 to 2021
// resulting visualization toggles between real numbers and logarithmic scale of identical data.
// the point of the visualization is to "discover" similarity between the two scales
// whereas the two scales the visual impression is very similar.



import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
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
            text: "NZ Births per 1000 people 1921-2021",
        },
    },
    scales: {
        y: {
            type: "logarithmic",
            position: "right", // `births at 'y' is a number which plots at date 'x' in json data`
        },
    },
};

export default function PlotExample() { // to visualise 2 plots which are "toggles" a simple "app" object has been created.
    const [data, setData] = useState({  // data is the state of the app
        labels: [],
        datasets: [
            {
                label: "Birth per 1000",  // label is the name of the dataset
                data: [],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    });

    const [isLogScale, setIsLogScale] = useState(false);    // isLogScale is the state of the app

    const getData = async () => {   // getData is the function which fetches the data from the API
        let response = await fetch('data1.json'
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
            output_list[0].push(item[key]); // output_list[0] is the list of biennial and annual dates
            output_list[1].push(item["Year"]);    // output_list[1] is the average birth rate per 1000 people 
        });

        return output_list;
    };



    useEffect(() => {   // useEffect is the function which is called when the app is loaded
        async function getLineData() {  // getLineData is the function which is called when the app is loaded
            let jsonData = await getData();
            let lineData = transformListIntoXYList(jsonData, "Birth per 1000");   // lineData is the variable which contains the transformed data
            let graphData = {   // graphData is the variable which contains the data in the format required by the chart
                labels: lineData[1],        // graphData[0] is the list of biennial and annual dates
                datasets: [
                    {
                        label: "Birth per 1000",
                        data: lineData[0],  // graphData[1] is the list of average birth rate per 1000 people
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
                    text: "NZ Birth rate per 1000 people 1921-2021 - Stats NZ",
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
                    text: "NZ Birth rate per 1000 people 1921-2021 - Stats NZ",
                },
            },
            scales: {},
        };
    }
    return (
        <div className="App">
            <h1>NZ birth rates across a century</h1>
            <button onClick={() => setIsLogScale(!isLogScale)}>Real Number Left vs Logarithmic Number Right</button>
            <Line data={data} options={options} />
        </div>
    );
}
