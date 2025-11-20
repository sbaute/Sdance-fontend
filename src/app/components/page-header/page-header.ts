import { Component, input } from '@angular/core';

@Component({
  selector: 'page-header',
  imports: [],
  templateUrl: './page-header.html',
})
export class PageHeader {

  // entityName() para leer
  entityName = input<string>();
}
