import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UsuarioService} from "../services/usuario.service";


// Interceptor para agregar el token de autenticación a las peticiones HTTP que lo requieran
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private url = "";

  constructor(private user:UsuarioService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Excluimos las peticiones que no requieren autenticación
    const excludedUrls: any[] = [
      `${this.url}/login`,
      `${this.url}/registrar`,
      `${this.url}/recuperarContrasena`
    ];

    // Verificamos si la URL de la petición actual está en la lista de excluidos
    const isExcluded = excludedUrls.some(url => req.url == (url));

    // Si la URL está en la lista de excluidos, no agregamos el token de autenticación
    if (isExcluded) {
      return next.handle(req);
    }

    // Si la URL no está en la lista de excluidos, agregamos el token de autenticación
    const authHeader = this.user.getHeader();
    const authReq = req.clone({
      setHeaders: {
        Authorization: authHeader
      }
    });

    return next.handle(authReq);
  }
}
