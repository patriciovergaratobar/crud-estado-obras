import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { ObraServiceService } from 'src/app/services/obra-service.service';
import { ProyectoServiceService } from 'src/app/services/proyecto-service.service';

import { Obra } from 'src/app/model/obra';
import { Empresa } from 'src/app/model/empresa';
import { Proyecto } from 'src/app/model/proyecto';


@Component({
  selector: 'app-editar-obra',
  templateUrl: './editar-obra.component.html',
  styleUrls: ['./editar-obra.component.css']
})
export class EditarObraComponent implements OnInit {

  public obra: Obra;
  public empresas: Array<Empresa>;
  public proyectos: Array<Proyecto>;
  public empresaSeleccionada: number;
  public fechaSeleccionada: Date;
  public isLoading: Boolean;
  
  constructor(private route: ActivatedRoute, private empresaService: EmpresaServiceService, private obraService: ObraServiceService, private proyectoService: ProyectoServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.isLoading = true;
    this.obra = {} as Obra;
    //this.fechaSeleccionada = new Date();
    this.empresaSeleccionada = 0;
    this.obra.obraId = Number.parseInt(this.route.snapshot.paramMap.get('id').toString());
    this.empresas = [];
    this.loadAll();
  }

  loadAll() {

    this.empresaService.getAll().subscribe(resp => { 
      this.empresas = resp as Array<Empresa>;
    
      this.proyectoService.getAll().subscribe(resp => { 
        this.proyectos = resp as Array<Proyecto>;
        
        this.obraService.getById(this.obra.obraId).subscribe(res => {

          this.obra = res as Obra;
          this.fechaSeleccionada = new Date(this.obra.fechaInicio);
          this.proyectoService.getById(this.obra.proyectosId).subscribe(resp => { 

            let proyect = resp as Proyecto;
            this.empresaSeleccionada = proyect.empresaId;
            this.loadProyectosByEmpresa(this.empresaSeleccionada);
            this.isLoading = false;
          });
        });
      });

    });
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

    this.obra.fechaInicio = this.fechaSeleccionada;
    let updateObras = {
      obraId: this.obra.obraId,
      nombreObra : this.obra.nombreObra.toUpperCase(),
      direccion : this.obra.direccion.toUpperCase(),
      fechaInicio : this.obra.fechaInicio,
      proyectosId: this.obra.proyectosId
    };

    this.obraService.update(updateObras as Obra).subscribe((resp) => {

      if (resp['status'] == true) {

        let dialogOk = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato Actualizado",
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
