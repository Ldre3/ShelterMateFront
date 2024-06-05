import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PerrosService} from "../../services/perros.service";
import {Perro} from "../../model/perro";
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {AdoptantelistService} from "../../services/httpservices/adoptantelist.service";
import {AlberguelistService} from "../../services/httpservices/alberguelist.service";
import {Datos} from "../../model/datos";
import {NgToastService} from "ng-angular-popup";
import {SessionServiceService} from "../../services/session-service.service";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-adoptar-perro',
  templateUrl: './adoptar-perro.component.html',
  styleUrl: './adoptar-perro.component.css'
})
export class AdoptarPerroComponent implements OnInit{


  id!: number;
  perro!: Perro | undefined;
  listaDatos: Datos[] = [];
  cargado = false;



  constructor(private user:UsuarioService,private sesion:SessionServiceService, private route:ActivatedRoute, private router:Router, private perros:PerrosService, private albergue:AlbergueServiceService, private adoptantes:AdoptantelistService, private albergues:AlberguelistService, private toast:NgToastService) { }

  ngOnInit() {
    // Comprobamos que el usuario es el gestor del albergue
    if (this.user.usuario?.id !== this.albergue.albergue?.usuarioGestor.id) {
      this.router.navigate(['/home']);
    }


    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.perro = this.perros.listaPerros.find(perro => perro.id === this.id)

    this.albergues.getDatosAlbergue(this.albergue.albergue?.id || 0).subscribe((data: any) => {
      this.listaDatos = data;
      this.cargado = true;
    });
  }

  adoptar(id: string) {
    if (!this.sesion.get()) {
      this.sesion.clear();
      this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }
    this.adoptantes.adoptarPerro(this.id, parseInt(id), this.albergue.albergue?.id || 0).subscribe((data: any) => {
      if (data) {
        this.toast.success({detail: 'Adopción realizada', summary: 'El perro ha sido adoptado correctamente', duration: 4000})
        this.router.navigate(['/lista']);
      }else {
        this.toast.error({detail: 'Error', summary: 'Error al registrar adoptante', duration: 3000});
        this.router.navigate(['/lista']);
      }
      this.sesion.renew();
    });
  }
}


