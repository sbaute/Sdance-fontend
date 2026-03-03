import { Component, input, output } from '@angular/core';

@Component({
  selector: 'button-add',
  imports: [],
  templateUrl: './button-add.html',
})
export class ButtonAdd {

  entity = input.required<string>();
  icon = input<string>('fa-plus');
  disabled = input<boolean>(false);

  action = output<void>();

  onClick() {
    if (!this.disabled()) {
      this.action.emit();
    }
  }
 }
