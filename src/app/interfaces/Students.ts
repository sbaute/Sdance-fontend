export interface Students {
  id: number;
  nombre: string;
  email: string;
  clases: string[]; 
  estado: 'al_dia' | 'pendiente';
  notas: string;
}
