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
    UsuariosTablaComponent
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
