import React, { useState } from "react";
import {
    Grid,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import Button from '@mui/material/Button';
import { Link as LinkRouter } from 'react-router-dom';
import UserAchivMoney from "./UserAchivMoney";
import TextField from '@mui/material/TextField';

const PieChartData = [
    { name: "Group A", value: 0 },
    { name: "Group B", value: 1 },
    { name: "Group B", value: 4 },
];
const COLORS = [
    '#c4c4c4', '#00C49F'
];
const renderActiveShape = (props) => {
    return (

        <g>
            <text x={200} y={200} dy={8} textAnchor="middle" fill='#00C49F'>
                {"82%"}
            </text>
        </g>

    );
};
export default function UserAchievement(props) {
    var theme = useTheme();

    return (
        <>
            <Grid item lg={3} md={4} sm={2} xs={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="キャッシュ" variant="outlined" value="¥100,000" />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="報酬ポイント" variant="outlined" value="100,000p" />
                </Grid>
            </Grid>
            <Grid item lg={3} md={4} sm={2} xs={2} sx={{ flexGrow: 1 }}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        0回
                    </Grid>
                    <Grid item xs={4}>
                        0h
                    </Grid>
                    <Grid item xs={4}>
                        <ResponsiveContainer width="100%" height={144}>
                            <PieChart>
                                <Pie
                                    data={PieChartData}
                                    innerRadius={30}
                                    outerRadius={40}
                                    dataKey="value"
                                >
                                    {PieChartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={3} md={4} sm={2} xs={2} sx={{ flexGrow: 1 }}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        解決回数
                    </Grid>
                    <Grid item xs={4}>
                        総勤務時間
                    </Grid>
                    <Grid item xs={4}>
                        &nbsp;good率
                    </Grid>
                </Grid>
            </Grid>
            <UserAchivMoney />
        </>
    );
}
