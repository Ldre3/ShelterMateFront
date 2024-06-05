import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {AdoptantelistService} from "../../services/httpservices/adoptantelist.service";
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {SessionServiceService} from "../../services/session-service.service";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-registrar-adoptante',
  templateUrl: './registrar-adoptante.component.html',
  styleUrl: './registrar-adoptante.component.css'
})
export class RegistrarAdoptanteComponent implements OnInit{

  id!: number;

  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';

  constructor(private user:UsuarioService, private session:SessionServiceService,private route:ActivatedRoute, private router:Router, private toast:NgToastService, private adoptantes:AdoptantelistService, private albergue:AlbergueServiceService) { }


  ngOnInit() {

    if (this.user.usuario?.id !== this.albergue.albergue?.usuarioGestor.id) {
      this.router.navigate(['/home']);
    }

    this.id = this.route.snapshot.params['id'];
  }

  register() {
    if (this.nombre == '' || this.apellido == '' || this.email == '' || this.telefono == '') {
      this.toast.error({detail: 'Error', summary: 'Todos los campos son obligatorios', duration: 3000});
      return
    }else if (!this.isValidEmail(this.email)) {
      this.toast.error({detail: 'Error', summary: 'Email inválido', duration: 3000});
      return
    }
      if (!this.session.get()) {
        this.session.clear();
        this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
        this.router.navigate(['/login']);
        return;
      }

      this.adoptantes.addAdoptante({
        datos: {
          nombre: this.nombre,
          apellidos: this.apellido,
          telefono: this.telefono,
          email: this.email
        }
      }, this.albergue.albergue?.id || 0).subscribe(data => {
        if (data) {
          this.router.navigate(['/lista', 'adoptarPerro', this.id]);
          this.toast.success({detail: 'Exito', summary: 'Adoptante registrado correctamente', duration: 3000});
        }else {
          this.toast.error({detail: 'Error', summary: 'Error al registrar adoptante', duration: 3000});
          this.router.navigate(['/lista', 'adoptarPerro', this.id]);
        }
        this.session.renew();
      })







  }


  isValidEmail(email: string): boolean {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
