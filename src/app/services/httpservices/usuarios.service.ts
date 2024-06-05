import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../../model/usuario";
import {LoginResponse} from "../../model/login-response";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = "";

  constructor(private http:HttpClient) { }

  public login(usuario:string, password:string){
    return this.http.post<LoginResponse>(this.url+'/login', { email: usuario, password: password });
  }

  public register(usuario:any): Observable<Usuario>{
    return this.http.post<Usuario>(this.url+'/registrar', usuario);
  }

  public registerUserInAlbergue(idusuario: number | undefined, idalbergue: number | undefined, password: string | undefined){
    return this.http.post<Usuario>(this.url+'/registrarVoluntario/'+idusuario+'/'+idalbergue, password);
  }

  public recuperarContrasena(email: string){
    return this.http.post(this.url+'/recuperarContrasena',  email);
  }

  public cambiarContrasena(email:string, oldPassword: string, newPassword: string){
    return this.http.post(this.url+'/changePassword', {email: email, oldPass: oldPassword, newPass: newPassword});
  }
}
