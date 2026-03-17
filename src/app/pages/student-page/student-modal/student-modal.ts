import { Component, computed, effect, input, output, signal } from '@angular/core';
import { CreateStudent, Student } from '../../../interfaces/students/Student';
import { TableAction } from '../../../interfaces/table/TableActions';

@Component({
  selector: 'student-modal',
  templateUrl: './student-modal.html',
})
export class StudentModal {

  // 🔹 Input que recibe el modo del modal desde el padre
  // 'create' → crear alumno
  // 'edit' → editar alumno existente
  mode = input<'create' | 'edit'>('create');

  // 🔹 Input que recibe el alumno seleccionado (solo en modo edit)
  // Si es null → estamos creando
  studentInput = input<Student | null>(null);


  // 🔹 Output para cerrar el modal
  close = output<void>();

  // 🔹 Output para enviar los datos al padre (create o update)
  save = output<CreateStudent>();


  // 🔹 Estado interno del formulario (signal)
  // Acá guardamos todos los datos que el usuario va escribiendo
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

  // 🔹 Indica si el usuario intentó guardar (para mostrar errores)
  submitted = signal(false);


  // 🔥 EFFECT
  // Se ejecuta automáticamente cuando cambian:
  // - mode()
  // - studentInput()
  constructor() {
    effect(() => {

      const mode = this.mode();
      const student = this.studentInput();

      console.log('MODE:', mode);
      console.log('STUDENT INPUT:', student);

      // 🔹 Si estamos editando y hay un alumno
      // cargamos los datos en el formulario
      if (mode === 'edit' && student) {
        console.log('🔥 CARGANDO DATOS EN FORM');

        this.student.set({
          name: student.name,
          lastName: student.lastName,
          document: student.document,
          phoneNumber: student.phoneNumber,
          email: student.email,
          birthDate: student.birthDate,
          emergencyContactName: student.emergencyContactName,
          emergencyContactPhone: student.emergencyContactPhone,
        });
      }

      // 🔹 Si estamos en modo create
      // limpiamos el formulario
      if (mode === 'create') {
        console.log('🧹 RESET FORM');
        this.resetForm();
      }

    });
  }


  // 🔹 Método para limpiar el formulario
  // Se usa cuando abrimos el modal en modo "crear"
  private resetForm() {
    this.student.set({
      name: '',
      lastName: '',
      document: '',
      phoneNumber: '',
      email: '',
      birthDate: '',
      emergencyContactName: '',
      emergencyContactPhone: ''
    });
  }


  // 🔹 Expresiones regulares para validaciones
  private phoneRegex = /^[0-9]{9,15}$/;
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  // 🔹 Actualiza un campo específico del formulario
  // Se usa en los inputs (input event)
  updateField<K extends keyof CreateStudent>(field: K, value: CreateStudent[K]) {
    this.student.update(s => ({ ...s, [field]: value }));
  }


  // 🔹 Devuelve el error de un campo (si existe)
  // Solo se activa después de intentar guardar (submitted = true)
  getFieldError(field: keyof CreateStudent): string | null {

    // Si no intentó guardar, no mostramos errores
    if (!this.submitted()) return null;

    const value = this.student()[field];

    // 🔴 Validación: obligatorio
    if (!value) return '*Es obligatorio';

    switch (field) {

      // 🔹 Validación de texto (mínimo 2 caracteres)
      case 'name':
      case 'lastName':
      case 'emergencyContactName':
        return value.trim().length >= 2
          ? null
          : 'Debe tener al menos 2 caracteres';

      // 🔹 Documento (mínimo 6 caracteres)
      case 'document':
        return value.length >= 6 ? null : 'Debe tener al menos 6 caracteres';

      // 🔹 Teléfonos (regex)
      case 'phoneNumber':
      case 'emergencyContactPhone':
        return this.phoneRegex.test(value)
          ? null
          : 'Debe contener entre 9 y 15 números';

      // 🔹 Email (regex)
      case 'email':
        return this.emailRegex.test(value)
          ? null
          : 'Email inválido';

      // 🔹 Fecha (debe ser pasada)
      case 'birthDate':
        return new Date(value) < new Date()
          ? null
          : 'Debe ser una fecha pasada';

      default:
        return null;
    }
  }


  // 🔹 Computed que indica si el formulario es inválido
  // Se usa para deshabilitar el botón "Guardar"
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

    // Si algún campo tiene error → el form es inválido
    return fields.some(field => this.getFieldError(field) !== null);
  });


  // 🔹 Método que se ejecuta al hacer click en "Guardar"
  onSave() {

    // Marcamos que el usuario intentó guardar
    this.submitted.set(true);

    // Si hay errores → no hacemos nada
    if (this.isFormInvalid()) return;

    // Emitimos los datos al componente padre
    this.save.emit(this.student());
  }


  // 🔹 Método que se ejecuta al cerrar el modal
  onClose() {
    this.close.emit();
  }

}
