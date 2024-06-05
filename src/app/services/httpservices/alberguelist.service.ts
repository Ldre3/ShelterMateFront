import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Albergue} from "../../model/albergue";

@Injectable({
  providedIn: 'root'
})
export class AlberguelistService {

  private url = "";

  constructor(private http:HttpClient) { }

  public getAlbergueList(idusuario: number | undefined){
    return this.http.get<Albergue[]>(this.url+'/buscarVoluntarioId/'+idusuario);
  }

  public saveAlbergue(albergue:any, idusuario: number | undefined){
    return this.http.post<Albergue>(this.url+'/registrar/'+idusuario, albergue);
  }

  public getAlbergueUserNotIn (idusuario: number | undefined){
    return this.http.get<Albergue[]>(this.url+'/buscarVoluntarioIdNotInAlbergue/'+idusuario);
  }

  public getDatosAlbergue(id: number){
    return this.http.get<Albergue>(this.url+'/buscarDatos/'+id);
  }


}

