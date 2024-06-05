import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PerrosService} from "../../services/perros.service";
import {Perro} from "../../model/perro";
import {NgToastService} from "ng-angular-popup";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-editar-perro',
  templateUrl: './editar-perro.component.html',
  styleUrl: './editar-perro.component.css'
})
export class EditarPerroComponent implements OnInit{

  id!: number;
  perro!: Perro;

  fechaNacimiento!: Date;
  cambioFoto: boolean = false;
  btndisabled: boolean = true;

  url!: string;




  constructor(private router:Router,private user:UsuarioService, private toast:NgToastService,private route:ActivatedRoute, private perros:PerrosService, private ngtoast: NgToastService,private storage:AngularFireStorage, private albergueService:AlbergueServiceService) {}

  ngOnInit() {

    if (this.user.usuario?.id !== this.albergueService.albergue?.usuarioGestor.id) {
      this.router.navigate(['/home']);
    }


    this.id = this.route.snapshot.params['id'];

    // @ts-ignore
    this.perro = this.perros.listaPerros.find(perro => perro.id == this.id);
  }

  actualizar(fecha:any) {
    this.perro.fechaNacimiento = new Date(fecha);
    if (this.cambioFoto) this.perro.fotoURL = this.url;
    this.update();
  }

  private update() {
    if (!this.perro.nombre || !this.perro.fechaNacimiento || !this.perro.peso) {
      this.ngtoast.error({detail:'Error', summary: "Todos los campos son obligatorios", duration: 2000})
      return;
    }

    if (this.perro.peso < 0) {
      this.ngtoast.error({detail: "Error", summary: 'El peso no puede ser negativo', duration: 2000});
      return;
    }

    if (this.perro.fechaNacimiento > new Date()) {
      this.ngtoast.error({detail: "Error", summary: 'La fecha de nacimiento no puede ser futura', duration: 2000});
      return;
    }


    this.perros.updateDog({
      id: this.perro.id,
      nombre: this.perro.nombre,
      ppp: this.perro.ppp,
      fotoURL: this.perro.fotoURL,
      fechaNacimiento: this.perro.fechaNacimiento,
      peso: this.perro.peso
    }, this.perro.id);
  }
  // Mimso que en el componente de añadir perro
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const filePath = 'perro_photos/' +this.albergueService.albergue?.id+"/"+ Date.now() + '_' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().subscribe(
      (snapshot) => {
        if (snapshot?.state === 'success') {
          fileRef.getDownloadURL().subscribe(url => {
            this.url = url;
            this.btndisabled = false;
          });
        }
      }
    );
  }

}
