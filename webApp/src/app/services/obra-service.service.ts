import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Obra } from 'src/app/model/obra';

@Injectable({
  providedIn: 'root'
})
export class ObraServiceService {

  BASE_URL: String = 'api/service.php/obra';

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

  getByProyectoId(id) {

    return this.http.get(this.BASE_URL.toString().concat("/proyecto/").concat(id.toString()), this.httpOptions );
  }

  create(obra: Obra) {

    return this.http.post(this.BASE_URL.toString().concat("/create"),JSON.stringify(obra), this.httpOptions);
  }

  update(obra: Obra) {

    return this.http.put(this.BASE_URL.toString().concat("/update"),JSON.stringify(obra), this.httpOptions);
  }

  delete(id) {

    return this.http.delete(this.BASE_URL.toString().concat('/delete/').concat(id.toString()), this.httpOptions);
  }

}
