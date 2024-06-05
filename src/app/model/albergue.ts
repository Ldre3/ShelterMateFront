import {Usuario} from "./usuario";

export class Albergue {

  constructor(private _id:number,
              private _localidad:string,
              private _numTelefono:string,
              private _usuarioGestor:Usuario)
  {}


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get localidad(): string {
    return this._localidad;
  }

  set localidad(value: string) {
    this._localidad = value;
  }

  get numTelefono(): string {
    return this._numTelefono;
  }

  set numTelefono(value: string) {
    this._numTelefono = value;
  }

  get usuarioGestor(): Usuario {
    return this._usuarioGestor;
  }

  set usuarioGestor(value: Usuario) {
    this._usuarioGestor = value;
  }
}
