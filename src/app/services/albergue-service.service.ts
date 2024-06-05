import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Albergue} from "../model/albergue";

@Injectable({
  providedIn: 'root'
})

// Servicio para gestionar la selección de un albergue

export class AlbergueServiceService {

  albergueSelected: boolean = false;
  albergueSelectedChanged = new Subject<boolean>();

  albergue:Albergue|null = null;
  albergueChanged = new Subject<Albergue|null>();

  constructor() { }

  selectAlbergue(){
    this.albergueSelected = true;
    this.albergueSelectedChanged.next(this.albergueSelected);
  }

  unselectAlbergue(){
    this.albergueSelected = false;
    this.albergueSelectedChanged.next(this.albergueSelected);
  }

  setAlbergue(albergue: Albergue|null){
    this.albergue = albergue;
    this.albergueChanged.next(this.albergue);
  }
}

