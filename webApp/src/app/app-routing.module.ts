import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListasEstadoObrasComponent } from './listas-estado-obras/listas-estado-obras.component';
import { EmpresasAdminComponent } from './empresas-admin/empresas-admin.component';
import { ProyectosAdminComponent } from './proyectos-admin/proyectos-admin.component';
import { ObrasAdminComponent } from './obras-admin/obras-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { ImagenesAdminComponent } from './imagenes-admin/imagenes-admin.component';
import { EstadosObrasAdminComponent } from './estados-obras-admin/estados-obras-admin.component';
import { LoginComponent } from './login/login.component';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';

const routes: Routes = [ {
  path:'',
  component:LoginComponent
}, {
  path:'login',
  component:LoginComponent
},{
  path:'home',
  component:HomeComponent
},{
  path:'estados',
  component:ListasEstadoObrasComponent
},{
  path:'empresasadmin',
  component:EmpresasAdminComponent
},{
  path:'proyectosadmin',
  component:ProyectosAdminComponent
},{
  path:'obrasadmin',
  component:ObrasAdminComponent
},{
  path:'usuariosadmin',
  component:UsuariosAdminComponent
},{
  path:'imagenesadmin',
  component:ImagenesAdminComponent
},{
  path:'estadosadmin',
  component:EstadosObrasAdminComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
