import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Proyecto } from 'src/app/model/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoServiceService {

  BASE_URL: String = 'api/service.php/proyecto';

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

  getById(id) {

    return this.http.get(this.BASE_URL.toString().concat("/id/").concat(id.toString()), this.httpOptions );
  }

  getByEmpresaId(id) {

    return this.http.get(this.BASE_URL.toString().concat("/empresa/").concat(id.toString()), this.httpOptions );
  }

  create(proyecto: Proyecto) {

    return this.http.post(this.BASE_URL.toString().concat("/create"),JSON.stringify(proyecto), this.httpOptions);
  }

  update(proyecto: Proyecto) {

    return this.http.put(this.BASE_URL.toString().concat("/update"),JSON.stringify(proyecto), this.httpOptions);
  }

  delete(id) {

    return this.http.delete(this.BASE_URL.toString().concat('/delete/').concat(id.toString()), this.httpOptions);
  }
}
