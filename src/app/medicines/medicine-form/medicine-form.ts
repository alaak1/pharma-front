import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Medicine} from '../medicine';

@Component({
  selector: 'app-medicine-form',
  standalone: false,
  templateUrl: './medicine-form.html',
  styleUrl: './medicine-form.css',
})
export class MedicineForm {
  medicineForm!: FormGroup;
  isEdit = false;
  medicineId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private medicineService: Medicine
  ) {}

  ngOnInit() {
    this.medicineForm = this.fb.group({
      med_name: ['', Validators.required],
      scientific_name: ['', Validators.required],
      category: [''],
      dose: [''],
      price: [0, Validators.required],
      closet: [''],
      description: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.medicineId = id;
      this.loadMedicine(id);
    }
  }

  loadMedicine(id: string) {
    this.medicineService.getMedicineById(id).subscribe({
      next: (data) => this.medicineForm.patchValue(data),
      error: (err) => console.error('Error loading medicine:', err)
    });
  }

  submit() {
    if (this.medicineForm.invalid) return;

    const payload = this.medicineForm.value;

    if (this.isEdit) {
      this.medicineService.updateMedicine(this.medicineId, payload).subscribe({
        next: (res) => {
          console.log('Updated successfully:', res);
          this.router.navigate(['/medicines', this.medicineId]);
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
    } else {
      this.medicineService.createMedicine(payload).subscribe({
        next: (res) => {
          console.log('Created successfully:', res);
          this.router.navigate(['/medicines', this.medicineId]);        },
        error: (err) => {
          console.error('Create failed:', err);
        }
      });
    }
  }
}
