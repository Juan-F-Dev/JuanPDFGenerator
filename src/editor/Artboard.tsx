// src/editor/Artboard.tsx
export const Artboard = () => {
  // Dimensiones en mm para A4
  const widthMm = 210;
  const heightMm = 297;

  return (
    <div
      className="bg-white artboard-shadow relative origin-top"
      style={{
        width: `${widthMm}mm`,
        height: `${heightMm}mm`,
        minWidth: `${widthMm}mm`,
        minHeight: `${heightMm}mm`,
      }}
    >
      {/* Aquí se renderizarán los elementos del JSON en el futuro */}
      <div className="absolute top-4 left-4 text-slate-300 pointer-events-none select-none">
        Área de diseño A4 (210x297mm)
      </div>
    </div>
  );
};
