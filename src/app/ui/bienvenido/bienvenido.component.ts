import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {Albergue} from "../../model/albergue";

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent implements OnInit{
  albergue! :Albergue|null;


  constructor(private route: ActivatedRoute, private albergueService:AlbergueServiceService) {}
  ngOnInit() {
    this.albergue= this.albergueService.albergue;
  }
}
