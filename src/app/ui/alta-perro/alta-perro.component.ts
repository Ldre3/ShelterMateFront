import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PerrolistService} from "../../services/httpservices/perrolist.service";
import {AlbergueServiceService} from "../../services/albergue-service.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgToastService} from "ng-angular-popup";
import {SessionServiceService} from "../../services/session-service.service";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-alta-perro',
  templateUrl: './alta-perro.component.html',
  styleUrl: './alta-perro.component.css'
})
export class AltaPerroComponent implements OnInit{
  nombre: string = '';
  ppp:boolean = false;
  fechaNacimiento:Date | null = null;
  peso: number = 0;
  btndisabled: boolean = true;
  fotoUrl: string = '';

  constructor(private user:UsuarioService,private session:SessionServiceService,private router:Router, private perroListService: PerrolistService, private albergueService: AlbergueServiceService, private storage:AngularFireStorage, private toast:NgToastService) {
  }

  ngOnInit(): void {
    if (this.user.usuario?.id !== this.albergueService.albergue?.usuarioGestor.id) {
      this.router.navigate(['/home']);
    }
    }

  agregar() {

    // Control de errores

    if (!this.nombre || !this.fechaNacimiento || !this.peso || !this.fotoUrl) {
      this.toast.error({detail: "Error", summary: 'Todos los campos son obligatorios', duration: 2000});
      return;
    }

    if (this.peso < 0) {
      this.toast.error({detail: "Error", summary: 'El peso no puede ser negativo', duration: 2000});
      return;
    }

    if (new Date(this.fechaNacimiento) > new Date()) {
      this.toast.error({detail: "Error", summary: 'La fecha de nacimiento no puede ser futura', duration: 2000});
      return;
    }
    if (!this.session.get()) {
      this.session.clear();
      this.toast.warning({summary: 'Sesión caducada', detail: 'Error de sesión', duration: 3000})
      this.router.navigate(['/login']);
      return;
    }
    this.perroListService.agregarPerro({
      nombre: this.nombre,
      ppp: this.ppp,
      fotoURL: this.fotoUrl,
      fechaNacimiento: this.fechaNacimiento,
      peso: this.peso

    } , this.albergueService.albergue?.id || 0).subscribe(value => {
      if (value){
        this.toast.success({detail: "Exito", summary: 'Perro creado correctamente', sticky: true});
        this.router.navigate(["/lista"])
      }else{
        this.toast.error({detail: "Error", summary: 'Error al crear el perro', duration: 2000});
        this.router.navigate(["/lista"])
      }
        this.session.renew()

    }
    );

  }

  // Función para subir la foto del perro a Firebase Storage, una vez subida se obtiene la URL de la imagen y se guarda en la variable fotoUrl y se habilita el botón de agregar

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const filePath = 'perro_photos/' +this.albergueService.albergue?.id+"/"+ Date.now() + '_' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().subscribe(
      (snapshot) => {
        if (snapshot?.state === 'success') {
          fileRef.getDownloadURL().subscribe(url => {
            this.fotoUrl = url;
            this.btndisabled = false;
          });
        }
      }
    );
  }
}
