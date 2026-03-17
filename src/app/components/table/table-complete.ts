import { Component, input, signal } from '@angular/core';
import { TableAction } from '../../interfaces/table/TableActions';

@Component({
  selector: 'table-complete',
  standalone: true,
  templateUrl: './table-complete.html',
  imports: [],
})
export class TableComplete {

  // Recibe los nombres de las columnas
  columnsName = input<string[]>([]);

  // Recibe las filas (cada una un objeto genérico)
  rows = input<Record<string, any>[]>([]);

  // Opcional → si quiero definir el orden de keys a mostrar
  keys = input<string[]>([]);

  //Acciones para cada fila (editar, eliminar, etc)
  actions = input<TableAction<any>[]>([]);
}
