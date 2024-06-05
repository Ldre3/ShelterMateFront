import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PerrosService} from "../../services/perros.service";
import {PerrolistService} from "../../services/httpservices/perrolist.service";
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {UsuarioService} from "../../services/usuario.service";
import {NgToastService} from "ng-angular-popup";
import {SessionServiceService} from "../../services/session-service.service";

@Component({
  selector: 'app-registrar-paseo',
  templateUrl: './registrar-paseo.component.html',
  styleUrl: './registrar-paseo.component.css'
})
export class RegistrarPaseoComponent implements OnInit{

  id!: number;
  dogName!: string;
  ppp!:boolean;

  fecha:Date|null = null;
  horaSalida:Date|null = null;
  horaEntrada:Date|null = null;
  observaciones = '';



  constructor(private session:SessionServiceService,private toast:NgToastService, private usuario: UsuarioService, private route:ActivatedRoute, private router:Router, protected perros:PerrosService, protected perrosList:PerrolistService, protected albergue:AlbergueServiceService) { }

  ngOnInit() {
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.dogName = this.perros.listaPerros.find(perro => perro.id === this.id)?.nombre || '';
    this.ppp = this.perros.listaPerros.find(perro => perro.id === this.id)?.ppp || false;
  }


  onSubmit() {
    if (!this.fecha || !this.horaSalida || !this.horaEntrada || !this.observaciones) {
      this.toast.error({detail: 'Error', summary: 'Todos los campos son obligatorios', duration: 3000});
      return;
    }

    if (new Date(String(this.fecha)+'T'+this.horaSalida).getTime() > new Date().getTime()) {
      this.toast.error({detail: 'Error', summary: 'La fecha de salida no puede ser futura', duration: 3000});
      return;
    }

    if ((new Date(String(this.fecha)+'T'+this.horaEntrada).getTime() < new Date(String(this.fecha)+'T'+this.horaSalida).getTime())) {
      this.toast.error({detail: 'Error', summary: 'La hora de entrada no puede ser anterior a la hora de salida', duration: 3000});
      return;
    }

    if (this.ppp && !this.usuario.usuario?.licencia) {
      this.toast.error({detail: 'Error', summary: 'No tienes licencia para pasear perros potencialmente peligrosos', duration: 3000});
      return;
    }

    if (!this.session.get()) {
      this.session.clear();
      this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }

      this.perrosList.registrarPaseo({
        fecha: this.fecha,
        horaSalida: new Date(String(this.fecha)+'T'+this.horaSalida),
        duracion: (new Date(String(this.fecha)+'T'+this.horaEntrada).getTime() - new Date(String(this.fecha)+'T'+this.horaSalida).getTime())/60000,
        observaciones: this.observaciones
      },this.id, this.usuario.usuario?.id || 0).subscribe(data => {
        if (data) {
          this.perros.getData(this.albergue.albergue?.id || 0,
            () => {this.router.navigate(['/lista/detallePerro/'+this.id]);});
        }
        this.session.renew();

      });
  }
}
