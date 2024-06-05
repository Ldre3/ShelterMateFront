import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Perro} from "../../model/perro";

@Injectable({
  providedIn: 'root'
})
export class PerrolistService {

  private url = "";


  constructor(private http:HttpClient) { }

  public perrosPorIdAlbergue(idAlbergue: number){
    return this.http.get<Perro[]>(this.url+'/albergue/'+idAlbergue);
  }

  public borrarPerro(id: number){
    return this.http.delete(this.url+'/eliminar/'+id);
  }

  public agregarPerro(perro: any, idAlbergue: number){
    return this.http.post(this.url+'/registrar/'+idAlbergue, perro);
  }

  public registrarPaseo(paseo: any, perroId: number, usuarioId: number){
    return this.http.post(this.url+'/pasear/'+perroId+'/'+usuarioId, paseo);
  }

  actualizarPerro(perro: any) {
    return this.http.put(this.url+'/actualizar', perro);

  }
}
