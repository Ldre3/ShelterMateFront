import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {AlberguelistService} from "../../services/httpservices/alberguelist.service";
import {UsuarioService} from "../../services/usuario.service";
import {SessionServiceService} from "../../services/session-service.service";

@Component({
  selector: 'app-registroalbergue',
  templateUrl: './registroalbergue.component.html',
  styleUrl: './registroalbergue.component.css'
})
export class RegistroalbergueComponent {

  localidad: string = '';
  telefono: string = '';
  codigo: string = '';

  constructor(private session:SessionServiceService,private router:Router, private toast:NgToastService, private albergueService: AlberguelistService, private usuarioService: UsuarioService) {
  }

  onSubmit() {
    if (!this.localidad || !this.telefono || !this.codigo) {
      this.errorMethod();
    } else {
      this.registerAlbergue();
    }
  }

  registerAlbergue() {
    if (!this.session.get()) {
      this.session.clear();
      this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }
    this.albergueService.saveAlbergue({
      localidad: this.localidad,
      numTelefono: this.telefono,
      password: this.codigo,
    },this.usuarioService.usuario?.id).subscribe(value => {
      if (value) {
        this.toast.success({detail: "Exito", summary: 'Albergue registrado', duration: 3000});
        this.router.navigate(['/home']);
      }
      else this.toast.error({detail: "Error", summary: 'Ya existe un albergue en esa localidad', duration: 3000});

      this.session.renew();
    });
  }

  cancelar() {
    this.router.navigate(['/home']);
  }



  private errorMethod() {
    this.toast.error({detail: "Error", summary: 'Todos los campos son obligatorios', duration: 3000});
  }
}
