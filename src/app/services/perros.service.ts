import { Injectable } from '@angular/core';
import {Perro} from "../model/perro";
import {PerrolistService} from "./httpservices/perrolist.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {SessionServiceService} from "./session-service.service";

@Injectable({
  providedIn: 'root'
})
// Servicio que se encarga de gestionar la lista de perros
export class PerrosService {

  listaPerros:Perro[] = [];
  originalListaPerros:Perro[] = [];
  cargando = true;
  busca = '';

  constructor(private session:SessionServiceService,private perros:PerrolistService, private router:Router, private toast:NgToastService) { }


  // Función que obtiene los perros de un albergue y ordena su lista de paaseos
  getData(id: number, navigate?:Function) {
    this.perros.perrosPorIdAlbergue(id).subscribe((data) => {
      if (data) data.forEach((perro) => {
        perro.paseos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      });
      if (data) data.sort((a, b) => {
        if (!a.adoptante && b.adoptante) {
          return -1;
        }
        if (a.adoptante && !b.adoptante) {
          return 1;
        }

        return this.compareDogs(a, b);
      });
      this.listaPerros = data;
      this.originalListaPerros = data;
      this.cargando = false;

      if (navigate) {
        this.toast.success({detail: 'Exito', summary: 'Has registrado el paseo', duration: 3000});
        navigate();
      }
    });
  }
  // Función que compara dos perros por fecha de último paseo
  private compareDogs (a:Perro,b:Perro){
    const aIsEmpty = !a.paseos || a.paseos.length === 0;
    const bIsEmpty = !b.paseos || b.paseos.length === 0;
    if (aIsEmpty && bIsEmpty) {
      return 0;
    }
    else if (aIsEmpty) {
      return -1;
    } else if (bIsEmpty) {
      return 1;
    }
    else {
      return new Date(a.paseos[0]?.fecha).getTime() - new Date(b.paseos[0]?.fecha).getTime();
    }
  }

  // Función que filtra la lista de perros por nombre
  filtrar() {
    this.listaPerros = this.originalListaPerros.filter((perro) => perro.nombre.toLowerCase().includes(this.busca.toLowerCase()));
  }

  // Función que resetea la lista de perros
  reset() {
    this.listaPerros = [...this.originalListaPerros];
    this.busca = '';
  }

  // Función que borra un perro
  deleteDog(id:number) {
    if (!this.session.get()) {
      this.session.clear();
      this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }
    if (confirm("¿Estás seguro de que quieres borrar este perro?")) {
      this.perros.borrarPerro(id).subscribe(value => {
        window.location.reload();
        this.session.renew();

      });
    }

  }

  getPerrobyId(id: number) {
    return this.listaPerros.find((perro) => perro.id === id);
  }

  // Función que actualiza un perro
  updateDog(perro:any, id:number) {
    if (!this.session.get()) {
      this.session.clear();
      this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }
    this.perros.actualizarPerro(perro).subscribe(value => {
      if (value) {
        this.router.navigate(['/lista/detallePerro', id]);
        this.toast.success({detail: 'Perro actualizado', summary: 'Perro actualizado correctamente', sticky: true});
      }else {
        this.router.navigate(['/lista/detallePerro', id]);
        this.toast.error({detail: 'Error', summary: 'No se ha podido actualizar el perro', duration: 3000});
      }
      this.session.renew();
    });
  }

}
