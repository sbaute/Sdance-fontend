import { Component } from '@angular/core';
import { TableComplete } from '../../components/table/table-complete';
import { PageHeader } from "../../components/page-header/page-header";


@Component({
  selector: 'student-page',
  imports: [TableComplete, PageHeader],
  templateUrl: './student-page.html',
})
export default class StudentPage {

      columnsName = [
    'Nombre',
    'Documento',
    'Numero',
    'Email',
    'Clases',
    'Estado',
    'Notas'
  ];

  // keys que quiero mostrar
  studentKeys = [
    'fullName',
    'document',
    'phoneNumber',
    'email',
    'classes',
    'status',
    'notes'
  ];

  // Transformo la data original
  students = [
     {
      id: 1,
      fullName: 'Sofía Rodríguez',
      document: '41.258.963',
      phoneNumber: '+54 9 341 555-1200',
      email: 'sofia.rodriguez@email.com',
      classes: ['Ballet', 'Jazz'],
      status: 'al_dia',
      notes: 'No notes'
    },
    {
      id: 2,
      fullName: 'Carlos',
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
      fullName: 'Ana García',
      document: '42.986.300',
      phoneNumber: '+54 9 341 555-4102',
      email: 'ana.garcia@email.com',
      classes: ['Flamenco', 'Classic'],
      status: 'al_dia',
      notes: 'No notes'
    },
    {
      id: 4,
      fullName: 'Javier López',
      document: '37.444.958',
      phoneNumber: '+54 9 341 555-7620',
      email: 'javier.lopez@email.com',
      classes: ['Salsa', 'Tango'],
      status: 'pendiente',
      notes: 'No notes'
    },
    {
      id: 5,
      fullName: 'María Martínez',
      document: '40.302.119',
      phoneNumber: '+54 9 341 555-9512',
      email: 'maria.martinez@email.com',
      classes: ['Ballet', 'Contemporary'],
      status: 'pendiente',
      notes: 'Needs follow-up'
    }
  ];

 }
