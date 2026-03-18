import { useReportStore } from '../store/useReportStore';

export const Inspector = () => {
  const selectedId = useReportStore((state) => state.selectedElementId);
  const elements = useReportStore((state) => state.report.elements);
  const updateElement = useReportStore((state) => state.updateElement);

  const element = elements.find((el) => el.id === selectedId);

  if (!element) {
    return (
      <aside className="w-96 bg-white border-l border-slate-300 p-4 shadow-sm shrink-0">
        <h2 className="text-xs font-bold text-slate-500 uppercase mb-4">
          Propiedades
        </h2>
        <div className="text-center py-20 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-400 italic">
            Selecciona un elemento para editar
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-96 bg-white border-l border-slate-300 p-4 shadow-sm shrink-0 space-y-4 overflow-auto">
      <h2 className="text-xs font-bold text-slate-500 uppercase">
        Propiedades de Texto
      </h2>

      {/* --- Coordenadas --- */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">X (mm)</label>
          <input
            type="number"
            value={element.x}
            onChange={(e) =>
              updateElement(element.id, { x: Number(e.target.value) })
            }
            className="w-full bg-slate-50 border border-slate-300 px-2 py-1 rounded font-mono text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Y (mm)</label>
          <input
            type="number"
            value={element.y}
            onChange={(e) =>
              updateElement(element.id, { y: Number(e.target.value) })
            }
            className="w-full bg-slate-50 border border-slate-300 px-2 py-1 rounded font-mono text-sm"
          />
        </div>
      </div>

      {/* --- Contenido --- */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-600">Contenido</label>
        <textarea
          value={element.content}
          onChange={(e) =>
            updateElement(element.id, { content: e.target.value })
          }
          className="w-full text-sm p-2 bg-slate-50 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-blue-500"
          rows={4}
        />
      </div>

      {/* --- Estilo Rápido (Negrita) --- */}
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            updateElement(element.id, {
              style: {
                ...element.style,
                weight: element.style.weight === 'B' ? '' : 'B'
              }
            })
          }
          className={`px-3 py-1 border rounded font-bold ${element.style.weight === 'B' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          B
        </button>
      </div>
    </aside>
  );
};
