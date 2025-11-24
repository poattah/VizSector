import { useStore } from '../store/useStore';

export const DataTable = () => {
  const { dataset } = useStore();

  if (!dataset || !dataset.data || dataset.data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <div className="overflow-auto h-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            {dataset.columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dataset.data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{idx + 1}</td>
              {dataset.columns.map((col) => (
                <td key={col} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
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
