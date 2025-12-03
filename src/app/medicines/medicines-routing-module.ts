import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Medicines } from './medicines';
import { MedicineDetails} from './medicine-details/medicine-details';
import { MedicineForm} from './medicine-form/medicine-form';
import {MedicineList} from './medicine-list/medicine-list';
import {AuthGuard} from '../auth/auth-guard';
import {RoleGuard} from '../auth/role.guard';

const routes: Routes = [
  { path: '', component: MedicineList },
  {
    path: 'create',
    component: MedicineForm,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'regular'] }
  },
  {
    path: 'edit/:id',
    component: MedicineForm,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'regular'] }
  },
  { path: ':id', component: MedicineDetails, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinesRoutingModule { }
