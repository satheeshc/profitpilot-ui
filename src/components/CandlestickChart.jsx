import React from 'react';
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
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

    // Prepare data for Recharts
    const processedData = data.map(d => {
        const minBody = Math.min(d.open, d.close);
        const maxBody = Math.max(d.open, d.close);
        // Ensure non-zero range for Recharts to render the bar and give us coordinates
        const epsilon = (d.high - d.low) * 0.001 || 0.01;
        const adjustedMax = maxBody === minBody ? maxBody + epsilon : maxBody;

        return {
            ...d,
            bodyRange: [minBody, adjustedMax],
            minBody,
            maxBody: adjustedMax
        };
    });

    const minValue = Math.min(...data.map(d => d.low));
    const maxValue = Math.max(...data.map(d => d.high));
    const domainPadding = (maxValue - minValue) * 0.1;

    const CustomShape = (props) => {
        const { x, y, width, height, payload } = props;
        const { open, close, high, low, minBody, maxBody } = payload;
        const isRising = close >= open;
        const color = isRising ? '#10b981' : '#ef4444'; // Emerald-500 : Red-500

        // Calculate pixel ratio
        // height corresponds to (maxBody - minBody)
        const range = maxBody - minBody;
        const ratio = range > 0 ? height / range : 0;

        // Calculate wick positions relative to the body
        // y is the top of the body (maxBody)
        // We subtract because SVG Y coordinates go down
        const yHigh = y - (high - maxBody) * ratio;
        const yLow = (y + height) + (minBody - low) * ratio;

        return (
            <g>
                {/* Wick */}
                <line
                    x1={x + width / 2}
                    y1={yHigh}
                    x2={x + width / 2}
                    y2={yLow}
                    stroke={color}
                    strokeWidth={1.5}
                />
                {/* Body */}
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={Math.max(height, 1)} // Ensure at least 1px visibility
                    fill={color}
                    stroke={color}
                />
            </g>
        );
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const d = payload[0].payload;
            const isRising = d.close >= d.open;
            return (
                <div className="glass rounded-lg p-3 border border-slate-200 dark:border-slate-700 shadow-xl bg-white/90 dark:bg-slate-800/90">
                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                        {d.date}
                    </p>
                    <div className="space-y-1 text-xs">
                        <div className="flex justify-between gap-4">
                            <span className="text-slate-500 dark:text-slate-400">Open</span>
                            <span className="font-mono font-medium text-slate-900 dark:text-white">${d.open.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="text-slate-500 dark:text-slate-400">High</span>
                            <span className="font-mono font-medium text-emerald-500">${d.high.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="text-slate-500 dark:text-slate-400">Low</span>
                            <span className="font-mono font-medium text-red-500">${d.low.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="text-slate-500 dark:text-slate-400">Close</span>
                            <span className={`font-mono font-bold ${isRising ? 'text-emerald-500' : 'text-red-500'}`}>
                                ${d.close.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between gap-4 pt-1 border-t border-slate-200 dark:border-slate-700 mt-1">
                            <span className="text-slate-500 dark:text-slate-400">Vol</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300">
                                {(d.volume / 1000000).toFixed(2)}M
                            </span>
                        </div>
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
                    data={processedData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} vertical={false} />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        minTickGap={30}
                    />
                    <YAxis
                        domain={[minValue - domainPadding, maxValue + domainPadding]}
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toFixed(0)}`}
                        width={50}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                    <Bar
                        dataKey="bodyRange"
                        shape={<CustomShape />}
                        isAnimationActive={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CandlestickChart;
