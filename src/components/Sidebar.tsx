import { useRef, useState } from 'react';
import { useStore } from '../store/useStore';
import { templates } from '../templates';
import { importData, generateSampleData } from '../utils/dataImport';
import { Upload, Table, Sparkles, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from './auth/AuthModal';
import { UserMenu } from './UserMenu';
import { ThemeToggle } from './ThemeToggle';

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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-foreground tracking-tight">VizSector</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  variant="outline"
                  size="sm"
                  className="gap-2 hover-glow"
                >
                  <LogIn size={16} />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Professional data visualization platform</p>
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
        <h2 className="text-sm font-semibold text-foreground mb-3 px-1">Templates</h2>
        <div className="space-y-1">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={cn(
                "w-full text-left rounded-lg border border-transparent",
                "hover:border-border hover:bg-accent/5 transition-all duration-200",
                "group p-3 flex items-center gap-3"
              )}
            >
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                {template.thumbnail}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  {template.name}
                </h3>
                <p className="text-xs text-muted-foreground truncate">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2025 VizSector</span>
          <span className="text-primary">v1.0</span>
        </div>
      </div>
    </div>

    <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
  </>
  );
};
