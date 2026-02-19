import { Component } from '@angular/core';
import { PageHeader } from "../../components/page-header/page-header";
import { TableComplete } from "../../components/table/table-complete";

@Component({
  selector: 'instructor-page',
  imports: [PageHeader, TableComplete],
  templateUrl: './instructor-page.html',
})
export default class InstructorPage {


   columnsName = [
    'Nombre',
    'Documento',
    'Numero',
    'Email',
    'Clases',
    'estado'
  ];

  // keys que quiero mostrar
  instructorKeys = [
    'fullName',
    'document',
    'phoneNumber',
    'email',
    'classes',
    'status'
  ];

  // Transformo la data original
instructors = [
  {
    id: 1,
    fullName: 'Laura Gómez',
    document: '32.456.789',
    phoneNumber: '+54 9 341 555-1122',
    email: 'laura.gomez@email.com',
    classes: ['Ballet', 'Jazz'],
    status: 'activo',
    notes: 'Especialista en técnica clásica'
  },
  {
    id: 2,
    fullName: 'Martín Pereyra',
    document: '29.874.321',
    phoneNumber: '+54 9 341 555-2233',
    email: 'martin.pereyra@email.com',
    classes: ['Hip Hop', 'Reggaeton'],
    status: 'licencia',
    notes: 'De licencia hasta el 15/12'
  },
  {
    id: 3,
    fullName: 'Valeria Sosa',
    document: '34.987.210',
    phoneNumber: '+54 9 341 555-3344',
    email: 'valeria.sosa@email.com',
    classes: ['Contemporáneo', 'Ballet'],
    status: 'activo',
    notes: 'No notes'
  },
  {
    id: 4,
    fullName: 'Diego López',
    document: '31.002.456',
    phoneNumber: '+54 9 341 555-4455',
    email: 'diego.lopez@email.com',
    classes: ['Salsa', 'Bachata'],
    status: 'activo',
    notes: 'En reemplazo de instructor anterior'
  },
  {
    id: 5,
    fullName: 'Carolina Fernández',
    document: '27.654.890',
    phoneNumber: '+54 9 341 555-5566',
    email: 'carolina.fernandez@email.com',
    classes: ['Flamenco', 'Clásico'],
    status: 'licencia',
    notes: 'Vuelve en enero'
  }
];


}
