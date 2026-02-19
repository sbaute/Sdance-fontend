import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../auth/auth-service';

export interface MenuOption {
  icon: string;
  label: string;
  route?: string;
  action?: 'logout';
}


@Component({
  selector: 'side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptions {

constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }


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

    //Logout
    {
      icon: 'fa-solid fa-right-from-bracket',
      label: 'Cerrar sesión',
      action: 'logout',
    },

  ]





}
