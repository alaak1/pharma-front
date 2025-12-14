import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Medicine {
  private apiUrl = 'https://pharma-backend-two.vercel.app'; 
  private medicines$?: Observable<any[]>;
  private cachedMedicines: any[] | null = null;

  constructor(private http: HttpClient) {}

  getMedicines(): Observable<any[]> {
    if (!this.medicines$) {
      this.medicines$ = this.http.get<any[]>(`${this.apiUrl}/api/medicine`).pipe(
        tap((data) => this.cachedMedicines = data),
        shareReplay(1)
      );
    }

    return this.medicines$;
  }

  getMedicineById(id: string): Observable<any> {
    if (this.cachedMedicines) {
      const existing = this.cachedMedicines.find((med) => med.id === id);
      if (existing) {
        return of(existing);
      }
    }

    return this.http.get<any>(`${this.apiUrl}/api/medicine/${id}`);
  }

  createMedicine(payload: any) {
    return this.http.post(`${this.apiUrl}/api/medicine`, payload).pipe(
      tap(() => this.clearCache())
    );
  }

  updateMedicine(id: string, payload: any) {
    return this.http.put(`${this.apiUrl}/api/medicine/${id}`, payload).pipe(
      tap(() => this.clearCache())
    );
  }

  deleteMedicine(id: string) {
    return this.http.delete(`${this.apiUrl}/api/medicine/delete/${id}`).pipe(
      tap(() => this.clearCache())
    );
  }

  private clearCache() {
    this.cachedMedicines = null;
    this.medicines$ = undefined;
  }
}
