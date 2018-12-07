import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { ObraServiceService } from 'src/app/services/obra-service.service';
import { ProyectoServiceService } from 'src/app/services/proyecto-service.service';
import { EstadosObrasServiceService } from 'src/app/services/estados-obras-service.service';

import { Obra } from 'src/app/model/obra';
import { Empresa } from 'src/app/model/empresa';
import { Proyecto } from 'src/app/model/proyecto';
import { Estado } from 'src/app/model/estado';

@Component({
  selector: 'app-editar-estado',
  templateUrl: './editar-estado.component.html',
  styleUrls: ['./editar-estado.component.css']
})
export class EditarEstadoComponent implements OnInit {

  public estado: Estado;
  public nombreEmpresa: String;
  public proyectoSeleccionada: String;
  public empresas: Array<Empresa>;
  public proyectos: Array<Proyecto>;
  public empresaSeleccionada: number;
  public fechaSeleccionada: Date;
  
  constructor(private route: ActivatedRoute, 
    private empresaService: EmpresaServiceService, 
    private obraService: ObraServiceService, 
    private estadosService: EstadosObrasServiceService, 
    private proyectoService: ProyectoServiceService, 
    private dialog: MatDialog) { }

  ngOnInit() {

    this.estado = {} as Estado;
    //this.fechaSeleccionada = new Date();
    this.empresaSeleccionada = 0;
    this.estado.estadosObrasId = Number.parseInt(this.route.snapshot.paramMap.get('id').toString());
    this.empresas = [];
    this.loadAll();
  }

  loadAll() {

    this.empresaService.getAll().subscribe(resp => this.empresas = resp as Array<Empresa>);
    this.proyectoService.getAll().subscribe(resp => { 
      this.proyectos = resp as Array<Proyecto>;
      
    });
    this.estadosService.getById(this.estado.estadosObrasId).subscribe(res => {

      this.estado = res as Estado;
      this.fechaSeleccionada = new Date(this.estado.fecha);

      this.obraService.getById(this.estado.obraId).subscribe(respObra => {

        let obra = respObra as Obra;
        this.proyectoSeleccionada = obra.nombreObra;

        this.proyectoService.getById(obra.proyectosId).subscribe(resp => { 

          let proyect = resp as Proyecto;
          this.nombreEmpresa = proyect.nombreEmpresa;
          this.empresaSeleccionada = proyect.proyectosId;
          this.loadProyectosByEmpresa(this.empresaSeleccionada);

          this.empresaService.getById(proyect.empresaId).subscribe(respEmpresa =>{
            let empresaObj = respEmpresa as Empresa;
            this.nombreEmpresa = empresaObj.nombreEmpresa;
          });
        });
      });

      
    });
    
  }

  loadProyectosByEmpresa(empresaId) {

    this.proyectoService.getByEmpresaId(empresaId).subscribe(resp => this.proyectos = resp as Array<Proyecto>);
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

    this.estado.fecha = this.fechaSeleccionada;
    let updateEstado = {
      estadosObrasId : this.estado.estadosObrasId,
      titulo : this.estado.titulo.toUpperCase(),
      fecha : this.estado.fecha,
      comentario : this.estado.comentario.toUpperCase(),
      obraId : this.estado.obraId
    };

    this.estadosService.update(updateEstado as Estado).subscribe((resp) => {

      if (resp['status'] == true) {

        let dialogOk = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato Actualizado",
            contenido: "El estado de la obra fue guardada exitosamente.",
            salirText : "De acuerdo"
          }
        });
        
        dialogOk.afterClosed().subscribe(result => {
          window.location.href = "estadosadmin";
        });
      } else {

        let dialogErr = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato No Actualizado",
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
