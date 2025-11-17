import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Medicine} from '../medicine';

@Component({
  selector: 'app-medicine-details',
  standalone: false,
  templateUrl: './medicine-details.html',
  styleUrl: './medicine-details.css',
})
export class MedicineDetails {

  medicine: any = {};

  constructor(
    private route: ActivatedRoute,
    private medicineService: Medicine
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.medicineService.getMedicineById(id).subscribe({
        next: (data) => this.medicine = data,
        error: (err) => console.error('Error loading medicine:', err)
      });
    }
  }
}
