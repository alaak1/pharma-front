import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Medicine {
  private apiUrl = 'https://pharma-backend-two.vercel.app'; 
  constructor(private http: HttpClient) {}

  getMedicines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/medicine`);
  }

  getMedicineById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/medicine/${id}`);
  }

  createMedicine(payload: any) {
    return this.http.post(`${this.apiUrl}/api/medicine`, payload);
  }

  updateMedicine(id: string, payload: any) {
    return this.http.put(`${this.apiUrl}/api/medicine/${id}`, payload);
  }

  deleteMedicine(id: string) {
    return this.http.delete(`${this.apiUrl}/api/medicine/delete/${id}`);
  }
}
