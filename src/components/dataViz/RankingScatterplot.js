// import "./styles.css";
import React from "react";
import { useState, useEffect } from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
} from "recharts";
import { APIManager } from "../../modules/APIManager";

const data01 = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
];
const data02 = [
    { x: "how", y: 300, z: 200 },
    { x: "4sdf00", y: 500, z: 260 },
    { x: "2sdf00", y: 700, z: 400 },
    { x: "3as40", y: 350, z: 280 },
    { x: "5as60", y: 500, z: 500 },
];

export const RankingScatterplot = (filmRankPairs) => {
    const API = new APIManager();
    const [data, setData] = useState(filmRankPairs);
    const [data2, setData2] = useState(data02);

    useEffect(() => {
        // debugger;
        API.putFilmNames(filmRankPairs["filmRankPairs"]).then((res) => {
            setData(res);
        });
    }, [filmRankPairs]);

    return (
        <ScatterChart
            width={500}
            height={400}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            }}
        >
            <CartesianGrid />
            <XAxis type="number" dataKey="index" name="stature" />
            {/* <YAxis
        yAxisId="left"
        type="number"
        dataKey="y"
        name="weight"
        unit="kg"
        stroke="#8884d8"
      /> */}
            <YAxis
                yAxisId="right"
                type="number"
                dataKey="valuation"
                // dataKey="valuation"
                name="weight"
                unit="kg"
                orientation="right"
                stroke="#99aabb"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            {/* <Scatter yAxisId="left" name="A school" data={data01} fill="#8884d8" /> */}
            <Scatter
                yAxisId="right"
                name="A school"
                // data={data["filmRankPairs"]}
                data={data}
                fill="  #99aabb"
            >
                <LabelList
                    dataKey="filmName"
                    position="top"
                    angle="290"
                    offset="10"
                    height="100"
                />
            </Scatter>
        </ScatterChart>
    );
};
