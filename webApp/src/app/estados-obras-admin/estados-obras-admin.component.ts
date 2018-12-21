import { Component, OnInit, ViewChild, ModuleWithComponentFactories } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EmpresaServiceService } from 'src/app/services/empresa-service.service';
import { ProyectoServiceService } from 'src/app/services/proyecto-service.service';
import { ObraServiceService } from 'src/app/services/obra-service.service';
import { EstadosObrasServiceService } from 'src/app/services/estados-obras-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { EstadosTablaComponent } from '../estados-tabla/estados-tabla.component';
import { Empresa } from 'src/app/model/empresa';
import { Proyecto } from 'src/app/model/proyecto';
import swal from'sweetalert2';
import { Obra } from '../model/obra';
import { Estado } from '../model/estado';


@Component({
  selector: 'app-estados-obras-admin',
  templateUrl: './estados-obras-admin.component.html',
  styleUrls: ['./estados-obras-admin.component.css']
})
export class EstadosObrasAdminComponent implements OnInit {

  @ViewChild('tabla') tabla: EstadosTablaComponent;

  public filterText: String;
  public listaEstados: Array<Estado>;
  constructor(private empresaService: EmpresaServiceService, private obraService: ObraServiceService, private estadosObrasService: EstadosObrasServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loadData();
    this.loadSubscribe();
  }

  loadData() {

    this.estadosObrasService.getAll().subscribe( response => {

      this.listaEstados = response as Array<Estado>;
      this.tabla.addData(this.listaEstados);
    }, this.errorCallService);
  }

  filter() {

    console.log("filter "+this.filterText);
    if (this.filterText != undefined && this.filterText != null && this.filterText != "") {
      console.log(" ---filter "+this.filterText);
      let datos = this.listaEstados.filter((d) => 
        d.nombreObra.toUpperCase().includes(this.filterText.toUpperCase())
        || d.fecha.toString().includes(this.filterText.toUpperCase())
        || d.comentario.toString().toUpperCase().includes(this.filterText.toUpperCase())
        || d.titulo.toString().toUpperCase().includes(this.filterText.toUpperCase())
        || d.estadosObrasId.toString().includes(this.filterText.toString())
        || d.nombreEmpresa.toString().toUpperCase().includes(this.filterText.toString().toUpperCase())
        || d.nombreProyecto.toString().toUpperCase().includes(this.filterText.toString().toUpperCase())
      );

      this.tabla.addData(datos);
    } else {
      this.tabla.addData(this.listaEstados);
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

  openEdit(estado: Estado) {

  }

  openDelete(estado: Estado) {

    swal({
      title: 'Eliminar',
      text: '¿Esta seguro que quiere eliminar el dato?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.estadosObrasService.delete(estado.estadosObrasId).subscribe(res => { 

          if (res['status'] == false) {

            swal(
              'Cancelado',
              'El dato no fue eliminado, por que tiene fotos asociadas.',
              'error'
            )

          } else {

            swal(
              'Eliminado!',
              'El dato fue eliminado.',
              'success').then((result) => {
                window.location.href = "estadosadmin";
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
