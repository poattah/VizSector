import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChartRenderer } from './components/ChartRenderer';
import { DataTable } from './components/DataTable';
import { PropertiesPanel } from './components/PropertiesPanel';
import { AnimationController } from './components/AnimationController';
import { BarChart3, Table2 } from 'lucide-react';

function App() {
  const [activeView, setActiveView] = useState<'chart' | 'data'>('chart');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('chart')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                activeView === 'chart'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BarChart3 size={18} />
              Visualization
            </button>
            <button
              onClick={() => setActiveView('data')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                activeView === 'data'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Table2 size={18} />
              Data
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden" id="chart-container">
          {activeView === 'chart' ? <ChartRenderer /> : <DataTable />}
        </div>

        {activeView === 'chart' && <AnimationController />}
      </div>

      <PropertiesPanel />
    </div>
  );
}

export default App;
