import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {MensajelistService} from "../../services/httpservices/mensajelist.service";
import {NgToastService} from "ng-angular-popup";
import {SessionServiceService} from "../../services/session-service.service";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-agregar-anuncio',
  templateUrl: './agregar-anuncio.component.html',
  styleUrl: './agregar-anuncio.component.css'
})
export class AgregarAnuncioComponent implements OnInit{

  titulo = "";
  mensaje = "";


constructor(private toast:NgToastService,private user:UsuarioService,private session:SessionServiceService,private router:Router, private anuncio:MensajelistService, private albergue:AlbergueServiceService, private ngToast:NgToastService) {
}

  ngOnInit(): void {
    if (this.user.usuario?.id !== this.albergue.albergue?.usuarioGestor.id) {
      this.router.navigate(['/home']);
    }
  }

  registrarAnuncio(anuncio: any){
    if (!this.session.get()) {
      this.session.clear();
      this.ngToast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }
    this.anuncio.crearAnuncio(anuncio, this.albergue.albergue?.id || 0).subscribe((data) => {
      if (data){
        this.ngToast.success({detail: "Anunciado creado", summary: "Anuncio creado correctamente", sticky:true })
        this.router.navigate(["/tablon"])
      } else {
        this.ngToast.error({detail: "Error", summary: "Error al crear el anuncio", sticky:true })
        this.router.navigate(["/tablon"])
      }

      this.session.renew();

    });

  }


  onSubmit() {
    if (this.titulo === "" || this.mensaje === "") {
      this.ngToast.error({detail: "Error", summary: "Rellena todos los campos", sticky:true })
    }else {
      this.registrarAnuncio({
        titulo: this.titulo,
        contenido: this.mensaje,
        fechaPublicacion: new Date()
      });
    }
  }


}
