import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseMessage } from '../interfaces/ResponseMessage';
import { Student } from '../interfaces/students/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/students';

  /**
   * Obtiene todos los estudiantes.
   * Devuelve un Observable de ResponseMessage<Student[]> o lanza error.
   */
  getAll(): Observable<ResponseMessage<Student[]>> {
    return this.http.get<ResponseMessage<Student[]>>(this.apiUrl).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error('Error cargando estudiantes', err);

        // Puedes personalizar el mensaje según el error
        let errorMsg = 'Error desconocido';
        if (err.status === 0) {
          errorMsg = 'No se pudo conectar con el servidor';
        } else if (err.status === 401) {
          errorMsg = 'No autorizado. Inicia sesión de nuevo';
        } else if (err.status === 403) {
          errorMsg = 'No tienes permisos para ver esta información';
        } else if (err.error?.message) {
          errorMsg = err.error.message;
        }

        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
