import { create } from 'zustand';

interface ReportElement {
  id: string;
  type: 'text' | 'image' | 'table';
  x: number; // Siempre en mm
  y: number; // Siempre en mm
  content?: string;
}

interface ReportState {
  report: {
    metadata: { pageSize: string; orientation: 'P' | 'L' };
    elements: ReportElement[];
  };
  addElement: (el: ReportElement) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  report: {
    metadata: { pageSize: 'A4', orientation: 'P' },
    elements: [],
  },
  addElement: (el) => set((state) => ({
    report: { ...state.report, elements: [...state.report.elements, el] }
  })),
}));
