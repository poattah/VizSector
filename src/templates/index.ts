import type { Template } from '../types';

export const templates: Template[] = [
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    description: 'Compare values across categories',
    type: 'bar',
    thumbnail: '📊',
    defaultConfig: {
      type: 'bar',
      title: 'Bar Chart',
      showLegend: true,
      showGrid: true,
    },
  },
  {
    id: 'line-chart',
    name: 'Line Chart',
    description: 'Show trends over time',
    type: 'line',
    thumbnail: '📈',
    defaultConfig: {
      type: 'line',
      title: 'Line Chart',
      showLegend: true,
      showGrid: true,
    },
  },
  {
    id: 'area-chart',
    name: 'Area Chart',
    description: 'Visualize cumulative totals',
    type: 'area',
    thumbnail: '🏔️',
    defaultConfig: {
      type: 'area',
      title: 'Area Chart',
      showLegend: true,
      showGrid: true,
    },
  },
  {
    id: 'pie-chart',
    name: 'Pie Chart',
    description: 'Show proportions of a whole',
    type: 'pie',
    thumbnail: '🥧',
    defaultConfig: {
      type: 'pie',
      title: 'Pie Chart',
      showLegend: true,
      showGrid: false,
    },
  },
  {
    id: 'donut-chart',
    name: 'Donut Chart',
    description: 'Modern pie chart variation',
    type: 'donut',
    thumbnail: '🍩',
    defaultConfig: {
      type: 'donut',
      title: 'Donut Chart',
      showLegend: true,
      showGrid: false,
    },
  },
  {
    id: 'scatter-plot',
    name: 'Scatter Plot',
    description: 'Find correlations between variables',
    type: 'scatter',
    thumbnail: '⚫',
    defaultConfig: {
      type: 'scatter',
      title: 'Scatter Plot',
      showLegend: true,
      showGrid: true,
    },
  },
  {
    id: 'column-chart',
    name: 'Column Chart',
    description: 'Vertical bar chart',
    type: 'column',
    thumbnail: '📊',
    defaultConfig: {
      type: 'column',
      title: 'Column Chart',
      showLegend: true,
      showGrid: true,
    },
  },
  {
    id: 'race-bar',
    name: 'Bar Chart Race',
    description: 'Animated racing bar chart',
    type: 'race-bar',
    thumbnail: '🏁',
    defaultConfig: {
      type: 'race-bar',
      title: 'Bar Chart Race',
      showLegend: false,
      showGrid: true,
      animationEnabled: true,
      animationDuration: 500,
    },
  },
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};
