import { Component } from '@angular/core';
import { Student } from '../../interfaces/Student';


@Component({
  selector: 'student-page',
  imports: [],
  templateUrl: './student-page.html',
})
export default class StudentPage {

  columnsName: string[] = [
    'Nombre',
    'Documento',
    'Numero',
    'Email',
    'Clases',
    'Estado',
    'Notas'
  ];

  students: Student[] = [
    {
      id: 1,
      firstName: 'Sofía',
      lastName: 'Rodríguez',
      document: '41.258.963',
      phoneNumber: '+54 9 341 555-1200',
      email: 'sofia.rodriguez@email.com',
      classes: ['Ballet', 'Jazz'],
      status: 'al_dia',
      notes: 'No notes'
    },
    {
      id: 2,
      firstName: 'Carlos',
      lastName: 'Pérez',
      document: '38.521.744',
      phoneNumber: '+54 9 341 555-2834',
      email: 'carlos.perez@email.com',
      classes: ['Hip Hop', 'Contemporary'],
      status: 'pendiente',
      notes: 'Needs follow-up'
    },
    {
      id: 3,
      firstName: 'Ana',
      lastName: 'García',
      document: '42.986.300',
      phoneNumber: '+54 9 341 555-4102',
      email: 'ana.garcia@email.com',
      classes: ['Flamenco', 'Classic'],
      status: 'al_dia',
      notes: 'No notes'
    },
    {
      id: 4,
      firstName: 'Javier',
      lastName: 'López',
      document: '37.444.958',
      phoneNumber: '+54 9 341 555-7620',
      email: 'javier.lopez@email.com',
      classes: ['Salsa', 'Tango'],
      status: 'pendiente',
      notes: 'No notes'
    },
    {
      id: 5,
      firstName: 'María',
      lastName: 'Martínez',
      document: '40.302.119',
      phoneNumber: '+54 9 341 555-9512',
      email: 'maria.martinez@email.com',
      classes: ['Ballet', 'Contemporary'],
      status: 'pendiente',
      notes: 'Needs follow-up'
    }
  ];




 }
