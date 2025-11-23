import React from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const CandlestickChart = ({ data, height = 400 }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 text-slate-500 dark:text-slate-400">
                No candlestick data available
            </div>
        );
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="glass rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                        {data.date}
                    </p>
                    <div className="space-y-1 text-xs">
                        <p className="text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Open:</span> ${data.open?.toFixed(2)}
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                            <span className="font-medium">High:</span> ${data.high?.toFixed(2)}
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Low:</span> ${data.low?.toFixed(2)}
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Close:</span> ${data.close?.toFixed(2)}
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                            <span className="font-medium">Volume:</span> {(data.volume / 1000000).toFixed(2)}M
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full" style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                    />
                    <YAxis
                        yAxisId="price"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <YAxis
                        yAxisId="volume"
                        orientation="right"
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickLine={false}
                        tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        yAxisId="volume"
                        dataKey="volume"
                        fill="#64748b"
                        opacity={0.3}
                        name="Volume"
                    />
                    <Line
                        yAxisId="price"
                        type="monotone"
                        dataKey="high"
                        stroke="#10b981"
                        strokeWidth={1}
                        dot={false}
                        name="High"
                    />
                    <Line
                        yAxisId="price"
                        type="monotone"
                        dataKey="low"
                        stroke="#ef4444"
                        strokeWidth={1}
                        dot={false}
                        name="Low"
                    />
                    <Line
                        yAxisId="price"
                        type="monotone"
                        dataKey="close"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        name="Close"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CandlestickChart;
