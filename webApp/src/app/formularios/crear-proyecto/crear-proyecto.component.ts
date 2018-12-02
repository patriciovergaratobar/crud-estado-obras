import { Component, OnInit } from '@angular/core';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { ProyectoServiceService } from 'src/app/services/proyecto-service.service';
import { Proyecto } from 'src/app/model/proyecto';
import { Empresa } from 'src/app/model/empresa';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {

  public proyecto: Proyecto ;

  public empresas: Array<Empresa>;

  constructor(private empresaService: EmpresaServiceService, private proyectoService: ProyectoServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.proyecto = {} as Proyecto;
    this.empresas = [];
    this.loadAll();
  }

  loadAll() {

    this.empresaService.getAll().subscribe(resp => this.empresas = resp as Array<Empresa>);
  }

  guardar() {

    if (this.proyecto.nombreProyecto == undefined || this.proyecto.nombreProyecto == null || this.proyecto.nombreProyecto == "" || this.proyecto.nombreProyecto.length > 100) {

      this.openDialogoError("Nombre");
      return false;
    }
    if (this.proyecto.descripcion == undefined || this.proyecto.descripcion == null || this.proyecto.descripcion == "" || this.proyecto.descripcion.length > 500) {

      this.openDialogoError("Descripción");
      return false;
    } 
    if (this.proyecto.empresaId == undefined || this.proyecto.empresaId == null || this.proyecto.empresaId == 0) {

      this.openDialogoError("Empresa");
      return false;
    } 


    let newProyecto = {

      nombreProyecto : this.proyecto.nombreProyecto.toUpperCase(),
      descripcion : this.proyecto.descripcion.toUpperCase(),
      empresaId : this.proyecto.empresaId
    };

    this.proyectoService.create(newProyecto as Proyecto).subscribe((resp) => {

      if (resp['status'] == true) {

        let dialogOk = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato Guardado",
            contenido: "El proyecto fue guardada exitosamente.",
            salirText : "De acuerdo"
          }
        });
        
        dialogOk.afterClosed().subscribe(result => {
          window.location.href = "proyectosadmin";
        });
      } else {

        let dialogErr = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato No Guardado",
            contenido: "Hubo un error al guardar los datos. Intenta nuevamente.",
            salirText : "De acuerdo"
          }
        });
        
        dialogErr.afterClosed().subscribe(result => {  });
      }
    });
  }

  openDialogoError(nombreCampo) {

    let dialog = this.dialog.open(DialogoSimpleComponent,{
      data: {
        titulo: "Campo Incorrecto",
        contenido: "El campo " + nombreCampo + " es incorrectos.",
        salirText : "De acuerdo"
      }
    });
    
    dialog.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        console.log('Cerra');
      }
    });
  }

}
