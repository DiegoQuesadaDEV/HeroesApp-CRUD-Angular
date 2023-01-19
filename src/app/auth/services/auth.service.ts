import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  // Getter
  get auth() {
    return {...this._auth};
  }

  constructor(
    private _http: HttpClient,
  ) { }

  verificaAutenticacion(): Observable<boolean> {
    
    if (!localStorage.getItem('token')) {
      return of(false);
    }

    return this._http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map( auth => {
          this._auth = auth;
          return true;
        })
      );
  }

  login() {
    return this._http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id) )
      );
  }

  logout() {
    this._auth = undefined;
  }




}
