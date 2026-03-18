//src/editor/Artboard.tsx
import { useRef } from 'react';
import { useReportStore } from '../store/useReportStore';
import { pxToMm, mmToPx } from '../utils/coords';
import type { TextElement } from '../interfaces/interfaces';

export const Artboard = () => {
  // Dimensiones físicas A4
  const widthMm = 210;
  const heightMm = 297;

  const artboardRef = useRef<HTMLDivElement>(null);

  // Consumimos el store
  const elements = useReportStore((state) => state.report.elements);
  const addElement = useReportStore((state) => state.addElement);
  const selectedId = useReportStore((state) => state.selectedElementId);
  const selectElement = useReportStore((state) => state.selectElement);

  // --- Manejador de Click en el Lienzo ---

  const handleArtboardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Verificamos que el click sea exactamente en el div del Artboard y no en sus hijos
    if (e.target === e.currentTarget) {
      // 1. Si ya hay algo seleccionado, el primer click en el fondo SOLO deselecciona
      if (selectedId !== null) {
        selectElement(null);
        return; // Salimos de la función aquí
      }

      // 2. Si NO hay nada seleccionado, entonces procedemos a crear un elemento nuevo
      const rect = artboardRef.current?.getBoundingClientRect();
      if (!rect) return;

      const xMm = pxToMm(e.clientX - rect.left);
      const yMm = pxToMm(e.clientY - rect.top);

      const newText: TextElement = {
        id: `txt_${Date.now()}`,
        type: 'text',
        x: xMm,
        y: yMm,
        width: 50,
        height: 10,
        content: `Nuevo Texto (${xMm}mm, ${yMm}mm)`,
        style: { font: 'Arial', size: 12, weight: '' }
      };

      addElement(newText);
    }
  };

  return (
    <div
      ref={artboardRef}
      className="bg-white artboard-shadow relative origin-top cursor-crosshair overflow-hidden"
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        minWidth: `${widthMm}mm`,
        minHeight: `${heightMm}mm`
      }}
      onClick={handleArtboardClick}
    >
      {/* --- RENDERIZADO DE ELEMENTOS --- */}
      {elements.map((el) => {
        // Estilo visual basado en MM convertidos a PX
        const style: React.CSSProperties = {
          position: 'absolute',
          left: `${mmToPx(el.x)}px`,
          top: `${mmToPx(el.y)}px`,
          width: `${mmToPx(el.width)}px`,
          height: `${mmToPx(el.height)}px`,
          fontFamily: el.style.font,
          fontSize: `${mmToPx(el.style.size / 2.83)}px`, // FPDF usa pt, convertimos a px visuales aproximados
          fontWeight: el.style.weight === 'B' ? 'bold' : 'normal',
          fontStyle: el.style.weight === 'I' ? 'italic' : 'normal'
        };

        const isSelected = el.id === selectedId;

        return (
          <div
            key={el.id}
            style={style}
            className={`border cursor-pointer select-none px-1 flex items-center
              ${isSelected ? 'border-blue-600 border-2 ring-2 ring-blue-200 bg-blue-50' : 'border-slate-300 border-dashed hover:border-slate-500 bg-white/70'}`}
            onClick={(e) => {
              e.stopPropagation(); // Evitamos que el click llegue al artboard
              selectElement(el.id);
            }}
          >
            {el.content}
          </div>
        );
      })}

      {/* Placeholder visual */}
      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-300 pointer-events-none select-none">
          Click para agregar texto
        </div>
      )}
    </div>
  );
};
