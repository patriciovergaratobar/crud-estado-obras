import { Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EstadosTablaDataSource } from './estados-tabla-datasource';
import { Estado } from 'src/app/model/estado';


@Component({
  selector: 'app-estados-tabla',
  templateUrl: './estados-tabla.component.html',
  styleUrls: ['./estados-tabla.component.css'],
})
export class EstadosTablaComponent implements OnInit {

  @Output() emitEventEdit:EventEmitter<Estado> = new EventEmitter<Estado>();
  @Output() emitEventDelete:EventEmitter<Estado> = new EventEmitter<Estado>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: EstadosTablaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['estadosObrasId','titulo','nombreObra','fecha','comentario'];


  ngOnInit() {
    this.dataSource = new EstadosTablaDataSource(this.paginator, this.sort, []);
  }

  public addData(datos: Array<Estado>) {

    this.dataSource = new EstadosTablaDataSource(this.paginator, this.sort, datos);
  }

  public edit(dato: Estado) {

    this.emitEventEdit.emit(dato);
  }

  public delete(dato: Estado) {

    this.emitEventDelete.emit(dato);
  }
}
