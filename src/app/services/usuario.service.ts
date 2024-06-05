import {Injectable} from '@angular/core';
import {Usuario} from "../model/usuario";
import {UsuariosService} from "./httpservices/usuarios.service";
import {Router} from "@angular/router";

import {NgToastService} from "ng-angular-popup";
import {SessionServiceService} from "./session-service.service";

@Injectable({
  providedIn: 'root'
})
// Servicio para gestionar el login y logout de los usuarios en la aplicación
export class UsuarioService {

  status : boolean = false;
  usuario: Usuario|null = null;
  password: string = '';
  mensaje: string = '';



  constructor(private usuarios:UsuariosService, private router:Router, private toast:NgToastService, private sesion:SessionServiceService) {
  }

  public login(usuario:string, password:string) {
    this.password = password;
    this.usuarios.login(usuario, password).subscribe(data => {
        this.usuario = data.usuario;
        this.mensaje = data.mensaje;
        this.status = data.status;
      if (this.status) {
        this.router.navigate(['/home']);
        this.sesion.set(JSON.stringify(this.usuario));

      }else {
        this.toast.error({detail:"Error",summary:this.mensaje, sticky: true})
      }
    });



  }

  public getHeader () {
    return 'Basic ' + btoa(`${this.usuario?.datos.email}:${this.password}`);
  }

  public logout() {
    this.status = false;
    this.usuario = null;
    this.mensaje = '';
    this.password = '';
    this.sesion.clear();
    this.router.navigate(['/login']);
  }

}
