import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { Usuario } from 'src/app/model/usuario';
import { Empresa } from 'src/app/model/empresa';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  public usuario: Usuario ;

  public empresas: Array<Empresa>;

  public tiposUsuario = [
    {value: 'ADMIN', viewValue: 'Administrador'},
    {value: 'BASIC', viewValue: 'Normal'}
  ];
  
  constructor(private route: ActivatedRoute, private empresaService: EmpresaServiceService, private usuarioService: UsuarioServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.usuario = {} as Usuario;
    this.usuario.rut = this.route.snapshot.paramMap.get('id').toString();

    this.empresas = [];
    this.loadAll();
  }

  loadAll() {

    this.empresaService.getAll().subscribe(resp => this.empresas = resp as Array<Empresa>);
    this.usuarioService.getById(this.usuario.rut).subscribe(res => {
      console.log(res);
      this.usuario = res as Usuario;      
    });
  }

  guardar() {

    console.log(this.usuario);

    if (this.usuario.nombre == undefined || this.usuario.nombre == null || this.usuario.nombre == "" ) {

      this.openDialogoError("Nombre");
      return false;
    }

    if (this.usuario.apellido == undefined || this.usuario.apellido == null || this.usuario.apellido == "" ) {

      this.openDialogoError("Apellido");
      return false;
    }

    if (this.usuario.email == undefined || this.usuario.email == null || this.usuario.email == "" ) {

      this.openDialogoError("E-Mail");
      return false;
    }

    if (this.usuario.password == undefined || this.usuario.password == null || this.usuario.password == "" ) {

      this.openDialogoError("Contraseña");
      return false;
    }

    if (this.usuario.tipoPerfil == undefined || this.usuario.tipoPerfil == null || this.usuario.tipoPerfil == "" ) {

      this.openDialogoError("Tipo Perfil");
      return false;
    }

    if (this.usuario.empresaId == undefined || this.usuario.empresaId == null || this.usuario.empresaId == 0 ) {

      this.openDialogoError("Empresa");
      return false;
    }

    let updateUser = {
      rut : this.usuario.rut.toUpperCase(),
      nombre : this.usuario.nombre.toUpperCase(),
      apellido : this.usuario.apellido.toUpperCase(),
      email: this.usuario.email.toUpperCase(),
      password : this.usuario.password,
      tipoPerfil : this.usuario.tipoPerfil.toUpperCase(), 
      empresaId : this.usuario.empresaId,
      activo: (this.usuario.activo) ? 1: 0
    };

    this.usuarioService.update(updateUser as Usuario).subscribe((resp) => {

      if (resp['status'] == true) {

        let dialogOk = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato Actualizado",
            contenido: "El usuario fue guardada exitosamente.",
            salirText : "De acuerdo"
          }
        });
        
        dialogOk.afterClosed().subscribe(result => {
          window.location.href = "usuariosadmin";
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
