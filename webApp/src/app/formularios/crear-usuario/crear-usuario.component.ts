import { Component, OnInit } from '@angular/core';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { Usuario } from 'src/app/model/usuario';
import { Empresa } from 'src/app/model/empresa';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  public usuario: Usuario ;

  public empresas: Array<Empresa>;

  public tiposUsuario = [
    {value: 'ADMIN', viewValue: 'Administrador'},
    {value: 'BASIC', viewValue: 'Normal'}
  ];
  
  constructor(private empresaService: EmpresaServiceService, private usuarioService: UsuarioServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.usuario = {} as Usuario;
    this.empresas = [];
    this.loadAll();
  }

  loadAll() {

    this.empresaService.getAll().subscribe(resp => this.empresas = resp as Array<Empresa>);

  }

  guardar() {

    if (this.usuario.rut == undefined || this.usuario.rut == null || this.usuario.rut == "" || this.usuario.rut.length > 17 || this.validaRut(this.usuario.rut) == false) {

      this.openDialogoError("Rut");
      return false;
    } 

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

    let newUser = {
      rut : this.usuario.rut.toUpperCase(),
      nombre : this.usuario.nombre.toUpperCase(),
      apellido : this.usuario.apellido.toUpperCase(),
      email: this.usuario.email,
      password : this.usuario.password,
      tipoPerfil : this.usuario.tipoPerfil.toUpperCase(), 
      empresaId : this.usuario.empresaId,
      activo: 1
    };

    this.usuarioService.getById(newUser.rut).subscribe((r) => {

      if(r == undefined || r == null || r['rut'] != newUser.rut) {

        this.usuarioService.create(newUser as Usuario).subscribe((resp) => {

          if (resp['status'] == true) {
    
            let dialogOk = this.dialog.open(DialogoSimpleComponent,{
              data: {
                titulo: "Dato Guardado",
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
                titulo: "Dato No Guardado",
                contenido: "Hubo un error al guardar los datos. Intenta nuevamente.",
                salirText : "De acuerdo"
              }
            });
            
            dialogErr.afterClosed().subscribe(result => {  });
          }
        });
      } else {

        let dialogErr = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato No Guardado",
            contenido: "El rut ingresado ya existe.",
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

  validaRut(rutCompleto: string) {
		rutCompleto = rutCompleto.replace("‐","-");
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		
		return (this.dv(rut) == digv );
	}
	dv(T) {
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}

}
