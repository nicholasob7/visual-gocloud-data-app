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

export const options = {
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
            position: "right", // `arrivals at 'y' is a number which plots at date 'x' in json data`
        },
    },
};

export default function PlotExample() {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Arrivals",
                data: [],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    });

    const [isLogScale, setIsLogScale] = useState(false);

    const getData = async () => {
        let response = await fetch('data.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        const myJson = await response.json();
        return myJson;
    }

    const transformListIntoXYList = (input_list_of_dict, key) => {

        let output_list = [[], []];
        input_list_of_dict.forEach(item => {
            output_list[0].push(item[key]);
            output_list[1].push(item["TimePeriod"]);
        });

        return output_list;
    };



    useEffect(() => {
        async function getLineData() {
            let jsonData = await getData();
            let lineData = transformListIntoXYList(jsonData, "Arrivals");
            let graphData = {
                labels: lineData[1],
                datasets: [
                    {
                        label: "Arrivals",
                        data: lineData[0],
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                    },
                ],
            };
            setData(graphData);
        };
        getLineData();
    }, []);
    let options = [];
    if (isLogScale) {
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
