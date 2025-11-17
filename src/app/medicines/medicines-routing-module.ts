import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Medicines } from './medicines';
import { MedicineDetails} from './medicine-details/medicine-details';
import { MedicineForm} from './medicine-form/medicine-form';
import {MedicineList} from './medicine-list/medicine-list';

const routes: Routes = [
  { path: '', component: MedicineList },
  { path: 'create', component: MedicineForm },
  { path: 'edit/:id', component: MedicineForm },
  { path: ':id', component: MedicineDetails },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicinesRoutingModule { }
