import { Component, OnInit, ViewChild, ModuleWithComponentFactories } from '@angular/core';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import {ProyectoServiceService} from 'src/app/services/proyecto-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { ProyectoTablaComponent } from '../proyecto-tabla/proyecto-tabla.component';
import { Proyecto } from 'src/app/model/proyecto';
import swal from'sweetalert2';

@Component({
  selector: 'app-proyectos-admin',
  templateUrl: './proyectos-admin.component.html',
  styleUrls: ['./proyectos-admin.component.css']
})
export class ProyectosAdminComponent implements OnInit {

  @ViewChild('tabla') tabla: ProyectoTablaComponent;

  public filterText: String;
  public listaProyecto: Array<Proyecto>;
  constructor(private empresaService: EmpresaServiceService,private proyectoService: ProyectoServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loadData();
    this.loadSubscribe();
  }

  loadData() {

    this.proyectoService.getAll().subscribe( response => {

      this.listaProyecto = response as Array<Proyecto>;
      this.tabla.addData(this.listaProyecto);

    }, this.errorCallService);
  }

  filter() {

    console.log("filter "+this.filterText);
    if (this.filterText != undefined && this.filterText != null && this.filterText != "") {
      console.log(" ---filter "+this.filterText);
      let datos = this.listaProyecto.filter((d) => 
        d.proyectosId.toString().includes(this.filterText.toUpperCase())
        || d.nombreProyecto.toUpperCase().includes(this.filterText.toUpperCase())
        || d.descripcion.toUpperCase().includes(this.filterText.toUpperCase())
      
      );

      this.tabla.addData(datos);
    } else {
      this.tabla.addData(this.listaProyecto);
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

  openEdit(proyecto: Proyecto) {

  }

  openDelete(proyecto: Proyecto) {

    swal({
      title: 'Eliminar',
      text: '¿Esta seguro que quiere eliminar el dato?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.proyectoService.delete(proyecto.proyectosId).subscribe(res => { 
          swal(
          'Eliminado!',
          'El dato fue eliminado.',
          'success');
          window.location.href = "proyectosadmin";

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
