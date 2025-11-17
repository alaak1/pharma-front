import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';

const routes: Routes = [
  { path: 'login', component: Login },

  // Optional: redirect root to login for now
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'medicines', loadChildren: () => import('./medicines/medicines-module').then(m => m.MedicinesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
