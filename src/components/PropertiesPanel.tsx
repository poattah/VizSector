import { useState } from 'react';
import { useStore } from '../store/useStore';
import { exportToPNG, exportToSVG, exportToJSON } from '../utils/export';
import { Settings, Download, Palette, Type, Grid, PlayCircle } from 'lucide-react';

export const PropertiesPanel: React.FC = () => {
  const { dataset, chartConfig, updateChartConfig } = useStore();
  const [activeTab, setActiveTab] = useState<'style' | 'data' | 'export'>('style');

  const handleExport = async (format: 'png' | 'svg' | 'json') => {
    try {
      switch (format) {
        case 'png':
          await exportToPNG('chart-container', 'visualization.png');
          break;
        case 'svg':
          exportToSVG('chart-container', 'visualization.svg');
          break;
        case 'json':
          exportToJSON({ dataset, chartConfig }, 'visualization.json');
          break;
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting visualization');
    }
  };

  const colorPresets = [
    ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'],
    ['#1E40AF', '#047857', '#B45309', '#991B1B', '#6B21A8', '#9F1239'],
    ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#F472B6'],
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Settings size={20} />
          Properties
        </h2>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'style'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Style
        </button>
        <button
          onClick={() => setActiveTab('data')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'data'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Data
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'export'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Export
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'style' && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Type size={16} />
                Title
              </label>
              <input
                type="text"
                value={chartConfig.title}
                onChange={(e) => updateChartConfig({ title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Palette size={16} />
                Color Scheme
              </label>
              <div className="space-y-2">
                {colorPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateChartConfig({ colors: preset })}
                    className="w-full flex gap-1 p-2 border border-gray-200 rounded-lg hover:border-blue-500"
                  >
                    {preset.map((color, i) => (
                      <div key={i} className="flex-1 h-8 rounded" style={{ backgroundColor: color }} />
                    ))}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Grid size={16} />
                Display Options
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={chartConfig.showLegend}
                    onChange={(e) => updateChartConfig({ showLegend: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Show Legend</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={chartConfig.showGrid}
                    onChange={(e) => updateChartConfig({ showGrid: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Show Grid</span>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <PlayCircle size={16} />
                Animation
              </label>
              <label className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  checked={chartConfig.animationEnabled}
                  onChange={(e) => updateChartConfig({ animationEnabled: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Enable Animation</span>
              </label>
              {chartConfig.animationEnabled && (
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">
                    Duration: {chartConfig.animationDuration}ms
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="3000"
                    step="100"
                    value={chartConfig.animationDuration}
                    onChange={(e) => updateChartConfig({ animationDuration: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-4">
            {dataset ? (
              <>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Dataset Info</h3>
                  <div className="bg-gray-50 p-3 rounded-lg space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {dataset.name}
                    </p>
                    <p>
                      <span className="font-medium">Rows:</span> {dataset.data.length}
                    </p>
                    <p>
                      <span className="font-medium">Columns:</span> {dataset.columns.length}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">X-Axis</label>
                  <select
                    value={chartConfig.xAxis || ''}
                    onChange={(e) => updateChartConfig({ xAxis: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Auto</option>
                    {dataset.columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Y-Axis</label>
                  <select
                    value={chartConfig.yAxis || ''}
                    onChange={(e) => updateChartConfig({ yAxis: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Auto</option>
                    {dataset.columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">No data loaded</p>
            )}
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Download size={16} />
                Export Options
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleExport('png')}
                  className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-left"
                >
                  Export as PNG
                </button>
                <button
                  onClick={() => handleExport('svg')}
                  className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-left"
                >
                  Export as SVG
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-left"
                >
                  Export as JSON
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
