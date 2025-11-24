import { useState } from 'react';
import { useStore } from '../store/useStore';
import { exportToPNG, exportToSVG, exportToJSON } from '../utils/export';
import { Settings, Download, Palette, Type, Grid, PlayCircle, Newspaper } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select } from './ui/select';
import { Slider } from './ui/slider';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';
import { EconomistPalettes } from '../styles/economist-theme';

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
    <div className="w-80 bg-card border-l border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Settings size={20} />
          Properties
        </h2>
      </div>

      <div className="flex border-b border-border bg-muted/30">
        <button
          onClick={() => setActiveTab('style')}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium transition-all duration-200",
            activeTab === 'style'
              ? 'text-primary border-b-2 border-primary bg-background'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          Style
        </button>
        <button
          onClick={() => setActiveTab('data')}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium transition-all duration-200",
            activeTab === 'data'
              ? 'text-primary border-b-2 border-primary bg-background'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          Data
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={cn(
            "flex-1 px-4 py-3 text-sm font-medium transition-all duration-200",
            activeTab === 'export'
              ? 'text-primary border-b-2 border-primary bg-background'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          Export
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'style' && (
          <div className="space-y-6">
            {/* The Economist Mode */}
            <div className="space-y-3 p-4 bg-muted/20 rounded-lg border border-border">
              <Label className="flex items-center gap-2 text-foreground font-semibold">
                <Newspaper size={16} className="text-[#E3120B]" />
                The Economist Style
              </Label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={chartConfig.economistMode || false}
                  onChange={(e) => updateChartConfig({ economistMode: e.target.checked })}
                />
                <span className="text-sm text-foreground">Enable Economist Mode</span>
              </label>
              <p className="text-xs text-muted-foreground">
                Apply The Economist's signature visual style with red branding, clean typography, and professional aesthetics
              </p>

              {chartConfig.economistMode && (
                <>
                  <div className="space-y-2 pt-2">
                    <Label className="text-sm">Subtitle</Label>
                    <Input
                      type="text"
                      value={chartConfig.subtitle || ''}
                      onChange={(e) => updateChartConfig({ subtitle: e.target.value })}
                      placeholder="Add descriptive subtitle"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Data Source</Label>
                    <Input
                      type="text"
                      value={chartConfig.dataSource || ''}
                      onChange={(e) => updateChartConfig({ dataSource: e.target.value })}
                      placeholder="e.g., World Bank, 2024"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Color Palette</Label>
                    <Select
                      value={chartConfig.economistPalette || 'classicEconomist'}
                      onChange={(e) => updateChartConfig({ economistPalette: e.target.value as any })}
                    >
                      <option value="classicEconomist">Classic Economist (Red + Blues)</option>
                      <option value="bluesMonochrome">Blues Monochrome</option>
                      <option value="multiSeries">Multi-Series</option>
                      <option value="greysMonochrome">Greys Monochrome</option>
                      <option value="diverging">Diverging</option>
                    </Select>
                  </div>

                  <div className="flex gap-1 pt-2">
                    {Object.entries(EconomistPalettes).map(([name, colors]) => (
                      name === chartConfig.economistPalette && (
                        <div key={name} className="flex gap-0.5 flex-1">
                          {colors.map((color, i) => (
                            <div
                              key={i}
                              className="flex-1 h-6 rounded-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      )
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Type size={16} />
                Title
              </Label>
              <Input
                type="text"
                value={chartConfig.title}
                onChange={(e) => updateChartConfig({ title: e.target.value })}
                placeholder="Enter chart title"
              />
            </div>

            {!chartConfig.economistMode && (
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-foreground">
                  <Palette size={16} />
                  Color Scheme
                </Label>
              <div className="space-y-2">
                {colorPresets.map((preset, idx) => (
                  <Card
                    key={idx}
                    onClick={() => updateChartConfig({ colors: preset })}
                    className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 hover-glow"
                  >
                    <CardContent className="p-2">
                      <div className="flex gap-1">
                        {preset.map((color, i) => (
                          <div key={i} className="flex-1 h-8 rounded-sm transition-transform hover:scale-105" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              </div>
            )}

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-foreground">
                <Grid size={16} />
                Display Options
              </Label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={chartConfig.showLegend}
                    onChange={(e) => updateChartConfig({ showLegend: e.target.checked })}
                  />
                  <span className="text-sm text-foreground">Show Legend</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={chartConfig.showGrid}
                    onChange={(e) => updateChartConfig({ showGrid: e.target.checked })}
                  />
                  <span className="text-sm text-foreground">Show Grid</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-foreground">
                <PlayCircle size={16} />
                Animation
              </Label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={chartConfig.animationEnabled}
                  onChange={(e) => updateChartConfig({ animationEnabled: e.target.checked })}
                />
                <span className="text-sm text-foreground">Enable Animation</span>
              </label>
              {chartConfig.animationEnabled && (
                <div className="space-y-2 pt-2">
                  <Label className="text-xs text-muted-foreground">
                    Duration: {chartConfig.animationDuration}ms
                  </Label>
                  <Slider
                    min={100}
                    max={3000}
                    step={100}
                    value={chartConfig.animationDuration}
                    onChange={(e) => updateChartConfig({ animationDuration: Number(e.target.value) })}
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
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-foreground">Dataset Info</h3>
                  <Card>
                    <CardContent className="p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium text-foreground">{dataset.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rows:</span>
                        <span className="font-medium text-foreground">{dataset.data.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Columns:</span>
                        <span className="font-medium text-foreground">{dataset.columns.length}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  <Label>X-Axis</Label>
                  <Select
                    value={chartConfig.xAxis || ''}
                    onChange={(e) => updateChartConfig({ xAxis: e.target.value })}
                  >
                    <option value="">Auto</option>
                    {dataset.columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Y-Axis</Label>
                  <Select
                    value={chartConfig.yAxis || ''}
                    onChange={(e) => updateChartConfig({ yAxis: e.target.value })}
                  >
                    <option value="">Auto</option>
                    {dataset.columns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </Select>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No data loaded</p>
            )}
          </div>
        )}

        {activeTab === 'export' && (
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                <Download size={16} />
                Export Options
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={() => handleExport('png')}
                  className="w-full justify-start"
                >
                  Export as PNG
                </Button>
                <Button
                  onClick={() => handleExport('svg')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  Export as SVG
                </Button>
                <Button
                  onClick={() => handleExport('json')}
                  variant="secondary"
                  className="w-full justify-start"
                >
                  Export as JSON
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
