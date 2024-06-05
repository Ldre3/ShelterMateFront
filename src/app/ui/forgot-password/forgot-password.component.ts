import { Component } from '@angular/core';
import {NgToastService} from "ng-angular-popup";
import {UsuariosService} from "../../services/httpservices/usuarios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  email!: string;

  constructor(private toast:NgToastService, private usuariosService: UsuariosService, private router:Router) {
  }

  submit() {
    if (!this.email){
      this.toast.error({detail:'Error',summary:'El campo email es obligatorio',duration: 3000})
    } else if(!this.isValidEmail(this.email)){
      this.toast.error({detail:'Error',summary:'El email no es válido',duration: 3000})
    } else {
      this.usuariosService.recuperarContrasena(this.email).subscribe( (data) => {
        this.toast.warning({detail:'Email enviado',summary:'Si el email existe en la base de datos se enviara un correo con una nueva contraseña',duration: 3000})
        this.router.navigate(['/login']);
      });
    }
  }

  // Validar email con expresión regular
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
