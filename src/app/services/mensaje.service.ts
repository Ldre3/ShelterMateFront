import { Injectable } from '@angular/core';
import {Anuncio} from "../model/anuncio";
import {MensajelistService} from "./httpservices/mensajelist.service";
import {SessionServiceService} from "./session-service.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

// Servicio para la gestión de anuncios

export class MensajeService {

  listaMensajes:Anuncio[] = [];
  cargando = true;

  constructor(private toast:NgToastService,private sesion:SessionServiceService,private anuncios:MensajelistService, private router:Router) { }

  getData(id: number) {
    // Obtiene los anuncios de un albergue
    this.anuncios.anunciosPorIdAlbergue(id).subscribe((data) => {
      // Ordena los anuncios por fecha de publicación
      if (data) data.sort((a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime());
      this.listaMensajes = data;
      this.cargando = false;
    });
  }

  borrarMensaje(id: number) {
    // Comprueba si la sesión ha caducado
    if (!this.sesion.get()) {
      this.sesion.clear();
      this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }
    // Pregunta si se quiere borrar el anuncio
    if (confirm("¿Estás seguro de que quieres borrar este anuncio?"))this.anuncios.borrarAnuncio(id).subscribe(() => {
      this.sesion.renew();
      window.location.reload();
    });
  }
}
