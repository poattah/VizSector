import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import type { Dataset, DataPoint } from '../types';

export const parseCSV = (file: File): Promise<Dataset> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as DataPoint[];
        const columns = results.meta.fields || [];

        resolve({
          id: crypto.randomUUID(),
          name: file.name,
          data,
          columns,
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const parseJSON = (file: File): Promise<Dataset> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const json = JSON.parse(content);

        // Handle both array and object formats
        let data: DataPoint[];
        if (Array.isArray(json)) {
          data = json;
        } else if (json.data && Array.isArray(json.data)) {
          data = json.data;
        } else {
          throw new Error('Invalid JSON format. Expected an array or object with data property.');
        }

        const columns = data.length > 0 ? Object.keys(data[0]) : [];

        resolve({
          id: crypto.randomUUID(),
          name: file.name,
          data,
          columns,
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

export const parseExcel = (file: File): Promise<Dataset> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        const workbook = XLSX.read(content, { type: 'array' });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const data = XLSX.utils.sheet_to_json(worksheet) as DataPoint[];
        const columns = data.length > 0 ? Object.keys(data[0]) : [];

        resolve({
          id: crypto.randomUUID(),
          name: file.name,
          data,
          columns,
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

export const importData = async (file: File): Promise<Dataset> => {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'csv':
      return parseCSV(file);
    case 'json':
      return parseJSON(file);
    case 'xlsx':
    case 'xls':
      return parseExcel(file);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

// Sample data generator for demo purposes
export const generateSampleData = (): Dataset => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data: DataPoint[] = months.map((month) => ({
    month,
    sales: Math.floor(Math.random() * 10000) + 5000,
    expenses: Math.floor(Math.random() * 5000) + 2000,
    profit: Math.floor(Math.random() * 8000) + 1000,
  }));

  return {
    id: crypto.randomUUID(),
    name: 'Sample Data',
    data,
    columns: ['month', 'sales', 'expenses', 'profit'],
  };
};
