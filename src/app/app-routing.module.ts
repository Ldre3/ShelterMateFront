import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./ui/login/login.component";
import {HomeComponent} from "./ui/home/home.component";
import {RegisterComponent} from "./ui/register/register.component";
import {RegistroalbergueComponent} from "./ui/registroalbergue/registroalbergue.component";
import {EntrarEnAlbergueComponent} from "./ui/entrar-en-albergue/entrar-en-albergue.component";
import {AlbergueMainComponent} from "./ui/albergue-main/albergue-main.component";
import {BienvenidoComponent} from "./ui/bienvenido/bienvenido.component";
import {TablonComponent} from "./ui/tablon/tablon.component";
import {AgregarAnuncioComponent} from "./ui/agregar-anuncio/agregar-anuncio.component";
import {AltaPerroComponent} from "./ui/alta-perro/alta-perro.component";
import {PerroinformacionComponent} from "./ui/perroinformacion/perroinformacion.component";
import {RegistrarPaseoComponent} from "./ui/registrar-paseo/registrar-paseo.component";
import {AdoptarPerroComponent} from "./ui/adoptar-perro/adoptar-perro.component";
import {RegistrarAdoptanteComponent} from "./ui/registrar-adoptante/registrar-adoptante.component";
import {EditarPerroComponent} from "./ui/editar-perro/editar-perro.component";
import {ForgotPasswordComponent} from "./ui/forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "./ui/change-password/change-password.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'registerAlbergue', component: RegistroalbergueComponent},
  { path: 'entrarEnAlbergue', component: EntrarEnAlbergueComponent},
  { path: 'bienvenido', component: BienvenidoComponent},
  { path: 'lista', component : AlbergueMainComponent},
  { path: 'tablon', component : TablonComponent},
  { path: 'tablon/agregarAnuncio', component: AgregarAnuncioComponent},
  { path: 'lista/altaPerro', component: AltaPerroComponent},
  { path: 'lista/detallePerro/:id', component: PerroinformacionComponent},
  { path: 'lista/registrarPaseo/:id', component: RegistrarPaseoComponent},
  { path: 'lista/adoptarPerro/:id', component: AdoptarPerroComponent},
  { path: 'lista/registrarAdoptante/:id', component: RegistrarAdoptanteComponent},
  { path: 'lista/editarPerro/:id', component: EditarPerroComponent},
  { path: 'recordarPassword', component: ForgotPasswordComponent },
  { path: 'nuevaPassword', component: ChangePasswordComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
