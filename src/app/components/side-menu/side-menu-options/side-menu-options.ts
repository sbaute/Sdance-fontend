import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";


interface MenuOption {
  icon: string;
  label: string;
  route: string;
}


@Component({
  selector: 'side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptions {


  menuOptions: MenuOption[] = [

    {
      icon: 'fa-regular fa-house',
      label: 'Inicio',
      route: '/dashboard/dashboard',
    },
    {
      icon: 'fa-solid fa-users',
      label: 'Alumnos',
      route: '/dashboard/student',
    },
      {
      icon: 'fa-regular fa-clipboard',
      label: 'Clases',
      route: '/dashboard/class',
    },
    {
      icon: 'fa-solid fa-person',
      label: 'Instructores',
      route: '/dashboard/instructor',
    },
    {
      icon: 'fa-regular fa-credit-card',
      label: 'Pagos',
      route: '/dashboard/payment',
    },



  ]



}
