import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthReponse, Usuario } from '../../interfaces/interfaces';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  login(email: string, password: string) {
    const url = `${environment.baseUrl}login`;
    return this.http.post<AuthReponse>(url, {
      password, email
    })
      .pipe(
        map(res => {
          console.log(res)
          if (res.ok) {
            localStorage.setItem('token', res.token!)

            this._usuario = {
              nombre: res.nombre!,
              uid: res.uid!,
            }
          }
          return res
        }),
        catchError(err => of(err.error.message))
      )

  }

  register(nombre: string, email: string, password: string) {
    const url = `${environment.baseUrl}create`;
    return this.http.post<AuthReponse>(url, { nombre, email, password })
      .pipe(
        tap(res => {

          if (res.ok === true) {
            localStorage.setItem('token', res.token!);
            this._usuario = {
              nombre: res.nombre!,
              uid: res.uid!,

            }
          }
          return res;

        },
          catchError(err => of(err.error.message)))
      )
  }

  validarToken(): Observable<boolean> {
    const url = `${environment.baseUrl}review`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthReponse>(url, { headers })
      .pipe(
        map(res => {
          console.log(res)

          localStorage.setItem('token', res.token!)

          this._usuario = {
            nombre: res.nombre!,
            uid: res.uid!,
            email: res.email!
          }
          return res.ok
        }),
        catchError(err => of(false))
      );

  }

  logout() {
    localStorage.removeItem('token');
  }
}
