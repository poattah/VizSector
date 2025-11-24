export interface DataPoint {
  [key: string]: string | number | null;
}

export interface Dataset {
  id: string;
  name: string;
  data: DataPoint[];
  columns: string[];
}

export type ChartType =
  | 'bar'
  | 'line'
  | 'scatter'
  | 'pie'
  | 'area'
  | 'donut'
  | 'column'
  | 'race-bar'
  | 'bubble'
  | 'radar'
  | 'treemap'
  | 'composed'
  | 'stacked-bar'
  | 'stacked-area'
  | 'radial-bar'
  | 'funnel';

export interface Annotation {
  id: string;
  x: number | string;
  y: number | string;
  text: string;
  color?: string;
  fontSize?: number;
}

export interface ChartConfig {
  type: ChartType;
  title: string;
  subtitle?: string;
  dataSource?: string;
  xAxis?: string;
  yAxis?: string;
  category?: string;
  value?: string;
  colors: string[];
  showLegend: boolean;
  showGrid: boolean;
  animationDuration: number;
  animationEnabled: boolean;
  // Economist-specific features
  economistMode?: boolean;
  economistPalette?: 'bluesMonochrome' | 'multiSeries' | 'greysMonochrome' | 'diverging' | 'classicEconomist';
  annotations?: Annotation[];
}

export interface VisualizationState {
  dataset: Dataset | null;
  chartConfig: ChartConfig;
  isAnimating: boolean;
  currentFrame: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  type: ChartType;
  thumbnail: string;
  defaultConfig: Partial<ChartConfig>;
}
