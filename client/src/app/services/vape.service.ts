import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vape } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VapeService {
  private apiUrl = `${environment.apiUrl}/vape`;

  constructor(private http: HttpClient) { }

  getVapes(flavor?: string): Observable<Vape[]> {
    console.log('API URL:', this.apiUrl); // Add this line

    let params = new HttpParams();
    if (flavor) {
        params = params.append('flavor', flavor);
    }
    const finalUrl = `${this.apiUrl}/search`;
    console.log('Final URL:', finalUrl); // Add this line
    return this.http.get<Vape[]>(finalUrl, { params });
}

}
