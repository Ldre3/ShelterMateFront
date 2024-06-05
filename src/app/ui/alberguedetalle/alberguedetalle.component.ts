import {Component, Input} from '@angular/core';
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {Albergue} from "../../model/albergue";

@Component({
  selector: 'app-alberguedetalle',
  templateUrl: './alberguedetalle.component.html',
  styleUrl: './alberguedetalle.component.css'
})
export class AlberguedetalleComponent {
  @Input() albergue!: Albergue;


  constructor(private albergueSelected: AlbergueServiceService) {
  }
  seleccionar() {
    this.albergueSelected.selectAlbergue();
    this.albergueSelected.setAlbergue(this.albergue);
  }
}
