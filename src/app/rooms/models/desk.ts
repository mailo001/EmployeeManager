export interface Desk {
  id: number;
  x: number;
  y: number;
  rotate: number;
  colision: boolean;
  employee: boolean;
  empId?: number;
}

export const WidthDesk = 100;
export const HeightDesk = 100;
