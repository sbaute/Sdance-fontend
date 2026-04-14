import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TableComplete } from '../../components/table/table-complete';
import { PageHeader } from "../../components/page-header/page-header";
import { StudentService } from '../../services/student-service';
import { CreateStudent, Student } from '../../interfaces/students/Student';
import { StudentModal } from "./student-modal/student-modal";
import { StudentStatusModal } from './student-status-modal/student-status-modal';
import { TableAction } from '../../interfaces/table/TableActions';
import { Pagination } from '../../components/pagination/pagination';
import { StudentStatus } from '../../enums/student-status.enum';

@Component({
  selector: 'student-page',
  imports: [TableComplete, PageHeader, StudentModal, StudentStatusModal, Pagination],
  templateUrl: './student-page.html',
})
export default class StudentPage {

  private studentService = inject(StudentService);
  private router = inject(Router);

  students = signal<Student[]>([]);

  totalStudents = signal(0);
  currentPage = signal(0);

  errorMessage = signal<string | null>(null);

  // Signal para controlar el estudiante seleccionado en el modal (para editar).
  selectedStudent = signal<Student | null>(null);
  modalMode = signal<'create' | 'edit'>('create');

studentKeys: (keyof Student | 'fullName' | 'birthDateFormatted')[] = [
  'fullName',
  'document',
  'email',
  'status',
  'phoneNumber',
  'birthDateFormatted', 
  'emergencyContactName',
  'emergencyContactPhone',
];

  // Se ejecuta al inicializar el componente.
  // Llama al método que obtiene los estudiantes desde el backend.
  ngOnInit(): void {
    this.loadStudents();
  }

  // Obtiene la lista de estudiantes desde el servicio.
  // Actualiza los signals con los datos recibidos (lista, total y página actual).
  loadStudents(): void {
    this.studentService.getAll().subscribe({
      next: (response) => {

        //console.log('RESPONSE:', response);

        this.students.set(response.data.items);
        this.totalStudents.set(response.data.totalElements);
        this.currentPage.set(response.data.currentPage);

      },
      error: (err) => console.error('Error cargando estudiantes', err)
    });
  }

  // Computed que transforma los estudiantes para la tabla.
  // Agrega el campo fullName y formatea la fecha de nacimiento.
  rows = computed(() =>
    this.students().map(student => ({
      ...student,
      fullName: `${student.name} ${student.lastName}`,
      birthDateFormatted: this.formatDate(student.birthDate)
    }))
  );

  // Formatea una fecha a formato local (Argentina).
  private formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-AR');
  }

  // Genera los nombres de las columnas a partir de las keys.
  // Convierte claves técnicas en nombres legibles para la UI.
  columnsName = computed(() =>
    this.studentKeys.map(key => this.formatHeader(key))
  );

  // Mapea las keys a nombres personalizados para los headers de la tabla.
  private formatHeader(key: string): string {
    const headerMap: Record<string, string> = {
      fullName: 'Nombre',
      status: 'Estado',
      email: 'Email',
      phoneNumber: 'Teléfono',
      birthDateFormatted: 'Fecha de nacimiento',
      document: 'Documento',
      emergencyContactName: 'Contacto emergencia',
      emergencyContactPhone: 'Tel. emergencia',
    };
    return headerMap[key] ?? key;
  }

  // Cambia de página en la paginación.
  // Vuelve a consultar al backend con el número de página seleccionado.
  changePage(page: number) {
    this.studentService.getAll(page).subscribe({
      next: (response) => {

        this.students.set(response.data.items);
        this.totalStudents.set(response.data.totalElements);
        this.currentPage.set(response.data.currentPage);

      }
    });
  }

  // Signal que controla si el modal está abierto o cerrado.
  isModalOpen = signal(false);

  /** Modal dedicado a cambiar estado (PATCH /students/{id}/status). */
  statusModalContext = signal<{ id: string; status: StudentStatus } | null>(null);

  // Abre el modal para crear un estudiante.
  openStudentModal() {
    this.modalMode.set('create');
    this.selectedStudent.set(null);
    this.isModalOpen.set(true);
  }

  openEditStudent(student: Student) {
  this.modalMode.set('edit');
  this.selectedStudent.set(student);
  this.isModalOpen.set(true);
 }

  // Cierra el modal de estudiante.
  closeStudentModal() {
    this.isModalOpen.set(false);
  }

  openStudentStatusModal(row: Record<string, unknown>): void {
    const id = row['id'];
    const status = row['status'];
    if (typeof id !== 'string' || typeof status !== 'string') return;
    this.statusModalContext.set({ id, status: status as StudentStatus });
  }

  closeStudentStatusModal(): void {
    this.statusModalContext.set(null);
  }

  onStudentStatusSaved(newStatus: StudentStatus): void {
    const ctx = this.statusModalContext();
    if (!ctx) return;
    this.students.update((list) =>
      list.map((s) => (s.id === ctx.id ? { ...s, status: newStatus } : s)),
    );
    this.closeStudentStatusModal();
  }

  // Crea un nuevo estudiante llamando al servicio.
  // Si es exitoso, lo agrega a la lista y cierra el modal.
  // Si falla, guarda el error.
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

  // Configuración de acciones de la tabla (editar y eliminar).
  // Cada acción tiene un ícono, color y función asociada.
  actions: TableAction<Student>[] = [
    {
      icon: 'fa-regular fa-pen-to-square',
      color: 'primary',
      action: (row) => this.openEditStudent(row)
    },
    {
      icon: 'fa-solid fa-trash',
      color: 'danger',
      action: (row) => this.deleteStudent(row)
    }
  ];


  // Maneja la acción de editar un estudiante.
  // Actualmente solo muestra el estudiante en consola.
  updateStudent(student: CreateStudent) {

    const id = this.selectedStudent()?.id;
    if (!id) return;

    this.studentService.update(id, student).subscribe({
      next: (response) => {

        const updatedStudent = response.data;
        console.log('✅ ESTUDIANTE ACTUALIZADO:', updatedStudent);
        this.students.update(list =>
          list.map(s => s.id === id ? updatedStudent : s)
        );

        this.isModalOpen.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.message);
      }
    });
  }

saveStudent(student: CreateStudent) {
  if (this.modalMode() === 'create') {
    this.createStudent(student);
  } else {
    this.updateStudent(student);
  }
}

  // Maneja la acción de eliminar un estudiante.
  // Actualmente solo muestra el estudiante en consola.
  deleteStudent(student: Student) {
    console.log('🗑️ ELIMINAR estudiante:', student);
  }

  navigateToStudentDetail(row: Record<string, unknown>): void {
    const studentId = row['id'];
    if (typeof studentId !== 'string') return;
    this.router.navigate(['/dashboard/student', studentId]);
  }

}
