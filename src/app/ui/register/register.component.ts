import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {UsuariosService} from "../../services/httpservices/usuarios.service";
import {NgToastService} from "ng-angular-popup";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  license: boolean = false;
  phone: string = '';

  constructor(private router: Router, private usuarios:UsuariosService, private toast:NgToastService) { }

  onSubmit() {
    if (!this.firstName || !this.lastName || !this.email || !this.password || !this.phone) {
      this.errorMethod();
    } else {
      if (!this.isValidEmail(this.email)) this.toast.error({detail: "Error", summary: 'Email inválido', duration: 3000});
      else this.register();
    }
  }

  register() {
    console.log(this.firstName, this.lastName, this.email, this.password, this.license, this.phone);
    this.usuarios.register({
      datos: {
        nombre: this.firstName,
        apellidos: this.lastName,
        email: this.email ,
        telefono: this.phone },
      password: this.password,
      licencia: this.license
    }).subscribe(value => {
      if (value) {
        this.toast.success({detail: "Exito", summary: 'Usuario Registrado', duration: 3000});
        this.router.navigate(['/login']);
      }
      else this.toast.error({detail: "Error", summary: 'El email ya existe', duration: 3000});
    });

  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  errorMethod() {
    this.toast.error({detail: "Error", summary: 'Todos los campos son obligatorios', duration: 3000});
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}
