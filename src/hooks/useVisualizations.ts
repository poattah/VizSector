import { useState, useEffect } from 'react';
import { visualizationService } from '../services/visualizations';
import type { Visualization } from '../types/database';
import type { Dataset, ChartConfig } from '../types';

export function useVisualizations() {
  const [visualizations, setVisualizations] = useState<Visualization[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVisualizations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await visualizationService.getUserVisualizations();
      setVisualizations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load visualizations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisualizations();
  }, []);

  const createVisualization = async (data: {
    title: string;
    description?: string;
    chartConfig: ChartConfig;
    dataset: Dataset;
    isPublic?: boolean;
  }) => {
    try {
      setError(null);
      const created = await visualizationService.create(data);
      setVisualizations((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create visualization');
      throw err;
    }
  };

  const updateVisualization = async (
    id: string,
    updates: {
      title?: string;
      description?: string;
      chartConfig?: ChartConfig;
      dataset?: Dataset;
      isPublic?: boolean;
    }
  ) => {
    try {
      setError(null);
      const updated = await visualizationService.update(id, updates);
      setVisualizations((prev) =>
        prev.map((v) => (v.id === id ? updated : v))
      );
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update visualization');
      throw err;
    }
  };

  const deleteVisualization = async (id: string) => {
    try {
      setError(null);
      await visualizationService.delete(id);
      setVisualizations((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete visualization');
      throw err;
    }
  };

  const duplicateVisualization = async (id: string) => {
    try {
      setError(null);
      const duplicated = await visualizationService.duplicate(id);
      setVisualizations((prev) => [duplicated, ...prev]);
      return duplicated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate visualization');
      throw err;
    }
  };

  return {
    visualizations,
    loading,
    error,
    loadVisualizations,
    createVisualization,
    updateVisualization,
    deleteVisualization,
    duplicateVisualization,
  };
}

export function useVisualization(id: string | null) {
  const [visualization, setVisualization] = useState<Visualization | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadVisualization = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await visualizationService.get(id);
        setVisualization(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load visualization');
      } finally {
        setLoading(false);
      }
    };

    loadVisualization();
  }, [id]);

  return { visualization, loading, error };
}
