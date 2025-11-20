import { Component } from '@angular/core';
import {Medicine} from '../medicine';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-medicine-list',
  standalone: false,
  templateUrl: './medicine-list.html',
  styleUrl: './medicine-list.css',
})
export class MedicineList {
  groupedByCloset: any = {};

  searchTerm: string = '';
  originalMedicines: any[] = [];

  constructor(private medicineService: Medicine) {}

  ngOnInit() {
    this.medicineService.getMedicines().subscribe({
      next: (data) => {
        this.originalMedicines = data;
        this.groupMedicines(data);
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  groupMedicines(medicines: any[]) {
    this.groupedByCloset = medicines.reduce((groups: any, med: any) => {
      const rawCloset = med.closet || 'Uncategorized';

      const closet = rawCloset.trim().toLowerCase();

      if (!groups[closet]) groups[closet] = [];
      groups[closet].push(med);

      return groups;
    }, {});
  }

  keyValueSorter(a: KeyValue<string, any[]>, b: KeyValue<string, any[]>): number {
    return a.key.localeCompare(b.key);
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.groupMedicines(this.originalMedicines);
      return;
    }

    const filtered = this.originalMedicines.filter((med: any) =>
      med.med_name?.toLowerCase().includes(term) ||
      med.scientific_name?.toLowerCase().includes(term) ||
      med.closet?.toLowerCase().includes(term)
    );

    this.groupMedicines(filtered);
  }

  searchMedicines(event: Event) {
    event.preventDefault();
    this.applyFilter();
  }

  resetSearch() {
    this.searchTerm = '';
    this.groupMedicines(this.originalMedicines);
  }
}
