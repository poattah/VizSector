import { create } from 'zustand';
import type { Dataset, ChartConfig, ChartType } from '../types';

interface AppState {
  dataset: Dataset | null;
  chartConfig: ChartConfig;
  isAnimating: boolean;
  currentFrame: number;
  selectedTemplate: string | null;

  // Actions
  setDataset: (dataset: Dataset | null) => void;
  updateChartConfig: (config: Partial<ChartConfig>) => void;
  setChartType: (type: ChartType) => void;
  setIsAnimating: (isAnimating: boolean) => void;
  setCurrentFrame: (frame: number | ((prev: number) => number)) => void;
  setSelectedTemplate: (templateId: string | null) => void;
  resetState: () => void;
}

const defaultChartConfig: ChartConfig = {
  type: 'bar',
  title: 'Untitled Visualization',
  colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'],
  showLegend: true,
  showGrid: true,
  animationDuration: 1000,
  animationEnabled: true,
};

export const useStore = create<AppState>((set) => ({
  dataset: null,
  chartConfig: defaultChartConfig,
  isAnimating: false,
  currentFrame: 0,
  selectedTemplate: null,

  setDataset: (dataset) => set({ dataset }),

  updateChartConfig: (config) =>
    set((state) => ({
      chartConfig: { ...state.chartConfig, ...config },
    })),

  setChartType: (type) =>
    set((state) => ({
      chartConfig: { ...state.chartConfig, type },
    })),

  setIsAnimating: (isAnimating) => set({ isAnimating }),

  setCurrentFrame: (frame) =>
    set((state) => ({
      currentFrame: typeof frame === 'function' ? frame(state.currentFrame) : frame,
    })),

  setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),

  resetState: () =>
    set({
      dataset: null,
      chartConfig: defaultChartConfig,
      isAnimating: false,
      currentFrame: 0,
      selectedTemplate: null,
    }),
}));
