import { Component, OnInit  } from '@angular/core';
import {Router} from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {SesionService} from 'src/app/services/sesion.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {EmpresaServiceService} from 'src/app/services/empresa-service.service';
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
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
})
export class MenuPrincipalComponent implements OnInit  {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public isHome;

  public empresa: Empresa;

  public isloging = false;

  public isAdmin = false;

  public proyectos: Array<Proyecto>;
  public obras: Array<Obra>;
  public estados: Array<Estado>;

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private sesionService: SesionService,
    private empresaService: EmpresaServiceService,
    private obrasService: ObraServiceService,
    private proyectosService: ProyectoServiceService,
    private estadosServices: EstadosObrasServiceService) {}

  ngOnInit() {

    this.empresa = {} as Empresa;
     
    let token = localStorage.getItem('sess');
    
    if (token != undefined && token != null && token != "" && token.length > 5) {

      this.validarPath();
      this.isloging = true;
      let admin = localStorage.getItem('isAdmin');
      if (admin == 'ADMIN') {
        this.isAdmin = true;
      }

      this.empresa = JSON.parse(localStorage.getItem('empresa')) as Empresa;

    }
  }

  loadDataHome() {

    this.proyectos = [];
    this.obras = [];
    this.estados = [];

    
    if (this.isAdmin) {

      this.proyectosService.getAll().subscribe( resp => this.proyectos = resp as Array<Proyecto>);
    } else {

      this.proyectosService.getByEmpresaId(this.empresa.empresaId).subscribe( resp => this.proyectos = resp as Array<Proyecto>);
    }
  }

  loadObrasByProyecto(id) {

    this.obrasService.getByProyectoId(id).subscribe( resp => this.obras = resp as Array<Obra>);
  }

  loadEstadosByObras(id) {

    this.estadosServices.getByObraId(id).subscribe( resp => this.estados = resp as Array<Estado>);
  }

  validarPath() {

    this.router.events.subscribe((call:any) => {
          
      var token = localStorage.getItem('sess');
    
      if(call.url == '/login') {

        return false;
      }

      if (token == undefined || token == null || token == "" && call.url != '/login') {

        window.location.href = "login";
        return false;
      }
      

      if (call.url == undefined) {
        return false;
      }
      
      if (call.url == '/home' || call.url.indexOf('/home-proyecto')  >= 0 || call.url.indexOf('/home-estados')  >= 0) {

        this.loadDataHome();
        this.isHome = true;
      } else {

        this.isHome = false;
      }
    });
  }

  logOut() {
/*
    this.sesionService.logout(localStorage.getItem('sess')).subscribe( response => {
      localStorage.clear();
      window.location.href = "login";
    });*/

    localStorage.clear();
    window.location.href = "login";
  }

}
