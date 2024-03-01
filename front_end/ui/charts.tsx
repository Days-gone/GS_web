import {AgChartsReact} from "ag-charts-react";
import React, {Fragment, useState} from "react";
import {AgChartOptions, AgCharts} from "ag-charts-community";

const default_data = [
    {asset: "Calcite", amount: 60000},
    {asset: "Aragonite", amount: 40000},
    {asset: "Dolomite", amount: 7000},
    {asset: "Smithsonite", amount: 5000},
    {asset: "Cerussite", amount: 3000},
];
const bar_data = [
    {
        quarter: "Mineral Index",
        CompositeDegree: 0.39,
        RockRichness: 0.77,
    },
];


const BarExample = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Mineral Index",
        },
        data: bar_data,
        series: [
            {
                type: "bar",
                xKey: "quarter",
                yKey: "CompositeDegree",
                yName: "CompositeDegree",
            },
            {
                type: "bar",
                xKey: "quarter",
                yKey: "RockRichness",
                yName: "RockRichness",
            }
        ],
    });

    return <AgChartsReact options={options}/>;
};


const ChartExample = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        data: default_data,
        title: {
            text: "Possibility Composition",
        },
        series: [
            {
                type: "donut",
                calloutLabelKey: "asset",
                angleKey: "amount",
                innerRadiusRatio: 0.4,
                strokeWidth: 0.0,
            },
        ],
    });

    return <AgChartsReact options={options}/>;
};

export function BarChart() {
    return (
        <>
            <BarExample></BarExample>
        </>
    );
}


export default function DefaultChart() {
    return (
        <>
            <ChartExample></ChartExample>
        </>
    );
}