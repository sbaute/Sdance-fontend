import { Component, computed, inject, signal } from '@angular/core';
import { TableComplete } from '../../components/table/table-complete';
import { PageHeader } from "../../components/page-header/page-header";
import { StudentService } from '../../services/student-service';
import { CreateStudent, Student } from '../../interfaces/students/Student';
import { StudentModal } from "./student-modal/student-modal";
import { TableAction } from '../../interfaces/table/TableActions';


@Component({
  selector: 'student-page',
  imports: [TableComplete, PageHeader, StudentModal],
  templateUrl: './student-page.html',
})
export default class StudentPage {

  private studentService = inject(StudentService);

  students = signal<Student[]>([]);
  totalStudents = signal(0);
  currentPage = signal(0);
  errorMessage = signal<string | null>(null);

  studentKeys: (keyof Student | 'fullName')[] = [
  'fullName',
  'status',
  'email',
  'phoneNumber',
  'birthDate',
  'document',

  'emergencyContactName',
  'emergencyContactPhone',

];

  ngOnInit(): void {
    this.loadStudents();
  }
  
loadStudents(): void {
  this.studentService.getAll().subscribe({
    next: (response) => {

      console.log('RESPONSE:', response);

      this.students.set(response.data.items);
      this.totalStudents.set(response.data.totalElements);
      this.currentPage.set(response.data.currentPage);

    },
    error: (err) => console.error('Error cargando estudiantes', err)
  });
}

rows = computed(() =>
  this.students().map(student => ({
    ...student,
    fullName: `${student.name} ${student.lastName}`,
    birthDate: this.formatDate(student.birthDate)
  }))
);

private formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-AR');
}

  columnsName = computed(() =>
    this.studentKeys.map(key => this.formatHeader(key))
  );

  private formatHeader(key: string): string {
  const headerMap: Record<string, string> = {
    fullName: 'Nombre',
    status: 'Estado',
    email: 'Email',
    phoneNumber: 'Teléfono',
    birthDate: 'Fecha de nacimiento',
    document: 'Documento',
    emergencyContactName: 'Contacto emergencia',
    emergencyContactPhone: 'Tel. emergencia',

    };
    return headerMap[key] ?? key;
  }

  //Modals

    isModalOpen = signal(false);

      openStudentModal() {
        this.isModalOpen.set(true);
      }

      closeStudentModal() {
        this.isModalOpen.set(false);
      }

//Crear Estudiante
  createStudent(student: CreateStudent) {

    this.studentService.create(student).subscribe({
      next: (response) => {

        const createdStudent = response.data;

        this.students.update(list => [...list, createdStudent]);

        this.isModalOpen.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
      }
    });
  }

   actions: TableAction<Student>[] = [
  {
    icon: 'fa-regular fa-pen-to-square',
    color: 'primary',
    action: (row) => this.editStudent(row)
  },
  {
    icon: 'fa-solid fa-trash',
    color: 'danger',
    action: (row) => this.deleteStudent(row)
  }
];

editStudent(student: Student) {
    console.log('📝 EDITAR estudiante:', student);
  }

  deleteStudent(student: Student) {
    console.log('🗑️ ELIMINAR estudiante:', student);
  }

}
