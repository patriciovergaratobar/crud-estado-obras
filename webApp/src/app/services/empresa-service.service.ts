import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Empresa } from 'src/app/model/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaServiceService {

  BASE_URL: String = 'api/service.php/empresa';

  httpOptionsDefault = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  httpOptions = {};

  constructor(private http: HttpClient) { 

    var token = localStorage.getItem('sess');

    if (token != undefined && token != null) {
    
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'authorization-x': token.toString()
        })
      };
    }
  }

  getAll() {

    return this.http.get(this.BASE_URL.toString(), this.httpOptions);
  }

  getById(id) {

    return this.http.get(this.BASE_URL.toString().concat("/id/").concat(id.toString()), this.httpOptions );
  }

  getByRut(rut) {

    return this.http.get(this.BASE_URL.toString().concat("/rut/").concat(rut.toString()), this.httpOptions );
  }

  create(empresa: Empresa) {

    return this.http.post(this.BASE_URL.toString().concat("/create"),JSON.stringify(empresa), this.httpOptions);
  }

  update(empresa: Empresa) {

    return this.http.put(this.BASE_URL.toString().concat("/update"),JSON.stringify(empresa), this.httpOptions);
  }

  delete(id) {

    return this.http.delete(this.BASE_URL.toString().concat('/delete/').concat(id.toString()), this.httpOptions);
  }

}
