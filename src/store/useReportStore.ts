import { create } from 'zustand';
import type { TextElement } from '../interfaces/interfaces'

export type ReportElement = TextElement;

interface ReportState {
  report: {
    metadata: { pageSize: string; orientation: 'P' | 'L' };
    elements: ReportElement[];
  };
  selectedElementId: string | null;
  addElement: (el: ReportElement) => void;
  selectElement: (id: string | null) => void;
  updateElement: (id: string, newData: Partial<ReportElement>) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  report: {
    metadata: { pageSize: 'A4', orientation: 'P' },
    elements: [],
  },
  selectedElementId: null,
  addElement: (el) => set((state) => ({
    report: { ...state.report, elements: [...state.report.elements, el] },
    selectedElementId: el.id
  })),
  selectElement: (id) => set({ selectedElementId: id }),
  updateElement: (id, newData) => set((state) => ({
    report: {
      ...state.report,
      elements: state.report.elements.map((el) =>
        el.id === id ? { ...el, ...newData } : el
      )
    }
  })),
}));
