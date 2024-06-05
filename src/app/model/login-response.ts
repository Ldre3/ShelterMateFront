import {Usuario} from "./usuario";

export class LoginResponse {

  constructor(private _mensaje:string, private _status:boolean, private _usuario:Usuario) {
  }


  get mensaje(): string {
    return this._mensaje;
  }

  set mensaje(value: string) {
    this._mensaje = value;
  }

  get status(): boolean {
    return this._status;
  }

  set status(value: boolean) {
    this._status = value;
  }

  get usuario(): Usuario {
    return this._usuario;
  }

  set usuario(value: Usuario) {
    this._usuario = value;
  }
}
