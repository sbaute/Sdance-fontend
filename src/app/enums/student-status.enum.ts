/** Mirrors backend `com.sdance_backend.sdance.enums.status.StudentStatus`. */
export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  DEACTIVATED = 'DEACTIVATED',
}

/** All enum values for selects and iteration. */
export const STUDENT_STATUS_VALUES: StudentStatus[] = [
  StudentStatus.ACTIVE,
  StudentStatus.INACTIVE,
  StudentStatus.BLOCKED,
  StudentStatus.DEACTIVATED,
];
