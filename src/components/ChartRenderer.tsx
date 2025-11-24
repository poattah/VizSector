import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useStore } from '../store/useStore';
import type { DataPoint } from '../types';

export const ChartRenderer: React.FC = () => {
  const { dataset, chartConfig } = useStore();

  if (!dataset || !dataset.data || dataset.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg">No data loaded</p>
          <p className="text-sm">Import a dataset to get started</p>
        </div>
      </div>
    );
  }

  const { type, xAxis, yAxis, colors, showLegend, showGrid, title } = chartConfig;
  const data = dataset.data;

  const renderChart = () => {
    switch (type) {
      case 'bar':
      case 'column':
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxis || dataset.columns[0]} />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataset.columns.slice(1).map((col, idx) => (
              <Bar
                key={col}
                dataKey={col}
                fill={colors[idx % colors.length]}
                animationDuration={chartConfig.animationDuration}
              />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxis || dataset.columns[0]} />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataset.columns.slice(1).map((col, idx) => (
              <Line
                key={col}
                type="monotone"
                dataKey={col}
                stroke={colors[idx % colors.length]}
                strokeWidth={2}
                animationDuration={chartConfig.animationDuration}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxis || dataset.columns[0]} />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataset.columns.slice(1).map((col, idx) => (
              <Area
                key={col}
                type="monotone"
                dataKey={col}
                fill={colors[idx % colors.length]}
                stroke={colors[idx % colors.length]}
                animationDuration={chartConfig.animationDuration}
              />
            ))}
          </AreaChart>
        );

      case 'pie':
      case 'donut':
        const pieData = data.map((row: DataPoint) => ({
          name: row[dataset.columns[0]] as string,
          value: Number(row[dataset.columns[1]]) || 0,
        }));

        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={type === 'donut' ? 120 : 150}
              innerRadius={type === 'donut' ? 80 : 0}
              fill="#8884d8"
              dataKey="value"
              animationDuration={chartConfig.animationDuration}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            {showLegend && <Legend />}
            <Tooltip />
          </PieChart>
        );

      case 'scatter':
        return (
          <ScatterChart>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxis || dataset.columns[0]} type="number" />
            <YAxis dataKey={yAxis || dataset.columns[1]} type="number" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            {showLegend && <Legend />}
            <Scatter
              name="Data"
              data={data}
              fill={colors[0]}
              animationDuration={chartConfig.animationDuration}
            />
          </ScatterChart>
        );

      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};
