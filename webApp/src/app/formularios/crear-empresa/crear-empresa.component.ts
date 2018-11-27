import { Component, OnInit } from '@angular/core';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { Empresa } from 'src/app/model/empresa';


@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {

  public nombre: String;
  public rut: String;
  public direccion: String;
  public logo: String;
  
  constructor(private empresaService: EmpresaServiceService, private dialog: MatDialog) { }

  ngOnInit() {

  }

  guardar() {


    if (this.nombre == undefined || this.nombre == null || this.nombre == "" || this.nombre.length > 140) {

      this.openDialogoError("Nombre");
      return false;
    } else if (this.rut == undefined || this.rut == null || this.rut == "" || this.rut.length > 14 || this.validaRut(this.rut as string) == false) {

      this.openDialogoError("Rut");
      return false;
    } else if (this.direccion == undefined || this.direccion == null || this.direccion == "" || this.direccion.length > 200) {

      this.openDialogoError("Dirección");
      return false;

    } else if (this.logo == undefined || this.logo == null || this.logo == "" || this.logo.length > 144) {

      this.openDialogoError("URL Logo");
      return false;
    }


    let empresa = {
      nombreEmpresa : this.nombre.toUpperCase(),
      rutEmpresa : this.rut.toUpperCase(),
      direccion : this.direccion.toUpperCase(),
      logo : this.logo
    };

    this.empresaService.create(empresa as Empresa).subscribe((resp) => {

      if (resp['status'] == true) {

        let dialogOk = this.dialog.open(DialogoSimpleComponent,{
          data: {
            titulo: "Dato Guardado",
            contenido: "La empresa fue guardada exitosamente.",
            salirText : "De acuerdo"
          }
        });
        
        dialogOk.afterClosed().subscribe(result => {
          window.location.href = "empresasadmin";
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
