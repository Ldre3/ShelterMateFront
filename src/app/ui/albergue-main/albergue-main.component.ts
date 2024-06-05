import {Component, OnInit} from '@angular/core';
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../model/usuario";
import {PerrosService} from "../../services/perros.service";

@Component({
  selector: 'app-albergue-main',
  templateUrl: './albergue-main.component.html',
  styleUrl: './albergue-main.component.css'
})
export class AlbergueMainComponent implements OnInit{
  protected id: number = 0;
  idGestor = 0;
  protected user! : Usuario;



  constructor(private albergueService:AlbergueServiceService, protected perros:PerrosService, private usuario:UsuarioService) {}
  ngOnInit() {
    this.id = this.albergueService.albergue?.id || 0;
    this.idGestor = this.albergueService.albergue?.usuarioGestor.id || 0;
    if (this.usuario.usuario) {
      this.user = this.usuario.usuario;
    }
    this.perros.getData(this.id);
  }


  onSubmit() {
    this.perros.filtrar();
  }

  resetListaPerros() {
    this.perros.reset();
  }
}
