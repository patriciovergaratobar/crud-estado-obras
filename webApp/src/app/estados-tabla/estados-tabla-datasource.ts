import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {Estado } from 'src/app/model/estado'

export class EstadosTablaDataSource extends DataSource<Estado> {
  data: Estado[] = [];

  
  constructor(private paginator: MatPaginator, private sort: MatSort, datos: Array<Estado>) {
    super();
    this.data = datos;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Estado[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Estado[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Estado[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'estadosObrasId': return compare(a.estadosObrasId, b.estadosObrasId, isAsc);
        case 'titulo': return compare(a.titulo, b.titulo, isAsc);
        case 'nombreObra': return compare(+a.nombreObra, +b.nombreObra, isAsc);
        case 'fecha': return compare(+a.fecha, +b.fecha, isAsc);
        case 'comentario': return compare(+a.comentario, +b.comentario, isAsc);
        case 'nombreProyecto': return compare(+a.nombreProyecto, +b.nombreProyecto, isAsc);
        case 'nombreEmpresa': return compare(+a.nombreEmpresa, +b.nombreEmpresa, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
