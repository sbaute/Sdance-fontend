export interface Student {
  id: string; // UUID como string
  name: string;
  lastName: string;
  document: string;
  phoneNumber: string;

  email: string;
  birthDate: string; // formato: "YYYY-MM-DD"
  emergencyContactName: string;
  emergencyContactPhone: string;
  status: string;
}

export type CreateStudent = Omit<Student, 'id' | 'status'>;
