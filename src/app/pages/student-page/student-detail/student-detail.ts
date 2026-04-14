import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CreateStudent, Student } from '../../../interfaces/students/Student';
import { StudentService } from '../../../services/student-service';
import { StudentModal } from '../student-modal/student-modal';

@Component({
  selector: 'student-detail',
  standalone: true,
  imports: [RouterLink, StudentModal],
  templateUrl: './student-detail.html',
})
export default class StudentDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly studentService = inject(StudentService);

  student = signal<Student | null>(null);
  loading = signal(true);
  errorMessage = signal<string | null>(null);
  isEditModalOpen = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      this.errorMessage.set('No se encontró el identificador del alumno.');
      return;
    }

    this.studentService.getStudentById(id).subscribe({
      next: (response) => {
        this.student.set(response.data);
        this.loading.set(false);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.loading.set(false);
      },
    });
  }

  openEditModal(): void {
    this.isEditModalOpen.set(true);
  }

  closeEditModal(): void {
    this.isEditModalOpen.set(false);
  }

  saveStudentUpdate(studentData: CreateStudent): void {
    const currentStudent = this.student();
    if (!currentStudent) return;

    this.studentService.update(currentStudent.id, studentData).subscribe({
      next: (response) => {
        this.student.set(response.data);
        this.isEditModalOpen.set(false);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
      },
    });
  }

  deleteStudent(): void {
    const currentStudent = this.student();
    if (!currentStudent) return;

    const shouldDelete = window.confirm('Esta acción dará de baja al alumno. ¿Deseas continuar?');
    if (!shouldDelete) return;

    this.studentService.delete(currentStudent.id).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/student']);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
      },
    });
  }
}
