import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const MiniSparkline = ({ data, color = '#10b981' }) => {
    const chartData = data.map((value, index) => ({ value, index }));

    return (
        <ResponsiveContainer width="100%" height={40}>
            <LineChart data={chartData}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default MiniSparkline;
