import { Component, input, output } from '@angular/core';
import { ButtonAdd } from "./button-add/button-add";

@Component({
  selector: 'page-header',
  imports: [ButtonAdd],
  templateUrl: './page-header.html',
})
export class PageHeader {

  // Signal input
  entityName = input.required<string>();

  // Signal output
  add = output<void>();

  onAdd() {
    this.add.emit();
  }
}
