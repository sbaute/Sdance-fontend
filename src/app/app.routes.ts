import { Routes } from '@angular/router';

export const routes: Routes = [

{
  path:'dashboard',
  loadComponent: () => import('./pages/dashboard-page/dashboard-page'),
  children: [
     {
      path:'home',
      loadComponent: () => import('./pages/home-page/home-page'),
    },
    {
      path:'student',
      loadComponent: () => import('./pages/student-page/student-page'),
    },
    {
      path:'class',
      loadComponent: () => import('./pages/Class-page/Class-page'),
    },
     {
      path:'instructor',
      loadComponent: () => import('./pages/instructor-page/instructor-page'),
    },
    {
      path:'payment',
      loadComponent: () => import('./pages/payment-page/payment-page'),
    },
  ]
},

{
  path:'**',
  redirectTo: 'dashboard'
}









];
