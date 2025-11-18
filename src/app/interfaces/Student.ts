export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  document: string;
  phoneNumber: string;
  email: string;
  classes: string[];
  status: 'al_dia' | 'pendiente';
  notes: string;
}
