import { Injectable } from '@angular/core';
import {LocalStorageService} from "angular-web-storage";

@Injectable({
  providedIn: 'root'
})
// Servicio para manejar la sesión del usuario en el local storage
export class SessionServiceService {

  constructor(private local:LocalStorageService) { }

  set(user:any){
    this.local.set("user",user, 10, 'm');
  }

  get(){
    return this.local.get("user");
  }

  clear() {
    this.local.clear();
  }

  renew(){
    this.local.set("user",this.local.get("user"), 10, 'm');
  }
}
