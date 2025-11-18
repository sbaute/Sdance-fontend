import { Component } from '@angular/core';
import { Students } from '../../interfaces/Students';


@Component({
  selector: 'student-page',
  imports: [],
  templateUrl: './student-page.html',
})
export default class StudentPage {

  columnsName:String[] = ['NOMBRE', 'EMAIL', 'CLASES','ESTADO','NOTAS']

  students: Students[] = [
  {
    id: 1,
    nombre: 'Sofía Rodríguez',
    email: 'sofia.rodriguez@email.com',
    clases: ['Ballet', 'Jazz'],
    estado: 'al_dia',
    notas: 'Sin notas'
  },
  {
    id: 2,
    nombre: 'Carlos Pérez',
    email: 'carlos.perez@email.com',
    clases: ['Hip Hop', 'Contemporáneo'],
    estado: 'pendiente',
    notas: 'Requiere seguimiento'
  },
  {
    id: 3,
    nombre: 'Ana García',
    email: 'ana.garcia@email.com',
    clases: ['Flamenco', 'Clásico'],
    estado: 'al_dia',
    notas: 'Sin notas'
  },
  {
    id: 4,
    nombre: 'Javier López',
    email: 'javier.lopez@email.com',
    clases: ['Salsa', 'Tango'],
    estado: 'al_dia',
    notas: 'Sin notas'
  },
  {
    id: 5,
    nombre: 'María Martínez',
    email: 'maria.martinez@email.com',
    clases: ['Ballet', 'Contemporáneo'],
    estado: 'pendiente',
    notas: 'Requiere seguimiento'
  }
];



 }
