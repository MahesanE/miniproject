import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vape } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VapeService {
  private apiUrl = 'http://localhost:8080/api/vape';

  constructor(private http: HttpClient) { }

  getVapes(flavor?: string): Observable<Vape[]> {
    let params = new HttpParams();
    if (flavor) {
      params = params.append('flavor', flavor);
    }
    return this.http.get<Vape[]>(`${this.apiUrl}/search`, { params });
  }
}
