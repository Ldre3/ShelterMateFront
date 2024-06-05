import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './ui/login/login.component';
import { HomeComponent } from './ui/home/home.component';
import { RegisterComponent } from './ui/register/register.component';
import { AlberguedetalleComponent } from './ui/alberguedetalle/alberguedetalle.component';
import { RegistroalbergueComponent } from './ui/registroalbergue/registroalbergue.component';
import { EntrarEnAlbergueComponent } from './ui/entrar-en-albergue/entrar-en-albergue.component';
import { AlbergueMainComponent } from './ui/albergue-main/albergue-main.component';
import { NavbarComponent} from "./ui/navbar/navbar.component";
import { PerrodetalleComponent } from './ui/perrodetalle/perrodetalle.component';
import {NgOptimizedImage} from "@angular/common";
import { TablonComponent } from './ui/tablon/tablon.component';
import { BienvenidoComponent } from './ui/bienvenido/bienvenido.component';
import { MensajeDetalleComponent } from './ui/mensaje-detalle/mensaje-detalle.component';
import { AgregarAnuncioComponent } from './ui/agregar-anuncio/agregar-anuncio.component';
import { AltaPerroComponent } from './ui/alta-perro/alta-perro.component';

import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { PerroinformacionComponent } from './ui/perroinformacion/perroinformacion.component';
import { RegistrarPaseoComponent } from './ui/registrar-paseo/registrar-paseo.component';
import { AdoptarPerroComponent } from './ui/adoptar-perro/adoptar-perro.component';
import { RegistrarAdoptanteComponent } from './ui/registrar-adoptante/registrar-adoptante.component';
import { EditarPerroComponent } from './ui/editar-perro/editar-perro.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import { NgToastModule } from "ng-angular-popup";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import { LineBreakPipe } from './pipes/line-break.pipe';
import { ForgotPasswordComponent } from './ui/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './ui/change-password/change-password.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AlberguedetalleComponent,
    RegistroalbergueComponent,
    EntrarEnAlbergueComponent,
    AlbergueMainComponent,
    NavbarComponent,
    PerrodetalleComponent,
    TablonComponent,
    BienvenidoComponent,
    MensajeDetalleComponent,
    AgregarAnuncioComponent,
    AltaPerroComponent,
    PerroinformacionComponent,
    RegistrarPaseoComponent,
    AdoptarPerroComponent,
    RegistrarAdoptanteComponent,
    EditarPerroComponent,
    LineBreakPipe,
    ForgotPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    BackButtonDisableModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgToastModule,
    FontAwesomeModule,
    NgbModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig
    ),
    AngularFireStorageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
