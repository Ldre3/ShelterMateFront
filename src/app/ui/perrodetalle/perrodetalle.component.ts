import {Component, Input} from '@angular/core';
import {Perro} from "../../model/perro";
import {PerrosService} from "../../services/perros.service";
import {faFaceSadCry} from "@fortawesome/free-solid-svg-icons";
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-perrodetalle',
  templateUrl: './perrodetalle.component.html',
  styleUrl: './perrodetalle.component.css'
})
export class PerrodetalleComponent{

  @Input() perro!: Perro;
  @Input() id!:number;
  loaded: boolean = false;
  faFaceSadCry = faFaceSadCry;

  constructor(private perroService: PerrosService, protected albergueService:AlbergueServiceService, protected userService:UsuarioService) {
  }

  deleteDog() {
    console.log(this.id);
    this.perroService.deleteDog(this.id);
  }


  cargado() {
    this.loaded = true;
  }
}
