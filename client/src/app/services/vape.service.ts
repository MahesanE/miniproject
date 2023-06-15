import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vape } from '../models';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VapeService {
  private apiUrl = `${environment.apiUrl}/vape`;

  constructor(private http: HttpClient) { }

  getVapes(flavor?: string): Observable<Vape[]> {
    let params = new HttpParams();
    if (flavor) {
      params = params.append('flavor', flavor);
    }
    return this.http.get<Vape[]>(`${this.apiUrl}/search`, { params });
  }
}
