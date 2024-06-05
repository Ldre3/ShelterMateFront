import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Albergue} from "../../model/albergue";
import {AlberguelistService} from "../../services/httpservices/alberguelist.service";
import {UsuarioService} from "../../services/usuario.service";
import {AlbergueServiceService} from "../../services/albergue-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  albergues !: Albergue[]
  loading = true;
  constructor(private router:Router, private albergueService: AlberguelistService, private usuarioService: UsuarioService, private albergue:AlbergueServiceService) {
  }

  ngOnInit(): void {
    this.albergue.unselectAlbergue();
    this.albergueService.getAlbergueList(this.usuarioService.usuario?.id).subscribe(data => {
      this.albergues = data;
      this.loading = false;
    });
  }
  registerAlbergue(){
    this.router.navigate(['/registerAlbergue']);
  }

  entrarAlbergue() {
    this.router.navigate(['/entrarEnAlbergue']);
  }

  logOut() {
    this.usuarioService.logout();
  }
}
