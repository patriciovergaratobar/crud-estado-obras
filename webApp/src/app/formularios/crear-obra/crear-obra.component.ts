import { Component, OnInit } from '@angular/core';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import {ProyectoServiceService} from 'src/app/services/proyecto-service.service';
import {ObraServiceService} from 'src/app/services/obra-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { Obra } from 'src/app/model/obra';
import { Proyecto } from 'src/app/model/proyecto';
import { Empresa } from 'src/app/model/empresa';

@Component({
  selector: 'app-crear-obra',
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.css']
})
export class CrearObraComponent implements OnInit {

  public obra: Obra;

  public empresas: Array<Empresa>;
  public proyectos: Array<Proyecto>;
  public empresaSeleccionada: number;
  
  constructor(private empresaService: EmpresaServiceService, private proyectoService: ProyectoServiceService, private obraService: ObraServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.obra = {} as Obra;
    this.empresaSeleccionada = 0;
    this.empresas = [];
    this.proyectos = [];
    this.loadAll();
  }

  loadAll() {

    this.empresaService.getAll().subscribe(resp => this.empresas = resp as Array<Empresa>);
    this.proyectoService.getAll().subscribe(resp => this.proyectos = resp as Array<Proyecto>);
  }

  loadProyectosByEmpresa(empresaId) {

    this.proyectoService.getByEmpresaId(empresaId).subscribe(resp => this.proyectos = resp as Array<Proyecto>);
  }

  guardar() {

    if (this.obra.nombreObra == undefined || this.obra.nombreObra == null || this.obra.nombreObra == "" || this.obra.nombreObra.length > 140 ) {

      this.openDialogoError("Nombre");
      return false;
    } 

    if (this.obra.fechaInicio == undefined || this.obra.fechaInicio == null ) {

      this.openDialogoError("Fecha Inicio");
      return false;
    }

    if (this.obra.direccion == undefined || this.obra.direccion == null || this.obra.direccion == "" ) {

      this.openDialogoError("Dirección");
      return false;
    }

    if (this.obra.proyectosId == undefined || this.obra.proyectosId == null || this.obra.proyectosId == 0 ) {

      this.openDialogoError("Proyecto");
      return false;
    }

    //let date = new Date(this.obra.fechaInicio);
    let newObras = {
      nombreObra : this.obra.nombreObra.toUpperCase(),
      direccion : this.obra.direccion.toUpperCase(),
      fechaInicio : this.obra.fechaInicio,
      proyectosId: this.obra.proyectosId
    };

    this.obraService.create(newObras as Obra).subscribe((resp) => {

      if (resp['status'] == true) {

        let dialogOk = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato Guardado",
            contenido: "La obra fue guardada exitosamente.",
            salirText : "De acuerdo"
          }
        });
        
        dialogOk.afterClosed().subscribe(result => {
          window.location.href = "obrasadmin";
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
