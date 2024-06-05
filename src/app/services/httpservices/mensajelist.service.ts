import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Anuncio} from "../../model/anuncio";

@Injectable({
  providedIn: 'root'
})
export class MensajelistService {

  private url = "";

  constructor(private http:HttpClient) { }

  public anunciosPorIdAlbergue(idAlbergue: number){
    return this.http.get<Anuncio[]>(this.url+'/buscarAlbergueId/'+idAlbergue);
  }

  public borrarAnuncio(id: number){
    return this.http.delete(this.url+'/eliminar/'+id);
  }

  crearAnuncio(anuncio: any, idAlbergue: number) {
    return this.http.post(this.url+'/registrarEnAlbergue/'+idAlbergue, anuncio);
  }
}
