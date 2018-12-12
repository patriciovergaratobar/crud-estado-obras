import { Component, OnInit  } from '@angular/core';
import {Router} from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {SesionService} from 'src/app/services/sesion.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Empresa } from '../model/empresa';

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

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private sesionService: SesionService) {
    
  }

  ngOnInit() {

    this.empresa = {} as Empresa;
    this.validarPath(); 
    let token = localStorage.getItem('sess');
    
    if (token != undefined && token != null && token != "" && token.length > 5) {

      this.isloging = true;
      let admin = localStorage.getItem('isAdmin');
      if (admin == 'ADMIN') {
        this.isAdmin = true;
      }

      this.empresa = JSON.parse(localStorage.getItem('empresa')) as Empresa;

    }
  }

  validarPath() {

    this.router.events.subscribe((call:any) => {
    
      console.log(call.url);

      if (call.url == undefined) {
        return false;
      }
      console.log(call.url == '/home');
      if (call.url == '/home') {
        
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
