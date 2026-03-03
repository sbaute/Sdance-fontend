import { Component, computed, output, signal } from '@angular/core';
import { CreateStudent, Student } from '../../../interfaces/students/Student';
import { TableAction } from '../../../interfaces/table/TableActions';

@Component({
  selector: 'student-modal',
  templateUrl: './student-modal.html',
})
export class StudentModal {

  close = output<void>();
  save = output<CreateStudent>();

  student = signal<CreateStudent>({
    name: '',
    lastName: '',
    document: '',
    phoneNumber: '',
    email: '',
    birthDate: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });

  submitted = signal(false);

  private phoneRegex = /^[0-9]{9,15}$/;
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  updateField<K extends keyof CreateStudent>(field: K, value: CreateStudent[K]) {
    this.student.update(s => ({ ...s, [field]: value }));
  }

  getFieldError(field: keyof CreateStudent): string | null {
    if (!this.submitted()) return null;

    const value = this.student()[field];

    // 🔴 Obligatorio
    if (!value) return '*Es obligatorio';

    switch (field) {

      case 'name':
      case 'lastName':
      case 'emergencyContactName':
        return value.trim().length >= 2
          ? null
          : 'Debe tener al menos 2 caracteres';

      case 'document':
        return value.length >= 6 ? null : 'Debe tener al menos 6 caracteres';

      case 'phoneNumber':
      case 'emergencyContactPhone':
        return this.phoneRegex.test(value)
          ? null
          : 'Debe contener entre 9 y 15 números';

      case 'email':
        return this.emailRegex.test(value)
          ? null
          : 'Email inválido';

      case 'birthDate':
        return new Date(value) < new Date()
          ? null
          : 'Debe ser una fecha pasada';

      default:
        return null;
    }
  }

  isFormInvalid = computed(() => {
    const fields: (keyof CreateStudent)[] = [
      'name',
      'lastName',
      'document',
      'phoneNumber',
      'email',
      'birthDate',
      'emergencyContactName',
      'emergencyContactPhone'
    ];

    return fields.some(field => this.getFieldError(field) !== null);
  });

  onSave() {
    this.submitted.set(true);
    if (this.isFormInvalid()) return;
    this.save.emit(this.student());
  }

  onClose() {
    this.close.emit();
  }



}
