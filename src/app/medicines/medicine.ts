import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Medicine {
  private apiUrl = 'https://pharma-backend-two.vercel.app/api/medicine';  // UPDATE THIS

  constructor(private http: HttpClient) {}

  getMedicines(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMedicineById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createMedicine(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }

  updateMedicine(id: string, payload: any) {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }
}
