import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { ObraServiceService } from 'src/app/services/obra-service.service';
import { ProyectoServiceService } from 'src/app/services/proyecto-service.service';
import { EstadosObrasServiceService } from 'src/app/services/estados-obras-service.service';
import { ArchivoServiceService } from 'src/app/services/archivo-service.service';
import swal from'sweetalert2';

import { Archivo } from 'src/app/model/archivo';
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
  public fotos: Array<Archivo>;
  public empresaSeleccionada: number;
  public fechaSeleccionada: Date;

  public selectedFile: File;
  public fileSeleccionado: String;
  public fileBase64: String;
  public descripcionFile: String;

  public isLoading: Boolean;

  constructor(private route: ActivatedRoute, 
    private empresaService: EmpresaServiceService, 
    private obraService: ObraServiceService, 
    private estadosService: EstadosObrasServiceService, 
    private proyectoService: ProyectoServiceService,
    private fotoService: ArchivoServiceService, 
    private dialog: MatDialog) { }

  ngOnInit() {

    this.isLoading = true;
    this.fileBase64 = "";
    this.descripcionFile = "";
    this.fileSeleccionado = "";

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
    this.loadFotosByEstado();
  }

  loadFotosByEstado() {

    this.isLoading = true;
    this.fotos = [];
    this.fotoService.getByEstadoId(this.estado.estadosObrasId).subscribe(
      
      (resp) => {
        this.isLoading = false;
        this.fotos = resp as Array<Archivo>;
      }
    );
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

  uploadFoto() {

    this.isLoading = true;
    this.fileBase64 = localStorage.getItem("imgSave").toString();
    console.log(this.fileBase64);

    console.log(this.descripcionFile);
    if (this.fileBase64 == undefined || this.fileBase64 == null || this.fileBase64 == "" || this.fileBase64.length == 0) {

      this.openDialogoError("Imagen");
      this.isLoading = false;
      return false;
    }

    if (this.descripcionFile == undefined || this.descripcionFile == null || this.descripcionFile == "" || this.descripcionFile.length == 0) {

      this.openDialogoError("Descripción");
      this.isLoading = false;
      return false;
    }

    var newArchivo = {} as Archivo;
    newArchivo.archivos = this.fileBase64.toString();
    newArchivo.comentario = this.descripcionFile.toString().toUpperCase();
    newArchivo.estadosObrasId =  this.estado.estadosObrasId;
    newArchivo.tipoArchivo = this.selectedFile.type;

    this.fotoService.create(newArchivo).subscribe((resp) => {

      if (resp['status'] == true) {

        let dialogOk = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato Guardado",
            contenido: "La imagen fue guardada exitosamente.",
            salirText : "De acuerdo"
          }
        });

        localStorage.removeItem("imgSave");
        this.fileBase64 = "";
        this.descripcionFile = "";
        this.fileSeleccionado = "";
        this.isLoading = false;
        this.loadFotosByEstado();
        
      } else {

        let dialogErr = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato No Guardado",
            contenido: "Hubo un error al guardar los datos. Intenta nuevamente.",
            salirText : "De acuerdo"
          }
        });
        
        dialogErr.afterClosed().subscribe(result => {  });
        this.isLoading = false;
      }
    });
    
  }

  changeEvent($event){


    this.selectedFile = $event.target.files[0] as File;
    this.fileSeleccionado = this.selectedFile.name;

    var reader = new FileReader();
    
    reader.onload = (function(theFile) {
      return function(e) {
        var binaryData = e.target.result;
        var base64String = window.btoa(binaryData);
        this.fileBase64 = base64String.toString();

        localStorage.setItem("imgSave", base64String.toString());
        console.log(base64String);
        //console.log(this.fileBase64);
      };
    })(this.selectedFile);
    
    reader.readAsBinaryString(this.selectedFile);
  }

  deleteFoto(foto: Archivo) {

    this.fotoService.delete(foto.fotoid).subscribe(resp => this.loadFotosByEstado());
  }

  openViewImg(foto: Archivo) {

    console.log(foto);
    swal({
      html: "<img style='max-width: 450px;' src='data:image/jpeg;base64," + foto.archivos +"' /> ",
      showCloseButton: true
    });
  }

}
