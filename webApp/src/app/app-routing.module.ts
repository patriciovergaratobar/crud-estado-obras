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
import { CrearEmpresaComponent } from './formularios/crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './formularios/editar-empresa/editar-empresa.component';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { CrearUsuarioComponent } from './formularios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './formularios/editar-usuario/editar-usuario.component';
import { CrearProyectoComponent } from './formularios/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './formularios/editar-proyecto/editar-proyecto.component';
import { CrearObraComponent } from './formularios/crear-obra/crear-obra.component';
import { EditarObraComponent } from './formularios/editar-obra/editar-obra.component';
import { CrearEstadoComponent } from './formularios/crear-estado/crear-estado.component';
import { EditarEstadoComponent } from './formularios/editar-estado/editar-estado.component';

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
  path:'crear-empresasadmin',
  component:CrearEmpresaComponent
},{
  path:'editar-empresasadmin/:id',
  component:EditarEmpresaComponent
},{
  path:'proyectosadmin',
  component:ProyectosAdminComponent
},{
  path:'crear-proyectosadmin',
  component:CrearProyectoComponent
},{
  path:'editar-proyectosadmin/:id',
  component:EditarProyectoComponent
},{
  path:'obrasadmin',
  component:ObrasAdminComponent
},{
  path:'crear-obrasadmin',
  component: CrearObraComponent
},{
  path:'editar-obrasadmin/:id',
  component:EditarObraComponent
},{
  path:'usuariosadmin',
  component:UsuariosAdminComponent
},{
  path:'crear-usuariosadmin',
  component:CrearUsuarioComponent
},{
  path:'editar-usuariosadmin/:id',
  component:EditarUsuarioComponent
},{
  path:'imagenesadmin',
  component:ImagenesAdminComponent
},{
  path:'estadosadmin',
  component:EstadosObrasAdminComponent
},{
  path:'crear-estadosadmin',
  component: CrearEstadoComponent
},{
  path:'editar-estadosadmin/:id',
  component:EditarEstadoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
