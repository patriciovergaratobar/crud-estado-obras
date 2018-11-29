import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  BASE_URL: String = 'api/service.php/user';

  httpOptionsDefault = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  httpOptions = {};

  constructor(private http: HttpClient) { 

    var token = localStorage.getItem('sess');
    console.log(token);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'authorization-x': token.toString()
      })
    };
  }

  getAll() {

    return this.http.get(this.BASE_URL.toString(), this.httpOptions);
  }

  getById(rut) {

    return this.http.get(this.BASE_URL.toString().concat("/id/").concat(rut.toString()), this.httpOptions );
  }

  create(usuario: Usuario) {

    return this.http.post(this.BASE_URL.toString().concat("/create"),JSON.stringify(usuario), this.httpOptions);
  }

  update(usuario: Usuario) {

    return this.http.put(this.BASE_URL.toString().concat("/update"),JSON.stringify(usuario), this.httpOptions);
  }

  delete(id) {

    return this.http.delete(this.BASE_URL.toString().concat('/delete/').concat(id.toString()), this.httpOptions);
  }
}
