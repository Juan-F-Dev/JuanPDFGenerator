
import { Artboard } from '../editor/Artboard';

export function Main() {
  return (
    <>
      <main className="flex flex-1 overflow-hidden">
        <aside className="w-80 p-4 shadow-gray-500 shadow-lg shrink-0">
          <h2 className="text-xs font-bold text-slate-800 uppercase mb-4">
            Elementos
          </h2>
          <div className="space-y-2">
            <div className="p-2 bg-slate-50 border border-dashed border-slate-400 rounded cursor-grab hover:bg-slate-100">
              Texto Estático
            </div>
          </div>
        </aside>

        <section className="flex-1 overflow-auto p-10 flex justify-center">
          <Artboard />
        </section>

        <aside className="w-96  border-l border-slate-300 p-4 shadow-sm shrink-0">
          <h2 className="text-xs font-bold text-slate-800 uppercase mb-4">
            Propiedades
          </h2>
          <p className="text-sm text-slate-400 italic">
            Selecciona un elemento para editar
          </p>
        </aside>
      </main>
    </>
  );
}
