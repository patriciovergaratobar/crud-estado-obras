import { Component, OnInit } from '@angular/core';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import {ProyectoServiceService} from 'src/app/services/proyecto-service.service';
import {ObraServiceService} from 'src/app/services/obra-service.service';
import {EstadosObrasServiceService} from 'src/app/services/estados-obras-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { Obra } from 'src/app/model/obra';
import { Proyecto } from 'src/app/model/proyecto';
import { Empresa } from 'src/app/model/empresa';
import { Estado } from 'src/app/model/estado';

@Component({
  selector: 'app-crear-estado',
  templateUrl: './crear-estado.component.html',
  styleUrls: ['./crear-estado.component.css']
})
export class CrearEstadoComponent implements OnInit {

  
  public estado: Estado;

  public empresas: Array<Empresa>;
  public proyectos: Array<Proyecto>;
  public obras: Array<Obra>;
  public empresaSeleccionada: number;
  public proyectoSeleccionada: number;
  public obraSeleccionada: number;
  
  constructor(private empresaService: EmpresaServiceService, private estadosObrasService: EstadosObrasServiceService, private proyectoService: ProyectoServiceService, private obraService: ObraServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.estado = {} as Estado;
    this.empresaSeleccionada = 0;
    this.proyectoSeleccionada = 0;
    this.obraSeleccionada = 0;
    this.empresas = [];
    this.proyectos = [];
    this.obras = [];
    this.loadAll();
  }

  loadAll() {

    this.empresaService.getAll().subscribe(resp => this.empresas = resp as Array<Empresa>);
    this.proyectoService.getAll().subscribe(resp => this.proyectos = resp as Array<Proyecto>);
    this.obraService.getAll().subscribe(resp => this.obras = resp as Array<Obra>);
  }

  loadProyectosByEmpresa(empresaId) {

    this.proyectoService.getByEmpresaId(empresaId).subscribe(resp => this.proyectos = resp as Array<Proyecto>);
  }

  loadObrasByProyectos(proyectoId) {

    this.obraService.getByProyectoId(proyectoId).subscribe(resp => this.obras = resp as Array<Obra>);
  }

  guardar() {

    if (this.estado.titulo == undefined || this.estado.titulo == null || this.estado.titulo == "") {

      this.openDialogoError("Titulo");
      return false;
    }

    if (this.estado.fecha == undefined || this.estado.fecha == null ) {

      this.openDialogoError("Fecha de Estado");
      return false;
    }

    if (this.estado.comentario == undefined || this.estado.comentario == null || this.estado.comentario == "") {

      this.openDialogoError("Comentario");
      return false;
    }

    if (this.estado.obraId == undefined || this.estado.obraId == null || this.estado.obraId == 0) {

      this.openDialogoError("Obra");
      return false;
    }

    //let date = new Date(this.obra.fechaInicio);
    let newEstado = {
      titulo : this.estado.titulo.toUpperCase(),
      fecha : this.estado.fecha,
      comentario : this.estado.comentario.toUpperCase(),
      obraId : this.estado.obraId
    };

    this.estadosObrasService.create(newEstado as Estado).subscribe((resp) => {

      if (resp['status'] == true) {

        let dialogOk = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato Guardado",
            contenido: "El estado fue guardada exitosamente.",
            salirText : "De acuerdo"
          }
        });
        
        dialogOk.afterClosed().subscribe(result => {
          window.location.href = "estadosadmin";
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
