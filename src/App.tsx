import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChartRenderer } from './components/ChartRenderer';
import { DataTable } from './components/DataTable';
import { PropertiesPanel } from './components/PropertiesPanel';
import { AnimationController } from './components/AnimationController';
import { BarChart3, Table2 } from 'lucide-react';
import { Button } from './components/ui/button';
import { cn } from './lib/utils';

function App() {
  const [activeView, setActiveView] = useState<'chart' | 'data'>('chart');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className="bg-card border-b border-border px-6 py-3 shadow-sm">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveView('chart')}
              variant={activeView === 'chart' ? 'default' : 'outline'}
              className={cn("gap-2")}
            >
              <BarChart3 size={18} />
              Visualization
            </Button>
            <Button
              onClick={() => setActiveView('data')}
              variant={activeView === 'data' ? 'default' : 'outline'}
              className={cn("gap-2")}
            >
              <Table2 size={18} />
              Data
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-muted/30" id="chart-container">
          {activeView === 'chart' ? <ChartRenderer /> : <DataTable />}
        </div>

        {activeView === 'chart' && <AnimationController />}
      </div>

      <PropertiesPanel />
    </div>
  );
}

export default App;
