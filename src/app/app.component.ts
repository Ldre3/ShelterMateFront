import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {AlbergueServiceService} from "./services/albergue-service.service";
import {  Subscription } from "rxjs";
import {UsuarioService} from "./services/usuario.service";
import {PerrosService} from "./services/perros.service";
import {SessionServiceService} from "./services/session-service.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit{

  albergueSelected: boolean = false;
  idAlbergue:number = 0;
  private albergueSelectedSubscription!: Subscription;


  constructor(private toast:NgToastService, private sesion:SessionServiceService, private router: Router, private albergueService: AlbergueServiceService, private usuarioService: UsuarioService, private perros:PerrosService) {
    this.albergueSelectedSubscription = this.albergueService.albergueSelectedChanged.subscribe(
      (albergueSelected: boolean) => {
        this.albergueSelected = albergueSelected;
      }
    );

    // Metodo para controlar la navegacion y redirigir al login si no hay usuario logueado

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {

        if (!this.sesion.get() && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/recordarPassword') {
          this.router.navigate(['/login']);
          this.albergueService.unselectAlbergue();
        }

      }
    });


  }

  ngOnInit() {
    // Cargar datos de la sesion
    let usuario = this.sesion.get();
    // Si hay usuario en la sesion, cargarlo en el servicio de usuario y marcar como logueado y si no redirigir al login
    if (usuario){
      this.usuarioService.usuario = JSON.parse(usuario);
      this.usuarioService.status = true;
      this.usuarioService.password = localStorage.getItem("pass") || '';
    }else {
      this.usuarioService.logout();
      this.sesion.clear();
    }
    // Cargar datos de la sesion
    this.perros.listaPerros = JSON.parse(localStorage.getItem("listaPerros") || '[]');

    this.albergueSelected = localStorage.getItem("selected") === "true";
    // @ts-ignore
    this.idAlbergue = parseInt(localStorage.getItem("albergue")?.id || 0);
    this.albergueService.setAlbergue(JSON.parse(localStorage.getItem("albergue") || '{}'));
    if (this.idAlbergue !=0) { // @ts-ignore
      this.albergueService.albergue.id = this.idAlbergue;
    }

    if (!this.usuarioService.status && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/recordarPassword') {
      this.router.navigate(['/login']);
      this.albergueService.unselectAlbergue();
    }



  }

  ngAfterViewInit() {
    if (!this.albergueSelected && (window.location.pathname.includes("/lista")||window.location.pathname.includes("/tablon")||window.location.pathname.includes("/perfil")||window.location.pathname.includes("/mensajes")||window.location.pathname.includes("/perfil")||window.location.pathname.includes("/perfil")||window.location.pathname.includes("/bienvenido"))) {
      this.router.navigate(['/home']);
    }
  }
  // Metodo para guardar los datos en el localstorage al cerrar la ventana o recargar
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    localStorage.setItem("selected", String(this.albergueSelected));
    localStorage.setItem("albergue", JSON.stringify(this.albergueService.albergue));
    localStorage.setItem("listaPerros", JSON.stringify(this.perros.listaPerros));
    localStorage.setItem("pass", this.usuarioService.password);

  }

}
