import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },


  {
    path: 'login',
     loadComponent: () => import('./pages/login-page/login').then(m => m.Login),
  },


   {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard-page/dashboard-page'),
    children: [
      {
        path: 'student',
        loadComponent: () => import('./pages/student-page/student-page'),
      },
      {
        path: 'class',
        loadComponent: () => import('./pages/Class-page/Class-page'),
      },
      {
        path: 'instructor',
        loadComponent: () => import('./pages/instructor-page/instructor-page'),
      },
      {
        path: 'payment',
        loadComponent: () => import('./pages/payment-page/payment-page'),
      },
    ],
  },

  // 👇 lo dejé igual que vos
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
