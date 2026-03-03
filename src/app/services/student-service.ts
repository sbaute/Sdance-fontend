import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ResponseMessage } from '../interfaces/ResponseMessage';
import { CreateStudent, Student } from '../interfaces/students/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/students';

  getAll(): Observable<ResponseMessage<Student[]>> {
    return this.http.get<ResponseMessage<Student[]>>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  create(student: CreateStudent): Observable<ResponseMessage<Student>> {
    return this.http.post<ResponseMessage<Student>>(this.apiUrl, student).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMsg = 'Error desconocido';

    if (err.status === 0) {
      errorMsg = 'No se pudo conectar con el servidor';
    } else if (err.status === 401) {
      errorMsg = 'No autorizado. Inicia sesión nuevamente';
    } else if (err.status === 403) {
      errorMsg = 'No tienes permisos para realizar esta acción';
    } else if (err.error?.message) {
      errorMsg = err.error.message;
    }

    return throwError(() => new Error(errorMsg));
  }






}
