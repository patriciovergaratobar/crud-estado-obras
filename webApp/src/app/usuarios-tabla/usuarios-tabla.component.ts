import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UsuariosTablaDataSource } from './usuarios-tabla-datasource';
import { Usuario } from 'src/app/model/usuario'


@Component({
  selector: 'app-usuarios-tabla',
  templateUrl: './usuarios-tabla.component.html',
  styleUrls: ['./usuarios-tabla.component.css'],
})
export class UsuariosTablaComponent implements OnInit {

  @Output() emitEventEdit:EventEmitter<Usuario> = new EventEmitter<Usuario>();
  @Output() emitEventDelete:EventEmitter<Usuario> = new EventEmitter<Usuario>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UsuariosTablaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rut', 'email', 'nombre', 'apellido', 'tipoPerfil', 'activo', 'nombreEmpresa', 'opciones'];

  ngOnInit() {
    this.dataSource = new UsuariosTablaDataSource(this.paginator, this.sort, []);
  }

  public addData(datos: Array<Usuario>) {

    this.dataSource = new UsuariosTablaDataSource(this.paginator, this.sort, datos);
  }

  public edit(dato: Usuario) {

    this.emitEventEdit.emit(dato);
  }

  public delete(dato: Usuario) {

    this.emitEventDelete.emit(dato);
  }
}
