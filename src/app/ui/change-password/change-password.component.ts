import { Component } from '@angular/core';
import {NgToastService} from "ng-angular-popup";
import {UsuariosService} from "../../services/httpservices/usuarios.service";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {SessionServiceService} from "../../services/session-service.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  currentPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;

  constructor(private session:SessionServiceService,private toast:NgToastService, private users:UsuariosService, private user:UsuarioService, private router:Router) {
  }
  submit() {
    if (!this.currentPassword || !this.newPassword || !this.confirmNewPassword) {
      this.toast.error({detail: 'Error', summary: 'Todos los campos son obligatorios', duration: 3000});
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.toast.error({detail: 'Error', summary: 'Las contraseñas no coinciden', duration: 3000});
      return;
    }


    if (!this.session.get()) {
      this.session.clear();
      this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }

    this.users.cambiarContrasena(this.user.usuario?.datos.email || '', this.currentPassword, this.newPassword).subscribe( data => {
        if (data) {
          this.toast.success({detail: 'Exito', summary: 'Contraseña cambiada con exito', duration: 3000});
          this.user.logout();
        }else {
          this.toast.error({detail: 'Error', summary: 'Contraseña incorrecta', duration: 3000});
        }
        this.session.renew();
      }
    );



  }
}
