import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Estado } from 'src/app/model/estado';
import { Comentario } from 'src/app/model/comentario';

@Injectable({
  providedIn: 'root'
})
export class EstadosObrasServiceService {

  BASE_URL: String = 'api/service.php/estados';

  httpOptionsDefault = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  httpOptions = {};

  constructor(private http: HttpClient) { 

    var token = localStorage.getItem('sess');
    console.log(token);
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

  getByObraId(id) {

    return this.http.get(this.BASE_URL.toString().concat("/obra/").concat(id.toString()), this.httpOptions );
  }

  create(estado: Estado) {

    return this.http.post(this.BASE_URL.toString().concat("/create"),JSON.stringify(estado), this.httpOptions);
  }

  update(estado: Estado) {

    return this.http.put(this.BASE_URL.toString().concat("/update"),JSON.stringify(estado), this.httpOptions);
  }

  delete(id) {

    return this.http.delete(this.BASE_URL.toString().concat('/delete/').concat(id.toString()), this.httpOptions);
  }

  createComentario(comentario: Comentario) {

    return this.http.post(this.BASE_URL.toString().concat("/createComentario"),JSON.stringify(comentario), this.httpOptions);
  }

  getComentariosById(id) {

    return this.http.get(this.BASE_URL.toString().concat("/comentario/id/").concat(id.toString()), this.httpOptions );
  }

}
