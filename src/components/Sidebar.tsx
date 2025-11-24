import { useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import { templates } from '../templates';
import { importData, generateSampleData } from '../utils/dataImport';
import { Upload, Table, Sparkles, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from './auth/AuthModal';
import { UserMenu } from './UserMenu';

export const Sidebar: React.FC = () => {
  const { setDataset, setSelectedTemplate, updateChartConfig } = useStore();
  const { isAuthenticated } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

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
    <>
      <div className="w-80 bg-card border-r border-border flex flex-col h-full">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">VizSector</h1>
            </div>
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <LogIn size={16} />
                Sign In
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Data Visualization Studio</p>
        </div>

      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground mb-3">Data</h2>
        <div className="space-y-2">
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full justify-start gap-2"
          >
            <Upload size={16} />
            Import Data
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json,.xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={loadSampleData}
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <Table size={16} />
            Load Sample Data
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Templates</h2>
        <div className="space-y-2">
          {templates.map((template) => (
            <Card
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md hover:border-primary/50",
                "group"
              )}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{template.thumbnail}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">{template.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border text-xs text-muted-foreground">
        <p>© 2025 VizSector</p>
        <p className="text-primary/70">Flourish Studio Clone</p>
      </div>
    </div>

    <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
  </>
  );
};
