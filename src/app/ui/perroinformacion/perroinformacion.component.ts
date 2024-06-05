import {Component, HostListener, OnInit} from '@angular/core';
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PerrosService} from "../../services/perros.service";
import {Perro} from "../../model/perro";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-dog-info',
  templateUrl: 'perroinformacion.component.html',
  styleUrls: ['perroinformacion.component.css']
})
export class PerroinformacionComponent implements OnInit{
  userId:number|undefined = 0;
  albergueId!:number | undefined;
  dog!: Perro|undefined;
  id!:number;
  loaded: boolean = false;
  maxChars: number = 0;

  ngOnInit() {
    this.setMaxChars();
    this.albergueId = this.albergue.albergue?.usuarioGestor.id;
    this.id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    this.dog = this.perros.getPerrobyId(this.id);
    this.userId = this.usuarios.usuario?.id;
  }

  // Al redimensionar la ventana, se ajusta el número de caracteres máximos para pasarle al pipe de salto de linea
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setMaxChars();
  }


  constructor(private albergue:AlbergueServiceService, private route:ActivatedRoute, private router:Router, private perros:PerrosService, private usuarios:UsuarioService) {
  }

  // Función para calcular la edad de un perro a partir de su fecha de nacimiento
  calculateAge(birthDate: Date): string {
    const today = new Date();
    birthDate = new Date(birthDate);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();


    if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
      ageYears--;
      ageMonths = 12 - birthDate.getMonth() + today.getMonth();
      if (today.getDate() < birthDate.getDate()) {
        ageMonths--;
      }
    }

    let yearsText = ageYears === 1 ? "año" : "años";
    let monthsText = ageMonths === 1 ? "mes" : "meses";

    if (ageYears === 0 && ageMonths === 0) {
      return "Recién nacido !"
    } else if (ageMonths === 0) {
      return ageYears + " " + yearsText;
    } else if (ageYears === 0) {
      return ageMonths + " " + monthsText;
    }

    return ageYears + " años y " + ageMonths + " meses";
  }

  pasear() {
    this.router.navigate(['/lista','registrarPaseo', this.id]);
  }

  adoptar() {
    this.router.navigate(['/lista','adoptarPerro', this.id]);
  }

  editar() {
    this.router.navigate(['/lista','editarPerro', this.id]);
  }

  cargado() {
    this.loaded = true;
  }



  // Función para ajustar el número de caracteres máximos antes del cambio de linea en función del tamaño de la pantalla
  private setMaxChars() {
    if (window.innerWidth < 450) {
      this.maxChars = 10;
    } else if (window.innerWidth < 650){
      this.maxChars = 27;
    } else if (window.innerWidth < 950){
      this.maxChars = 50;
    } else {
      this.maxChars = 80;
    }
  }
}

