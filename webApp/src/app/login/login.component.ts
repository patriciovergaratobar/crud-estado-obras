import { Component, OnInit, Injectable } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SesionService} from 'src/app/services/sesion.service';
import { EmpresaServiceService } from 'src/app/services/empresa-service.service'
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePass = true;
  isLoading = false;
  public rutLogin = "";
  public passLogin = "";

  constructor( private sesionService: SesionService, private dialog: MatDialog) { }

  ngOnInit() { 

    localStorage.getItem("sess");

    if (localStorage.getItem("sess") != undefined &&
     localStorage.getItem("sess") != null &&
     localStorage.getItem("sess").toString() != "" ) {

      window.location.href = "home";
    }
  }

  /**
   * Funcion que realiza el login.
   * 
   */
  logIn() {

    this.isLoading = true;
    //Falta validaciones
    if(this.validarForm() == false) {
      this.isLoading = false;
      return false;
    }

    this.sesionService.login(this.rutLogin, this.passLogin).subscribe( response => {

      if (response['login'] == 'OFF') {
    
        this.isLoading = false;
        let dialog = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Login Incorrecto",
            contenido: "Tu rut y/o contraseña son incorrectos.",
            salirText : "De acuerdo"
          }
        });
        
        dialog.afterClosed().subscribe(result => {
          if (result == 'confirm') {
            console.log('Cerra');
          }
        });
      }

      if (response['login'] == true) {

        console.log("Usuario o contraseña valida.");
        localStorage.setItem("sess", response['token']);
        let user = response['user'];
        if (user['tipoPerfil'] == 'ADMIN') {
          localStorage.setItem("isAdmin", 'ADMIN');
        } else {
          localStorage.setItem("isAdmin", 'NO');
        }
        localStorage.setItem("user", JSON.stringify(response['user']));

        let usurModel = user as Usuario;
        console.log(usurModel);

        this.sesionService.getEmpresaById(usurModel.empresaId).subscribe(res => {

          localStorage.setItem("empresa", JSON.stringify(res));
          window.location.href = "home";
        });
      }
    });
  }

  /**
   * Funcion que valida el formulario.
   * 
   */
  validarForm() {

    let valido = true;

    if (this.rutLogin == "") {
      valido = false;
      let dialog = this.dialog.open(DialogoSimpleComponent,{
        data: {
          titulo: "Login Incorrecto",
          contenido: "Debes ingresar un rut.",
          salirText : "De acuerdo"
        }
      });
      
      dialog.afterClosed().subscribe(result => {
        if (result == 'confirm') {
          console.log('Cerra');
        }
      });

    } else if (this.passLogin == "") {

      valido = false;
      let dialog = this.dialog.open(DialogoSimpleComponent,{
        data: {
          titulo: "Login Incorrecto",
          contenido: "Debes ingresar la contraseña.",
          salirText : "De acuerdo"
        }
      });
      
      dialog.afterClosed().subscribe(result => {
        if (result == 'confirm') {
          console.log('Cerra');
        }
      });
      
    }

    return valido;
  }


}
