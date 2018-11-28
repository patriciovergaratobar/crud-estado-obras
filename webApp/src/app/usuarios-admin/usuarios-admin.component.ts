import { Component, OnInit, ViewChild, ModuleWithComponentFactories } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { EmpresaServiceService } from 'src/app/services/empresa-service.service';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { UsuariosTablaComponent } from '../usuarios-tabla/usuarios-tabla.component';
import { Empresa } from 'src/app/model/empresa';
import swal from'sweetalert2';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {

  
  @ViewChild('tabla') tabla: UsuariosTablaComponent;

  public filterText: String;
  public listaUsuarios: Array<Usuario>;
  constructor(private empresaService: EmpresaServiceService, private usuarioService: UsuarioServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loadData();
    this.loadSubscribe();
  }

  loadData() {

    this.usuarioService.getAll().subscribe( response => {

      this.listaUsuarios = response as Array<Usuario>;
      this.tabla.addData(this.listaUsuarios);

    }, this.errorCallService);
  }

  filter() {

    console.log("filter "+this.filterText);
    if (this.filterText != undefined && this.filterText != null && this.filterText != "") {
      console.log(" ---filter "+this.filterText);
      let datos = this.listaUsuarios.filter((d) => 
        d.rut.toUpperCase().includes(this.filterText.toUpperCase())
        || d.nombre.toUpperCase().includes(this.filterText.toUpperCase())
        || d.apellido.toUpperCase().includes(this.filterText.toUpperCase())
        || d.email.toString().includes(this.filterText.toUpperCase())
        || d.activo.toString().includes(this.filterText.toUpperCase())
        || d.tipoPerfil.toString().includes(this.filterText.toUpperCase())

      );

      this.tabla.addData(datos);
    } else {
      this.tabla.addData(this.listaUsuarios);
    }
    

  }

  loadSubscribe() {

    this.tabla.emitEventEdit.subscribe( res => this.openEdit(res));

    this.tabla.emitEventDelete.subscribe( res => this.openDelete(res));

  }

  errorCallService (error) {

    if (error.status == 203) {

      localStorage.clear();
      window.location.href = "login";
    }
  }

  openCreate(){

  }

  openEdit(usuario: Usuario) {

  }

  openDelete(usuario: Usuario) {

    swal({
      title: 'Eliminar',
      text: '¿Esta seguro que quiere eliminar el dato?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.delete(usuario.rut).subscribe(res => { 
          swal(
          'Eliminado!',
          'El dato fue eliminado.',
          'success');
          window.location.href = "usuariosadmin";

      });

      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Cancelado',
          'El dato no fue eliminado',
          'error'
        )
      }
    });
  }
}
