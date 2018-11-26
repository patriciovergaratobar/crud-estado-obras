import { Component, OnInit, ViewChild, ModuleWithComponentFactories } from '@angular/core';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
import { MatDialog } from '@angular/material';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { EmpresasTablaComponent } from '../empresas-tabla/empresas-tabla.component';
import { Empresa } from 'src/app/model/empresa';

@Component({
  selector: 'app-empresas-admin',
  templateUrl: './empresas-admin.component.html',
  styleUrls: ['./empresas-admin.component.css']
})
export class EmpresasAdminComponent implements OnInit {

  @ViewChild('tabla') tabla: EmpresasTablaComponent;

  constructor(private empresaService: EmpresaServiceService, private dialog: MatDialog) { }

  ngOnInit() {

    this.loadData();
    this.loadSubscribe();
  }

  loadData() {

    this.empresaService.getAll().subscribe( response => {

      console.log(response);

      this.tabla.addData(response as Array<Empresa>);

    }, this.errorCallService);
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

  openEdit(empresa: Empresa) {

  }

  openDelete(empresa: Empresa) {

  }

}
