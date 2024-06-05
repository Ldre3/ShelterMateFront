import {Adoptante} from "./adoptante";
import {Paseo} from "./paseo";

export class Perro {

  constructor(private _id:number,
              private _nombre:string,
              private _ppp:boolean,
              private _fechaNacimiento:Date,
              private _peso:number,
              private _fotoURL:string,
              private _adoptante:Adoptante|null,
              private _paseos:Paseo[]) {
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get ppp(): boolean {
    return this._ppp;
  }

  set ppp(value: boolean) {
    this._ppp = value;
  }

  get fechaNacimiento(): Date {
    return this._fechaNacimiento;
  }

  set fechaNacimiento(value: Date) {
    this._fechaNacimiento = value;
  }

  get peso(): number {
    return this._peso;
  }

  set peso(value: number) {
    this._peso = value;
  }

  get fotoURL(): string {
    return this._fotoURL;
  }

  set fotoURL(value: string) {
    this._fotoURL = value;
  }

  get adoptante(): Adoptante | null {
    return this._adoptante;
  }

  set adoptante(value: Adoptante | null) {
    this._adoptante = value;
  }

  get paseos(): Paseo[] {
    return this._paseos;
  }

  set paseos(value: Paseo[]) {
    this._paseos = value;
  }
}
