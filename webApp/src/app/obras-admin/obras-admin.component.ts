import { Component, OnInit, ViewChild, ModuleWithComponentFactories } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EmpresaServiceService } from 'src/app/services/empresa-service.service';
import { ProyectoServiceService } from 'src/app/services/proyecto-service.service';
import { ObraServiceService } from 'src/app/services/obra-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { ObrasTablaComponent } from '../obras-tabla/obras-tabla.component';
import { Empresa } from 'src/app/model/empresa';
import { Proyecto } from 'src/app/model/proyecto';
import swal from'sweetalert2';
import { Obra } from '../model/obra';

@Component({
  selector: 'app-obras-admin',
  templateUrl: './obras-admin.component.html',
  styleUrls: ['./obras-admin.component.css']
})
export class ObrasAdminComponent implements OnInit {

  @ViewChild('tabla') tabla: ObrasTablaComponent;

  public filterText: String;
  public listaObras: Array<Obra>;
  constructor(private empresaService: EmpresaServiceService, private ObraService: ObraServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loadData();
    this.loadSubscribe();
  }

  loadData() {

    this.ObraService.getAll().subscribe( response => {

      this.listaObras = response as Array<Obra>;
      this.tabla.addData(this.listaObras);
    }, this.errorCallService);
  }

  filter() {

    console.log("filter "+this.filterText);
    if (this.filterText != undefined && this.filterText != null && this.filterText != "") {
      console.log(" ---filter "+this.filterText);
      let datos = this.listaObras.filter((d) => 
        d.obraId.toString().includes(this.filterText.toUpperCase())
        || d.nombreObra.toUpperCase().includes(this.filterText.toUpperCase())
        || d.fechaInicio.toString().includes(this.filterText.toUpperCase())
        || d.direccion.toString().includes(this.filterText.toUpperCase())
        || d.nombreProyecto.toString().includes(this.filterText.toUpperCase())

      );

      this.tabla.addData(datos);
    } else {
      this.tabla.addData(this.listaObras);
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

  openEdit(Obra: Obra) {

  }

  openDelete(Obra: Obra) {

    swal({
      title: 'Eliminar',
      text: '¿Esta seguro que quiere eliminar el dato?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.ObraService.delete(Obra.obraId).subscribe(res => { 

          if (res['status'] == false) {

            swal(
              'Cancelado',
              'El dato no fue eliminado, por que tiene estados asociados.',
              'error'
            )

          } else {

            swal(
              'Eliminado!',
              'El dato fue eliminado.',
              'success').then((result) => {
                window.location.href = "obrasadmin";
              }); 
          }
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
