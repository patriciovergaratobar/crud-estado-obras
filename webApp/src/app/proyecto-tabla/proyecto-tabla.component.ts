import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ProyectoTablaDataSource } from './proyecto-tabla-datasource';
import { Proyecto } from 'src/app/model/proyecto';

@Component({
  selector: 'app-proyecto-tabla',
  templateUrl: './proyecto-tabla.component.html',
  styleUrls: ['./proyecto-tabla.component.css'],
})
export class ProyectoTablaComponent implements OnInit {

  @Output() emitEventEdit:EventEmitter<Proyecto> = new EventEmitter<Proyecto>();
  @Output() emitEventDelete:EventEmitter<Proyecto> = new EventEmitter<Proyecto>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ProyectoTablaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['proyectosId', 'nombreProyecto', 'descripcion', 'empresaId', 'nombreEmpresa'];

  ngOnInit() {

    this.dataSource = new ProyectoTablaDataSource(this.paginator, this.sort, []);
  }

  public addData(datos: Array<Proyecto>) {

    this.dataSource = new ProyectoTablaDataSource(this.paginator, this.sort, datos);
  }

  public edit(dato: Proyecto) {

    this.emitEventEdit.emit(dato);
  }

  public delete(dato: Proyecto) {

    this.emitEventDelete.emit(dato);
  }
}
