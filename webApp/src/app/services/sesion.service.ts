import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  BASE_URL: String = 'api/service.php';

  httpOptionsDefault = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(rut: String, password: String) {

    
    return this.http.post(this.BASE_URL.toString().concat('/login'), { rut:rut, pass: password}, this.httpOptionsDefault);
  }


  logout(token: String) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization-x': token.toString()
      })
    };
    return this.http.delete(
        this.BASE_URL.toString().concat('/logout/').concat(token.toString()),
        httpOptions
      );
  }
}
