import {Component, Input} from '@angular/core';
import {Anuncio} from "../../model/anuncio";
import {UsuarioService} from "../../services/usuario.service";
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {MensajeService} from "../../services/mensaje.service";

@Component({
  selector: 'app-mensaje-detalle',
  templateUrl: './mensaje-detalle.component.html',
  styleUrl: './mensaje-detalle.component.css'
})
export class MensajeDetalleComponent {
  @Input() mensaje!:Anuncio;

  constructor(protected usuarios:UsuarioService, protected albergue:AlbergueServiceService, private mensajeService: MensajeService) { }

  deleteMessage() {
    this.mensajeService.borrarMensaje(this.mensaje.id);
  }
}
