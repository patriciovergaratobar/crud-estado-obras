import { Component, OnInit, ViewChild, ModuleWithComponentFactories } from '@angular/core';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { EmpresasTablaComponent } from '../empresas-tabla/empresas-tabla.component';
import { Empresa } from 'src/app/model/empresa';
import swal from'sweetalert2';


@Component({
  selector: 'app-empresas-admin',
  templateUrl: './empresas-admin.component.html',
  styleUrls: ['./empresas-admin.component.css']
})
export class EmpresasAdminComponent implements OnInit {

  @ViewChild('tabla') tabla: EmpresasTablaComponent;

  public filterText: String;
  public listaEmpresas: Array<Empresa>;
  constructor(private empresaService: EmpresaServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loadData();
    this.loadSubscribe();
  }

  loadData() {

    this.empresaService.getAll().subscribe( response => {

      this.listaEmpresas = response as Array<Empresa>;
      this.tabla.addData(this.listaEmpresas);

    }, this.errorCallService);
  }

  filter() {

    console.log("filter "+this.filterText);
    if (this.filterText != undefined && this.filterText != null && this.filterText != "") {
      console.log(" ---filter "+this.filterText);
      let datos = this.listaEmpresas.filter((d) => 
        d.direccion.toUpperCase().includes(this.filterText.toUpperCase())
        || d.nombreEmpresa.toUpperCase().includes(this.filterText.toUpperCase())
        || d.rutEmpresa.toUpperCase().includes(this.filterText.toUpperCase())
        || d.empresaId.toString().includes(this.filterText.toUpperCase())
      );

      this.tabla.addData(datos);
    } else {
      this.tabla.addData(this.listaEmpresas);
    }
    

  }

  loadSubscribe() {

    this.tabla.emitEventEdit.subscribe( res => this.openEdit(res));

    this.tabla.emitEventDelete.subscribe( res => this.openDelete(res));

  }

  errorCallService (error) {

    if (error.status == 203) {

      localStorage.clear();
      window.location.href = "login";
    }
  }

  openCreate(){

  }

  openEdit(empresa: Empresa) {

  }

  openDelete(empresa: Empresa) {

    swal({
      title: 'Eliminar',
      text: '¿Esta seguro que quiere eliminar el dato?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.empresaService.delete(empresa.empresaId).subscribe(res => { 
          swal(
          'Eliminado!',
          'El dato fue eliminado.',
          'success');
          window.location.href = "empresasadmin";

      });

      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelado',
          'El dato no fue eliminado',
          'error'
        )
      }
    });
  }

}
