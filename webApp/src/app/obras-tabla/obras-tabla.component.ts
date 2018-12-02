import { Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ObrasTablaDataSource } from './obras-tabla-datasource';
import { Obra } from 'src/app/model/obra';

@Component({
  selector: 'app-obras-tabla',
  templateUrl: './obras-tabla.component.html',
  styleUrls: ['./obras-tabla.component.css'],
})
export class ObrasTablaComponent implements OnInit {

  @Output() emitEventEdit:EventEmitter<Obra> = new EventEmitter<Obra>();
  @Output() emitEventDelete:EventEmitter<Obra> = new EventEmitter<Obra>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ObrasTablaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['obraId','nombreObra','fechaInicio','direccion','nombreProyecto','opciones'];


  ngOnInit() {
    
    this.dataSource = new ObrasTablaDataSource(this.paginator, this.sort, []);
  }

  public addData(datos: Array<Obra>) {

    this.dataSource = new ObrasTablaDataSource(this.paginator, this.sort, datos);
  }

  public edit(dato: Obra) {

    this.emitEventEdit.emit(dato);
  }

  public delete(dato: Obra) {

    this.emitEventDelete.emit(dato);
  }
}
