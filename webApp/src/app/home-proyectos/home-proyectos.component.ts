import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-home-proyectos',
  templateUrl: './home-proyectos.component.html',
  styleUrls: ['./home-proyectos.component.css']
})
export class HomeProyectosComponent implements OnInit {

  public obras: Array<Obra>;
  public proyecto: Proyecto;
  public isLoading: Boolean;

  constructor(private route: ActivatedRoute, 
    private obrasService: ObraServiceService,
  private proyectoService: ProyectoServiceService) { }

  ngOnInit() {

    this.isLoading = true;
    this.proyecto = {} as Proyecto;
    this.obras = [] as Array<Obra>;

    this.proyecto.proyectosId = Number.parseInt(this.route.snapshot.paramMap.get('id').toString());
    this.loadAll();
  }

  loadAll() {

    this.proyectoService.getById(this.proyecto.proyectosId).subscribe(res => {

      this.proyecto = res as Proyecto;
      this.isLoading = false;  
    });

    this.obrasService.getByProyectoId(this.proyecto.proyectosId).subscribe(resp =>{
       this.obras = resp as Array<Obra>;
       this.isLoading = false;
      
    });
  }

}
