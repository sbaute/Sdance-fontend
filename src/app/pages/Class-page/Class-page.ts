import { Component } from '@angular/core';
import { PageHeader } from "../../components/page-header/page-header";
import { TableComplete } from "../../components/table/table-complete";

@Component({
  selector: 'class-page',
  imports: [PageHeader, TableComplete],
  templateUrl: './Class-page.html',
})
export default class ClassPage {

   columnsName = [
    'Nombre',
    'Instructor',
    'Horario',
    'Dias',
    'Nivel',
  ];

  // keys que quiero mostrar
  danceClassKeys = [
    'name',
    'instructor',
    'hour',
    'day',
    'level',
  ];

  danceClasses = [
  {
    id: 1,
    name: "Classical Ballet",
    instructor: "Laura Gómez",
    hour: "18:00 - 19:30",
    day: "Monday",
    level: "Intermediate"
  },
  {
    id: 2,
    name: "Urban Hip Hop",
    instructor: "Martín Pereyra",
    hour: "20:00 - 21:00",
    day: "Wednesday",
    level: "Beginner"
  },
  {
    id: 3,
    name: "Contemporary Dance",
    instructor: "Valeria Sosa",
    hour: "17:00 - 18:30",
    day: "Tuesday",
    level: "Advanced"
  },
  {
    id: 4,
    name: "Salsa & Bachata",
    instructor: "Diego López",
    hour: "19:00 - 20:30",
    day: "Friday",
    level: "Intermediate"
  },
  {
    id: 5,
    name: "Flamenco Fusion",
    instructor: "Carolina Fernández",
    hour: "18:30 - 20:00",
    day: "Thursday",
    level: "Beginner"
  }
];


}
