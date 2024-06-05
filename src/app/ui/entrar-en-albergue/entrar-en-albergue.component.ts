import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import {AlberguelistService} from "../../services/httpservices/alberguelist.service";
import {Albergue} from "../../model/albergue";
import {NgToastService} from "ng-angular-popup";
import {UsuariosService} from "../../services/httpservices/usuarios.service";
import {SessionServiceService} from "../../services/session-service.service";

@Component({
  selector: 'app-entrar-en-albergue',
  templateUrl: './entrar-en-albergue.component.html',
  styleUrl: './entrar-en-albergue.component.css'
})
export class EntrarEnAlbergueComponent implements OnInit{

  codigo: string = '';
  loading = true;
  albergues : Albergue[] = [];
  constructor(private toast:NgToastService,private session:SessionServiceService,private router:Router, private alberguelistService: AlberguelistService, private usuarioService: UsuarioService, private ngToast: NgToastService, private usuarios: UsuariosService) {
  }

  ngOnInit() {
    this.alberguelistService.getAlbergueUserNotIn(this.usuarioService.usuario?.id).subscribe(data => {
      this.albergues = data;
      this.loading = false;
    });
  }
  agregar(value: string) {

    if (!this.session.get()) {
      this.session.clear();
      this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }

    this.usuarios.registerUserInAlbergue(this.usuarioService.usuario?.id, parseInt(value), this.codigo).subscribe(
      (result) => {
        if (result) {
          this.ngToast.success({detail: "Exito", summary: "Te has agregado al albergue", sticky:true});
          this.router.navigate(['/home']);
        } else {
          this.ngToast.error({detail: "Error", summary: "Contraseña incorrecta", duration: 3000});
        }
        this.session.renew();
      }
    );
  }


  cancelar() {
    this.router.navigate(['/home']);
  }

  onSubmit(value: string) {
    if (!this.codigo) this.ngToast.error({detail: "Error", summary: 'El codigo no puede estar vacio', duration: 3000});
    else this.agregar(value)
  }
}
