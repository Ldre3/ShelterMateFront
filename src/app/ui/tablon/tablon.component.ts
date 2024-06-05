import {Component, OnInit} from '@angular/core';
import {MensajeService} from "../../services/mensaje.service";
import {UsuarioService} from "../../services/usuario.service";
import {AlbergueServiceService} from "../../services/albergue-service.service";

@Component({
  selector: 'app-tablon',
  templateUrl: './tablon.component.html',
  styleUrl: './tablon.component.css'
})
export class TablonComponent implements OnInit{

  constructor(protected mensaje:MensajeService, protected usuarios:UsuarioService, protected albergue:AlbergueServiceService) { }

  ngOnInit(): void {
    this.mensaje.getData(this.albergue.albergue?.id || 0);
  }

}
