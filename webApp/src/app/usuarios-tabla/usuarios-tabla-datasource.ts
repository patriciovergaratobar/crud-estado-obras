import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Empresa } from 'src/app/model/empresa';
import { Usuario } from 'src/app/model/usuario';

export class UsuariosTablaDataSource extends DataSource<Usuario> {
  data: Usuario[] = [];

  constructor(private paginator: MatPaginator, private sort: MatSort, datos: Array<Usuario>) {
    super();
    this.data = datos;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Usuario[]> {
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
  private getPagedData(data: Usuario[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Usuario[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'rut': return compare(a.rut, b.rut, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'password': return compare(+a.password, +b.password, isAsc);
        case 'nombre': return compare(+a.nombre, +b.nombre, isAsc);
        case 'apellido': return compare(+a.apellido, +b.apellido, isAsc);
        case 'tipoPerfil': return compare(+a.tipoPerfil, +b.tipoPerfil, isAsc);
        case 'activo': return compare(+a.activo, +b.activo, isAsc);
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
