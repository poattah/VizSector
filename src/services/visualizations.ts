import { supabase } from '../lib/supabase';
import type { Inserts, Updates } from '../types/database';
import type { Dataset, ChartConfig } from '../types';

export const visualizationService = {
  // Create a new visualization
  async create(data: {
    title: string;
    description?: string;
    chartConfig: ChartConfig;
    dataset: Dataset;
    isPublic?: boolean;
  }) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const visualization: Inserts<'visualizations'> = {
      user_id: user.data.user.id,
      title: data.title,
      description: data.description || null,
      chart_type: data.chartConfig.type,
      chart_config: data.chartConfig as any,
      dataset: data.dataset as any,
      is_public: data.isPublic || false,
    };

    const { data: created, error } = await supabase
      .from('visualizations')
      .insert(visualization)
      .select()
      .single();

    if (error) throw error;
    return created;
  },

  // Update an existing visualization
  async update(
    id: string,
    updates: {
      title?: string;
      description?: string;
      chartConfig?: ChartConfig;
      dataset?: Dataset;
      isPublic?: boolean;
    }
  ) {
    const updateData: Updates<'visualizations'> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.chartConfig !== undefined) {
      updateData.chart_type = updates.chartConfig.type;
      updateData.chart_config = updates.chartConfig as any;
    }
    if (updates.dataset !== undefined) updateData.dataset = updates.dataset as any;
    if (updates.isPublic !== undefined) updateData.is_public = updates.isPublic;

    const { data, error } = await supabase
      .from('visualizations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a visualization
  async delete(id: string) {
    const { error } = await supabase
      .from('visualizations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get a single visualization
  async get(id: string) {
    const { data, error } = await supabase
      .from('visualizations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get all visualizations for current user
  async getUserVisualizations() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('visualizations')
      .select('*')
      .eq('user_id', user.data.user.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get public visualizations
  async getPublicVisualizations(limit = 20) {
    const { data, error } = await supabase
      .from('visualizations')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Share visualization with another user
  async shareWith(visualizationId: string, email: string, permission: 'view' | 'edit' = 'view') {
    const { data, error } = await supabase
      .from('shared_visualizations')
      .insert({
        visualization_id: visualizationId,
        shared_with_email: email,
        permission,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Remove share access
  async unshare(shareId: string) {
    const { error } = await supabase
      .from('shared_visualizations')
      .delete()
      .eq('id', shareId);

    if (error) throw error;
  },

  // Get shared visualizations
  async getSharedWithMe() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('shared_visualizations')
      .select(`
        *,
        visualizations (*)
      `)
      .eq('shared_with_email', user.data.user.email!);

    if (error) throw error;
    return data;
  },

  // Duplicate a visualization
  async duplicate(id: string) {
    const original = await this.get(id);
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const duplicate: Inserts<'visualizations'> = {
      user_id: user.data.user.id,
      title: `${original.title} (Copy)`,
      description: original.description,
      chart_type: original.chart_type,
      chart_config: original.chart_config,
      dataset: original.dataset,
      is_public: false,
    };

    const { data, error } = await supabase
      .from('visualizations')
      .insert(duplicate)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
