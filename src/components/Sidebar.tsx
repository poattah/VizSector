import { useRef } from 'react';
import { useStore } from '../store/useStore';
import { templates } from '../templates';
import { importData, generateSampleData } from '../utils/dataImport';
import { Upload, Table } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { setDataset, setSelectedTemplate, updateChartConfig } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const dataset = await importData(file);
      setDataset(dataset);
    } catch (error) {
      console.error('Error importing file:', error);
      alert('Error importing file. Please check the file format.');
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      updateChartConfig({
        ...template.defaultConfig,
        title: template.name,
      });
    }
  };

  const loadSampleData = () => {
    const sampleDataset = generateSampleData();
    setDataset(sampleDataset);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">VizSector</h1>
        <p className="text-sm text-gray-500">Data Visualization Studio</p>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Data</h2>
        <div className="space-y-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Upload size={16} />
            Import Data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,.xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={loadSampleData}
            className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <Table size={16} />
            Load Sample Data
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Templates</h2>
        <div className="space-y-2">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{template.thumbnail}</span>
                <div>
                  <h3 className="font-medium text-gray-800 group-hover:text-blue-600">
                    {template.name}
                  </h3>
                  <p className="text-xs text-gray-500">{template.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
        <p>© 2025 VizSector</p>
        <p>Flourish Studio Clone</p>
      </div>
    </div>
  );
};
