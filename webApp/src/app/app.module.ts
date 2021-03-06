import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { LayoutModule } from '@angular/cdk/layout';
import { 
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule} from '@angular/material';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ListasObrasComponent } from './listas-obras/listas-obras.component';
import { ListasEstadoObrasComponent } from './listas-estado-obras/listas-estado-obras.component';
import { EmpresasAdminComponent } from './empresas-admin/empresas-admin.component';
import { ProyectosAdminComponent } from './proyectos-admin/proyectos-admin.component';
import { ObrasAdminComponent } from './obras-admin/obras-admin.component';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { ImagenesAdminComponent } from './imagenes-admin/imagenes-admin.component';
import { EstadosObrasAdminComponent } from './estados-obras-admin/estados-obras-admin.component';
import { LoginComponent } from './login/login.component';
//import { DialogoSimpleComponent } from './dialogo-simple/dialogo-simple.component';
import { DialogoSimpleComponent } from 'src/app/dialogo-simple/dialogo-simple.component';
import { EmpresasTablaComponent } from './empresas-tabla/empresas-tabla.component';
import { CrearEmpresaComponent } from './formularios/crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './formularios/editar-empresa/editar-empresa.component';
import { EditarUsuarioComponent } from './formularios/editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './formularios/crear-usuario/crear-usuario.component';
import { UsuariosTablaComponent } from './usuarios-tabla/usuarios-tabla.component';
import { CrearProyectoComponent } from './formularios/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './formularios/editar-proyecto/editar-proyecto.component';
import { CrearObraComponent } from './formularios/crear-obra/crear-obra.component';
import { EditarObraComponent } from './formularios/editar-obra/editar-obra.component';
import { CrearEstadoComponent } from './formularios/crear-estado/crear-estado.component';
import { EditarEstadoComponent } from './formularios/editar-estado/editar-estado.component';
import { CrearArchivoComponent } from './formularios/crear-archivo/crear-archivo.component';
import { EditarArchivoComponent } from './formularios/editar-archivo/editar-archivo.component';
import { ProyectoTablaComponent } from './proyecto-tabla/proyecto-tabla.component';
import { ObrasTablaComponent } from './obras-tabla/obras-tabla.component';
import { EstadosTablaComponent } from './estados-tabla/estados-tabla.component';
import { HomeProyectosComponent } from './home-proyectos/home-proyectos.component';
import { HomeEstadosComponent } from './home-estados/home-estados.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    HomeComponent,
    ListasObrasComponent,
    ListasEstadoObrasComponent,
    EmpresasAdminComponent,
    ProyectosAdminComponent,
    ObrasAdminComponent,
    UsuariosAdminComponent,
    ImagenesAdminComponent,
    EstadosObrasAdminComponent,
    LoginComponent,
    DialogoSimpleComponent,
    EmpresasTablaComponent,
    CrearEmpresaComponent,
    EditarEmpresaComponent,
    EditarUsuarioComponent,
    CrearUsuarioComponent,
    UsuariosTablaComponent,
    CrearProyectoComponent,
    EditarProyectoComponent,
    CrearObraComponent,
    EditarObraComponent,
    CrearEstadoComponent,
    EditarEstadoComponent,
    CrearArchivoComponent,
    EditarArchivoComponent,
    ProyectoTablaComponent,
    ObrasTablaComponent,
    EstadosTablaComponent,
    HomeProyectosComponent,
    HomeEstadosComponent
  ],
  entryComponents: [
    DialogoSimpleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
