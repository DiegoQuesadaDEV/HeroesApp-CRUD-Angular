import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private _http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]> {
    return this._http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroeId(id: string): Observable<Heroe> {
    return this._http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this._http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=5`);
  }

  createHeroe( heroe: Heroe ): Observable<Heroe> {
    return this._http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  updateHeroe( heroe: Heroe ): Observable<Heroe> {
    return this._http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  deleteHeroe( id: string ): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/heroes/${id}`);
  }

}
