import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useVisualizations } from '../hooks/useVisualizations';
import { useStore } from '../store/useStore';
import {
  FolderOpen,
  Plus,
  Save,
  Trash2,
  Copy,
  Clock,
  Globe,
  Lock,
} from 'lucide-react';
import type { Visualization } from '../types/database';

export const ProjectsPanel = () => {
  const { isAuthenticated } = useAuth();
  const { dataset, chartConfig } = useStore();
  const {
    visualizations,
    loading,
    createVisualization,
    updateVisualization,
    deleteVisualization,
    duplicateVisualization,
  } = useVisualizations();

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveTitle, setSaveTitle] = useState('');
  const [saveDescription, setSaveDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [currentVizId, setCurrentVizId] = useState<string | null>(null);

  const handleSave = async () => {
    if (!dataset) {
      alert('No data to save');
      return;
    }

    try {
      const title = saveTitle || chartConfig.title || 'Untitled Visualization';

      if (currentVizId) {
        // Update existing
        await updateVisualization(currentVizId, {
          title,
          description: saveDescription,
          chartConfig,
          dataset,
          isPublic,
        });
      } else {
        // Create new
        const created = await createVisualization({
          title,
          description: saveDescription,
          chartConfig,
          dataset,
          isPublic,
        });
        setCurrentVizId(created.id);
      }

      setShowSaveDialog(false);
      setSaveTitle('');
      setSaveDescription('');
    } catch (err) {
      console.error('Failed to save visualization:', err);
      alert('Failed to save visualization');
    }
  };

  const handleLoad = (viz: Visualization) => {
    const { setDataset, updateChartConfig } = useStore.getState();

    setDataset({
      id: viz.id,
      name: viz.title,
      data: viz.dataset as any,
      columns: Object.keys((viz.dataset as any)[0] || {}),
    });

    updateChartConfig(viz.chart_config as any);
    setCurrentVizId(viz.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this visualization?')) return;

    try {
      await deleteVisualization(id);
      if (currentVizId === id) {
        setCurrentVizId(null);
      }
    } catch (err) {
      console.error('Failed to delete visualization:', err);
      alert('Failed to delete visualization');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await duplicateVisualization(id);
    } catch (err) {
      console.error('Failed to duplicate visualization:', err);
      alert('Failed to duplicate visualization');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-80 bg-card border-l border-border flex flex-col h-full p-6">
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen size={20} />
          <h2 className="text-lg font-semibold">My Projects</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
          <div>
            <p className="mb-2">Sign in to save and manage your visualizations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-80 bg-card border-l border-border flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FolderOpen size={20} />
              <h2 className="text-lg font-semibold">My Projects</h2>
            </div>
            <button
              onClick={() => setShowSaveDialog(true)}
              className="p-2 hover:bg-muted rounded-lg transition"
              title="Save current visualization"
            >
              <Save size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center text-muted-foreground py-8">Loading...</div>
          ) : visualizations.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p className="mb-4">No saved visualizations yet</p>
              <button
                onClick={() => setShowSaveDialog(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                <Plus size={18} />
                Create First Project
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {visualizations.map((viz) => (
                <div
                  key={viz.id}
                  className={`p-3 border rounded-lg transition cursor-pointer hover:border-primary/50 ${
                    currentVizId === viz.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => handleLoad(viz)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{viz.title}</h3>
                      {viz.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {viz.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(viz.updated_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          {viz.is_public ? (
                            <>
                              <Globe size={12} />
                              Public
                            </>
                          ) : (
                            <>
                              <Lock size={12} />
                              Private
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDuplicate(viz.id)}
                        className="p-1.5 hover:bg-muted rounded transition"
                        title="Duplicate"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(viz.id)}
                        className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded transition"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold">
                {currentVizId ? 'Update Visualization' : 'Save Visualization'}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder={chartConfig.title}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description (optional)</label>
                <textarea
                  value={saveDescription}
                  onChange={(e) => setSaveDescription(e.target.value)}
                  placeholder="Describe your visualization..."
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Make this visualization public</span>
                </label>
              </div>
            </div>
            <div className="p-6 border-t border-border flex gap-3 justify-end">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 border border-input rounded-lg hover:bg-muted transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
              >
                {currentVizId ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
