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
  selector: 'app-home-estados',
  templateUrl: './home-estados.component.html',
  styleUrls: ['./home-estados.component.css']
})
export class HomeEstadosComponent implements OnInit {
  public obra: Obra;
  public estadosObra: Array<Estado>;
  public proyecto: Proyecto;

  constructor(private route: ActivatedRoute, 
  private obrasService: ObraServiceService,
  private proyectoService: ProyectoServiceService,
  private estadosService: EstadosObrasServiceService,
  private fotoService: ArchivoServiceService) { }

  ngOnInit() {

    this.proyecto = {} as Proyecto;
    this.obra = {} as Obra;
    this.estadosObra = [] as Array<Estado>;

    this.obra.obraId = Number.parseInt(this.route.snapshot.paramMap.get('id').toString());
    //this.proyecto.proyectosId = Number.parseInt(this.route.snapshot.paramMap.get('id').toString());
    this.loadAll();
  }

  loadAll() {

    this.estadosService.getByObraId(this.obra.obraId).subscribe(resp => {

      this.estadosObra = resp as Array<Estado>;

      this.estadosObra.forEach(
        estado => this.fotoService.getByEstadoId(estado.estadosObrasId)
        .subscribe(
          files => estado.fotos = files as Array<Archivo>
        )
      );


      
      this.obrasService.getById(this.obra.obraId).subscribe(res => {
        
        this.obra = res as Obra;
        
        this.proyectoService.getById(this.obra.proyectosId).subscribe(res => {

          this.proyecto = res as Proyecto;
        });
      });
    });
  }


  public displayModal: String = "none";
  public modalImgSrc: String = "";

  clickOpenModalImg(srcImg) {

    this.modalImgSrc = srcImg;
    this.displayModal = "block"
  }

  clickcloseModalImg() {

    this.displayModal = "none"
  }
  
}
