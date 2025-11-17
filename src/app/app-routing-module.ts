import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import {AuthGuard} from './auth/auth-guard';

const routes: Routes = [
  // Login (public)
  { path: 'login', component: Login },

  // Default route
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'medicines',canActivate: [AuthGuard], loadChildren: () => import('./medicines/medicines-module').then(m => m.MedicinesModule) },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
