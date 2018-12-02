import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ProyectoTablaDataSource } from './proyecto-tabla-datasource';

@Component({
  selector: 'app-proyecto-tabla',
  templateUrl: './proyecto-tabla.component.html',
  styleUrls: ['./proyecto-tabla.component.css'],
})
export class ProyectoTablaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ProyectoTablaDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ProyectoTablaDataSource(this.paginator, this.sort);
  }
}
