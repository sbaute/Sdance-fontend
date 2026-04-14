import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { StudentStatus, STUDENT_STATUS_VALUES } from '../../../enums/student-status.enum';
import { StudentService } from '../../../services/student-service';

@Component({
  selector: 'student-status-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './student-status-modal.html',
})
export class StudentStatusModal {
  private readonly fb = inject(FormBuilder);
  private readonly studentService = inject(StudentService);

  studentId = input.required<string>();
  currentStatus = input.required<StudentStatus>();

  close = output<void>();
  /** Emits the status returned by the API after a successful update. */
  saved = output<StudentStatus>();

  readonly statusOptions = STUDENT_STATUS_VALUES;

  readonly statusForm = this.fb.group({
    status: this.fb.nonNullable.control<StudentStatus>(StudentStatus.ACTIVE, {
      validators: [Validators.required],
    }),
  });

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.studentId();
      this.currentStatus();
      this.statusForm.patchValue({ status: this.currentStatus() }, { emitEvent: false });
      this.errorMessage.set(null);
    });
  }

  onCancel(): void {
    this.close.emit();
  }

  onSave(): void {
    if (this.statusForm.invalid) {
      this.statusForm.markAllAsTouched();
      return;
    }

    const newStatus = this.statusForm.getRawValue().status;
    if (newStatus === this.currentStatus()) {
      this.close.emit();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.studentService
      .updateStatus(this.studentId(), newStatus)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (updated) => this.saved.emit(updated),
        error: (err: Error) => this.errorMessage.set(err.message),
      });
  }
}
