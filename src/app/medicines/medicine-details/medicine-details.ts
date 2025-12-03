import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Medicine} from '../medicine';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-medicine-details',
  standalone: false,
  templateUrl: './medicine-details.html',
  styleUrl: './medicine-details.css',
})
export class MedicineDetails {

  medicine: any = {};
  showDeleteConfirm = false;
  canEdit = false;

  constructor(
    private route: ActivatedRoute,
    private medicineService: Medicine,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.canEdit = this.auth.hasRole('admin', 'regular');

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.medicineService.getMedicineById(id).subscribe({
        next: (data) => this.medicine = data,
        error: (err) => console.error('Error loading medicine:', err)
      });
    }
  }

  confirmDelete() {
    this.showDeleteConfirm = true;
  }

  deleteMedicine() {
    if (!this.medicine?.id) return;

    this.medicineService.deleteMedicine(this.medicine.id).subscribe({
      next: () => {
        this.showDeleteConfirm = false;
        this.router.navigate(['/medicines']);
      },
      error: (err) => {
        console.error('Failed to delete:', err);
        this.showDeleteConfirm = false;
      }
    });
  }
}
