import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import migrationData from "../../data/International_migration.json"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "International Arrivals - StatsNZ ",
        },
    },
    scales: {
        xAxis: [
            {
                type: "time",
                time: {
                    unit: "monthly",
                },
            },
        ],
    },
};

const labels = [0, 1];

export const migrationData = {
    labels,
    datasets: [
        {
            label: "arrivals",
            data: labels.map(() => []),
            borderColor: "rgb(0, 0, 255)",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
        },
    ],
};

export default function PlotExample() {
    const [data, setData] = useState(migrationData);

    const dateTimeFormat = (input_date) => {
        let date = new Date(input_date);
        return date.toLocaleDateString();
    };


    const transformListIntoXYList = (input_list_of_dict, key) => {
        let transformed_dict = {};
        for (const i in input_list_of_dict) {
            transformed_dict[(input_list_of_dict[i]["date"])] = input_list_of_dict[i][key];
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
        getMigrationData().then((response) => {
            const data = response;
            const arrivals = transformListIntoXYList(data, "arrivals");
            const arrivals_x = getPositionList(arrivals, "x");
            const input_data = {
                labels: labels,
                monthly: getPositionList(monthly, "y"),
            };
            setData({
                labels: arrivals_x,
                datasets: [
                    {
                        label: "arrivals",
                        data: input_data.monthly,
                        borderColor: "rgb(0, 0, 255)",
                        backgroundColor: "rgba(0, 0, 255, 0.5)",
                    },
                ],
            });
        });
    }, []);

    const getMigrationData = async () => {
        return migrationData;
    };


    return (
        <div className="App" style={{ width: '90%', height: '90%' }}>
            <h1>Monthly Arrivals 1921-2021</h1>
            <Line
                options={options}
                data={data}
            // setData={setData}
            />
        </div>
    );
}
