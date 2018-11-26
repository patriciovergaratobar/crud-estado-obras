import { Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EmpresasTablaDataSource } from './empresas-tabla-datasource';
import { Empresa } from 'src/app/model/empresa';

@Component({
  selector: 'app-empresas-tabla',
  templateUrl: './empresas-tabla.component.html',
  styleUrls: ['./empresas-tabla.component.css'],
})
export class EmpresasTablaComponent implements OnInit {

  @Output() emitEventEdit:EventEmitter<Empresa> = new EventEmitter<Empresa>();
  @Output() emitEventDelete:EventEmitter<Empresa> = new EventEmitter<Empresa>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: EmpresasTablaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['empresaId', 'nombreEmpresa', 'rutEmpresa', 'direccion', 'opciones'];

  ngOnInit() {
    this.dataSource = new EmpresasTablaDataSource(this.paginator, this.sort, []);
  }

  public addData(datos: Array<Empresa>) {

    this.dataSource = new EmpresasTablaDataSource(this.paginator, this.sort, datos);
  }

  public edit(dato: Empresa) {

    this.emitEventEdit.emit(dato);
  }

  public delete(dato: Empresa) {

    this.emitEventDelete.emit(dato);
  }
}
