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
      label: 'home',
      route: '/dashboard/home',
    },
    {
      icon: 'fa-solid fa-users',
      label: 'Students',
      route: '/dashboard/student',
    },
      {
      icon: 'fa-regular fa-clipboard',
      label: 'Class',
      route: '/dashboard/class',
    },
    {
      icon: 'fa-regular fa-credit-card',
      label: 'Payment',
      route: '/dashboard/payment',
    },




  ]



}
