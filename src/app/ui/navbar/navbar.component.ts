import {Component} from '@angular/core';
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {faList} from "@fortawesome/free-solid-svg-icons";
import {faMessage} from "@fortawesome/free-solid-svg-icons";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {faBarsStaggered} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

  faList = faList;
  faMessage = faMessage;
  faRightFromBracket = faRightFromBracket;
  faBarsStaggered = faBarsStaggered;
  public isCollapsed : boolean = true;

    constructor(private albergue:AlbergueServiceService) {
  }


  salir() {
    this.albergue.unselectAlbergue();
    this.albergue.setAlbergue(null);
  }
}
