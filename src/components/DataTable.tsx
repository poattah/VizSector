import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';

export const DataTable = () => {
  const { dataset } = useStore();

  if (!dataset || !dataset.data || dataset.data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-6">
          <p className="text-muted-foreground">No data to display</p>
          <p className="text-sm text-muted-foreground mt-2">Import data to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-auto h-full bg-background">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-r border-border">
              #
            </th>
            {dataset.columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {dataset.data.map((row, idx) => (
            <tr key={idx} className={cn(
              "transition-colors hover:bg-muted/50",
              idx % 2 === 0 ? 'bg-card' : 'bg-muted/20'
            )}>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground font-medium border-r border-border">
                {idx + 1}
              </td>
              {dataset.columns.map((col) => (
                <td key={col} className="px-4 py-3 whitespace-nowrap text-sm text-foreground">
                  {String(row[col] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
