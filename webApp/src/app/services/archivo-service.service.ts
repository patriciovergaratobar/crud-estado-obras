import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Archivo } from 'src/app/model/archivo';

@Injectable({
  providedIn: 'root'
})
export class ArchivoServiceService {

  BASE_URL: String = 'api/service.php/archivo';

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

  getByEstadoId(id) {

    return this.http.get(this.BASE_URL.toString().concat("/estado/").concat(id.toString()), this.httpOptions );
  }

  create(archivo: Archivo) {

    return this.http.post(this.BASE_URL.toString().concat("/create"),JSON.stringify(archivo), this.httpOptions);
  }

  update(archivo: Archivo) {

    return this.http.put(this.BASE_URL.toString().concat("/update"),JSON.stringify(archivo), this.httpOptions);
  }

  delete(id) {

    return this.http.delete(this.BASE_URL.toString().concat('/delete/').concat(id.toString()), this.httpOptions);
  }

}
