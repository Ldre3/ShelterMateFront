import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario:string = "";
  password:string = "";

  constructor(private router: Router, private usuarioService:UsuarioService, private toast:NgToastService) {}

  initSesion(){
    if (!this.usuario || !this.password) this.toast.error({detail:"Error",summary:'Ambos campos son requeridos', duration: 3000});
    else {
      this.usuarioService.login(this.usuario, this.password);
    }
  }

  register(){
    this.router.navigate(['/register']);
  }

}
