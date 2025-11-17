import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicinesRoutingModule } from './medicines-routing-module';
import { Medicines } from './medicines';
import { MedicineList } from './medicine-list/medicine-list';
import { MedicineForm } from './medicine-form/medicine-form';
import { MedicineDetails } from './medicine-details/medicine-details';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    Medicines,
    MedicineList,
    MedicineForm,
    MedicineDetails
  ],
  imports: [
    CommonModule,
    MedicinesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MedicinesModule { }
