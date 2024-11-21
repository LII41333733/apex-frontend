import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';

// Data for the outer radial bar chart
const outerData = [
    { name: 'Category A', value: 80, fill: '#8884d8' },
    { name: 'Category B', value: 70, fill: '#83a6ed' },
    { name: 'Category C', value: 60, fill: '#8dd1e1' },
    { name: 'Category D', value: 50, fill: '#82ca9d' },
];

// Data for the inner radial bar chart
const innerData = [
    { name: 'Subcategory A1', value: 40, fill: '#ffc658' },
    { name: 'Subcategory A2', value: 30, fill: '#ff8042' },
];

const NestedRadialChart = () => {
    return (
        <div style={{ position: 'relative', width: '500px', height: '500px' }}>
            {/* Outer RadialBarChart */}
            <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
                <RadialBarChart
                    width={500}
                    height={500}
                    cx='50%'
                    cy='50%'
                    innerRadius='50%'
                    outerRadius='100%'
                    barSize={10}
                    data={outerData}
                >
                    <RadialBar minAngle={15} clockWise dataKey='value' />
                    <Tooltip />
                    <Legend
                        iconSize={10}
                        layout='horizontal'
                        verticalAlign='bottom'
                        align='center'
                    />
                </RadialBarChart>
            </div>

            {/* Inner RadialBarChart */}
            <div
                style={{
                    position: 'absolute',
                    top: '25%',
                    left: '25%',
                    zIndex: 2,
                }}
            >
                <RadialBarChart
                    width={250}
                    height={250}
                    cx='50%'
                    cy='50%'
                    innerRadius='10%'
                    outerRadius='90%'
                    barSize={10}
                    data={innerData}
                >
                    <RadialBar minAngle={15} clockWise dataKey='value' />
                    <Tooltip />
                </RadialBarChart>
            </div>
        </div>
    );
};

export default NestedRadialChart;
