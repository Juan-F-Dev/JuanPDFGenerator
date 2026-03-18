
export interface TextElement {
  id: string;
  type: 'text';
  x: number; // En mm
  y: number; // En mm
  width: number; // En mm (ancho por defecto de la celda)
  height: number; // En mm (alto por defecto de la celda)
  content: string;
  style: {
    font: string;
    size: number;
    weight: '' | 'B' | 'I';
  }
}

