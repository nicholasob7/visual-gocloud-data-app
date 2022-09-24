// plot timeperiod to x arrivals to y line chart timeseries

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Arrivals from "./data.json";



const arrivalsData = Arrivals;
const labels = ["timeperiod", "arrivals"];

const getArrivalsData = () => {
    fetch('data.json'
        , {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
        });
}

export default function PlotExample() {
    const [data, setData] = useState(arrivalsData);
    const date = (input_date) => {
        let date = new Date(input_date);
        return date.toLocaleDateString();
    };

    const transformListIntoXYList = (input_list_of_dict, key) => {
        let transformed_dict = {};
        for (const i in input_list_of_dict) {
            transformed_dict[(input_list_of_dict[i]["timeperiod"])] = input_list_of_dict[i][key];
        }

        let output_list = [];
        for (const [key, value] of Object.entries(transformed_dict)) {
            output_list.push({ x: key, y: value });
        }
        return output_list;
    };

    const getPositionList = (input_xy_dict_list, key) => {
        let output_x_list = [];
        for (const item of input_xy_dict_list) {
            output_x_list.push(item[key]);
        }
        return output_x_list;
    };

    useEffect(() => {
        getArrivalsData().then((response) => {
            const data = response;
            const [timeperiod, arrivals] = transformListIntoXYList("timeperiod.x", "arrivals.y");
            // const timeperiod_x = getPositionList(data, "x");
            const input_data = {
                labels: labels,
                timeperiod: getPositionList(timeperiod, "x"),
                arrivals: getPositionList(arrivals, "y"),
            };
            setData({
                labels: input_data.labels,
                datasets: [
                    {
                        label: "timeperiod", "arrivals"
                            : input_data, [date]: ["arrivals"],
                        borderColor: "rgb(0, 0, 255)",
                        backgroundColor: "rgba(0, 0, 255, 0.5)",
                    },
                ],
            });
        });
    }, []);

    return (
        <div>
            <Line data={data} />
        </div>
    );
}