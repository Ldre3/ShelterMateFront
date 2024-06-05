import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdoptantelistService {

  private url = "";

  constructor(private http:HttpClient) { }

    addAdoptante(adoptante: any, id:number) {
        return this.http.post(this.url+'/registrar'+'/'+id, adoptante);
    }

    adoptarPerro( idPerro:number, idAdoptante:number, idAlbergue:number) {
        return this.http.get(this.url+'/adoptarPerro'+'/'+idAdoptante+'/'+idPerro+'/'+idAlbergue);
    }

}
