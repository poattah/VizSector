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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  FunnelChart,
  Funnel,
  LabelList,
} from 'recharts';
import { useStore } from '../store/useStore';
import type { DataPoint } from '../types';
import { EconomistChartWrapper } from './EconomistChartWrapper';
import { EconomistPalettes, EconomistColors } from '../styles/economist-theme';

export const ChartRenderer: React.FC = () => {
  const { dataset, chartConfig } = useStore();

  if (!dataset || !dataset.data || dataset.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-lg text-foreground">No data loaded</p>
          <p className="text-sm">Import a dataset to get started</p>
        </div>
      </div>
    );
  }

  const {
    type,
    xAxis,
    yAxis,
    colors,
    showLegend,
    showGrid,
    title,
    subtitle,
    dataSource,
    economistMode,
    economistPalette = 'classicEconomist',
  } = chartConfig;
  const data = dataset.data;

  // Use Economist palette if in Economist mode
  const chartColors = economistMode && economistPalette
    ? EconomistPalettes[economistPalette]
    : colors;

  // Grid styling for Economist mode
  const gridColor = economistMode ? EconomistColors.grey.gridline : undefined;
  const gridOpacity = economistMode ? 0.3 : undefined;

  const renderChart = () => {
    switch (type) {
      case 'bar':
      case 'column':
        return (
          <BarChart data={data}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="0"
                stroke={gridColor}
                opacity={gridOpacity}
              />
            )}
            <XAxis dataKey={xAxis || dataset.columns[0]} />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataset.columns.slice(1).map((col, idx) => (
              <Bar
                key={col}
                dataKey={col}
                fill={chartColors[idx % chartColors.length]}
                animationDuration={chartConfig.animationDuration}
              />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="0"
                stroke={gridColor}
                opacity={gridOpacity}
              />
            )}
            <XAxis dataKey={xAxis || dataset.columns[0]} />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataset.columns.slice(1).map((col, idx) => (
              <Line
                key={col}
                type="monotone"
                dataKey={col}
                stroke={chartColors[idx % chartColors.length]}
                strokeWidth={economistMode ? 2.5 : 2}
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

      case 'stacked-bar':
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
                stackId="a"
                fill={colors[idx % colors.length]}
                animationDuration={chartConfig.animationDuration}
              />
            ))}
          </BarChart>
        );

      case 'stacked-area':
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
                stackId="1"
                fill={colors[idx % colors.length]}
                stroke={colors[idx % colors.length]}
                animationDuration={chartConfig.animationDuration}
              />
            ))}
          </AreaChart>
        );

      case 'radar':
        return (
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xAxis || dataset.columns[0]} />
            <PolarRadiusAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataset.columns.slice(1).map((col, idx) => (
              <Radar
                key={col}
                name={col}
                dataKey={col}
                stroke={colors[idx % colors.length]}
                fill={colors[idx % colors.length]}
                fillOpacity={0.6}
                animationDuration={chartConfig.animationDuration}
              />
            ))}
          </RadarChart>
        );

      case 'treemap':
        const treemapData = data.map((row: DataPoint) => ({
          name: row[dataset.columns[0]] as string,
          size: Number(row[dataset.columns[1]]) || 0,
        }));

        return (
          <Treemap
            data={treemapData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#fff"
            fill="#8884d8"
            animationDuration={chartConfig.animationDuration}
          >
            {treemapData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Treemap>
        );

      case 'radial-bar':
        const radialData = data.map((row: DataPoint) => ({
          name: row[dataset.columns[0]] as string,
          value: Number(row[dataset.columns[1]]) || 0,
          fill: colors[data.indexOf(row) % colors.length],
        }));

        return (
          <RadialBarChart
            innerRadius="10%"
            outerRadius="80%"
            data={radialData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background
              dataKey="value"
              animationDuration={chartConfig.animationDuration}
            />
            <Tooltip />
            {showLegend && <Legend iconSize={10} layout="vertical" verticalAlign="middle" />}
          </RadialBarChart>
        );

      case 'bubble':
        return (
          <ScatterChart>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxis || dataset.columns[0]} type="number" />
            <YAxis dataKey={yAxis || dataset.columns[1]} type="number" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            {showLegend && <Legend />}
            <Scatter
              name="Bubble Data"
              data={data}
              fill={colors[0]}
              animationDuration={chartConfig.animationDuration}
            />
          </ScatterChart>
        );

      case 'composed':
        return (
          <ComposedChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xAxis || dataset.columns[0]} />
            <YAxis />
            <Tooltip />
            {showLegend && <Legend />}
            {dataset.columns.slice(1).map((col, idx) => {
              const type = idx % 3;
              if (type === 0) {
                return (
                  <Bar
                    key={col}
                    dataKey={col}
                    fill={colors[idx % colors.length]}
                    animationDuration={chartConfig.animationDuration}
                  />
                );
              } else if (type === 1) {
                return (
                  <Line
                    key={col}
                    type="monotone"
                    dataKey={col}
                    stroke={colors[idx % colors.length]}
                    strokeWidth={2}
                    animationDuration={chartConfig.animationDuration}
                  />
                );
              } else {
                return (
                  <Area
                    key={col}
                    type="monotone"
                    dataKey={col}
                    fill={colors[idx % colors.length]}
                    stroke={colors[idx % colors.length]}
                    animationDuration={chartConfig.animationDuration}
                  />
                );
              }
            })}
          </ComposedChart>
        );

      case 'funnel':
        const funnelData = data.map((row: DataPoint, idx: number) => ({
          name: row[dataset.columns[0]] as string,
          value: Number(row[dataset.columns[1]]) || 0,
          fill: colors[idx % colors.length],
        }));

        return (
          <FunnelChart>
            <Tooltip />
            <Funnel
              dataKey="value"
              data={funnelData}
              isAnimationActive={chartConfig.animationEnabled}
              animationDuration={chartConfig.animationDuration}
            >
              <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        );

      case 'race-bar':
        // Racing bar chart implementation with animation
        return (
          <BarChart data={data} layout="horizontal">
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis type="number" />
            <YAxis dataKey={xAxis || dataset.columns[0]} type="category" />
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

      default:
        return (
          <div className="text-center text-muted-foreground p-8 animate-fade-in">
            <p className="text-lg font-medium text-foreground">Chart type "{type}" is not yet implemented</p>
            <p className="text-sm mt-2">Please select a different chart type</p>
          </div>
        );
    }
  };

  return (
    <EconomistChartWrapper
      title={title}
      subtitle={subtitle}
      dataSource={dataSource}
      economistMode={economistMode}
    >
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </EconomistChartWrapper>
  );
};
